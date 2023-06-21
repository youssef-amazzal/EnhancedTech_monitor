import {LocalStore} from "../../assets/js/Local";
import {
  until,
  useArrayDifference,
  useArrayJoin,
  useArrayUnique,
  useAsyncState,
  watchDeep,
  whenever
} from "@vueuse/core";
import {supabase} from "../../assets/js/Supabase";
import {ref} from "vue";


export const useTasks = () => {
  const user = LocalStore.public.get('user', 'anonymous');

  const { state, isReady } = useAsyncState(supabase.rpc('get_tasks', {p_id_employee: user.id}), {data: []});
  const localTasks = ref(LocalStore.get('tasks', []))
  const remoteTasks = ref([])

  watchDeep(localTasks, (tasks) => {
    LocalStore.set(`tasks`, getPlain(tasks))
  });

  whenever(isReady, () => {
    remoteTasks.value = state.value.data;
    console.log('remoteTasks', remoteTasks.value)
  });
  const getTasks = async () => {
    const tasks = ref([]);

    await until(isReady).toBe(true);

    const unModifiedTasks = useArrayDifference(remoteTasks, localTasks, (a, b) => a.id === b.id);
    tasks.value = localTasks.value.concat(unModifiedTasks.value).sort((a, b) => b.id - a.id);

    return tasks;
  }

  return {getTasks, localTasks, remoteTasks}
}

const getPlain = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
