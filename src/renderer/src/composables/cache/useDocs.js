import { LocalStore } from '../../assets/js/Local'
import { supabase } from '../../assets/js/Supabase'
import {
  until,
  useArrayFilter,
  useArrayMap,
  useAsyncState,
  watchDeep,
  whenever,
  invoke
} from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useAppStore } from '../../stores/AppStore'

export const useDocs = () => {
  const appStore = useAppStore()
  const task = appStore.data.activeTask

  const { state, isReady } = useAsyncState(
    supabase.rpc('get_documents_json', { part: task.part.id }),
    { data: [] }
  )

  const remoteDocuments = ref([])
  const localDocuments = ref(LocalStore.get(`documents.${task.part.name}`, []))
  const localPages = computed(() => localDocuments.value.flatMap((doc) => doc.pages))

  const completedPages = useArrayFilter(localPages, (p) => p.status === 'done')
  const countCompleted = computed(() => completedPages.value.length)
  const deletedPages = useArrayFilter(localPages, (p) => p.isDeleted)
  const dirtyPages = useArrayFilter(localPages, (p) => p.isDirty)
  const countDirtyPages = computed(() => dirtyPages.value.length)
  const newActivities = useArrayMap(dirtyPages, (p) => p.activities.at(0))

  watchDeep(localDocuments, (docs) => {
    LocalStore.set(`documents.${task.part.name}`, getPlain(docs))
  })

  whenever(isReady, () => {
    remoteDocuments.value = state.value.data
    console.log('remoteDocuments', remoteDocuments.value)
  })

  whenever(
    () => isReady.value && countDirtyPages.value === 0,
    () => {
      localDocuments.value = remoteDocuments.value
    }
  )

  watch(countCompleted, (count) => {
    task.completed_number = count
    task.completed_percent = Math.round((count / task.pages_number) * 100)
    task.status = task.completed_percent === 100 ? 'done' : 'in_progress'
    updateTask(task)
    updateDocuments()
  })

  const updateDocuments = async () => {
    // any document that has all its pages completed mark it as done
    // any document that hasn't to_do pages but at least one pending mark it as pending

    const docs = localDocuments.value

    docs.forEach((doc) => {
      const completed = doc.pages.filter((p) => p.status === 'done').length
      const pending = doc.pages.filter((p) => p.status === 'pending').length
      const to_do = doc.pages.filter((p) => p.status === 'to_do').length

      if (completed === doc.pages.length) {
        doc.status = 'done'
      } else if (to_do === 0 && pending > 0) {
        doc.status = 'pending'
      }
    })

    localDocuments.value = docs
  }

  // what about subscribing to a table to get tasks and whenever useArrayDifference(localTasks, RemoteTasks).length > 0 we can
  // add the tasks in the difference and mark them as new, when we access them make new = false

  const saveChanges = async () => {
    const { state: state_1, isReady: isReady_1 } = useAsyncState(
      supabase.from('activities').insert(newActivities.value),
      { data: [] }
    )

    const { state: state_2, isReady: isReady_2 } = useAsyncState(
      supabase
        .from('pages')
        .delete()
        .in(
          'id',
          deletedPages.value.map((p) => p.id)
        ),
      { data: [] }
    )

    whenever(isReady_1, () => {
      if (!state_1.value.error) {
        dirtyPages.value.forEach((p) => {
          if (!p.isDeleted) {
            p.isDirty = false
          }
        })
      }
    })

    whenever(isReady_2, () => {
      if (!state_1.value.error) {
        const deleted = deletedPages.value
        deleted.forEach((p) => {
          const doc = localDocuments.value.find((d) => d.id === p.id_document)
          if (doc) {
            doc.pages = doc.pages.filter((p_) => p_.id !== p.id)
          }
        })
      }
    })

    whenever(
      () => isReady_1.value && isReady_2.value,
      () => {
        if (!state_1.value.error && !state_2.value.error) {
          LocalStore.delete(`documents.${task.part.name}`)
          const { state, isReady } = useAsyncState(
            supabase.rpc('get_documents_json', { part: task.part.id }),
            { data: [] }
          )
          invoke(async () => {
            await until(isReady).toBe(true)
            localDocuments.value = state.value.data
          })
        }
      }
    )

    return { state_1, state_2, isReady_1, isReady_2 }
  }

  return {
    remoteDocuments,
    localDocuments,
    localPages,
    countCompleted,
    countDirtyPages,
    saveChanges
  }
}

const getPlain = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const updateTask = async (task) => {
  const localTasks = LocalStore.get('tasks', [])
  const localTask = localTasks.find((t) => t.id === task.id)
  if (localTask) {
    Object.assign(localTask, task)
  } else {
    localTasks.push(task)
  }
  LocalStore.set('tasks', getPlain(localTasks))
}
