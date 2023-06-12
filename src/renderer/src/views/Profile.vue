<script setup>
import {useI18n} from 'vue-i18n'
import {computed, ref} from 'vue'
import {useAuth} from "../composables/useAuth";

const {t} = useI18n()
const {signout} = useAuth()

const information = [
  {
    id: 0,
    label: computed(() => t('profile.info.service.label')),
    value: computed(() => t('profile.info.service.value')),
  },
  {
    id: 1,
    label: computed(() => t('profile.info.phoneNumber')),
    value: ref('+212 643001457'),
  },
  {
    id: 2,
    label: computed(() => t('profile.info.email')),
    value: ref('youssef.amazzal@um5r.ac.ma'),
  }
]
</script>

<template>
  <div
    class="profile-container flex flex-column gap-5"
  >
    <!--      Employee's Information      -->
    <Card
      class="shadow-none p-5 border-2 surface-border"
    >
      <template #header>
        <div class="flex justify-content-between">
          <h1 class="m-0 mb-4 text-color uppercase font-semibold">
            {{ t('profile.info.title') }}
          </h1>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            class="h-fit"
            severity="danger"
            text
            @click="signout"
          />
        </div>
      </template>

      <template #content>
        <div class="grid grid-nogutter max-h-10rem">
          <!--      Employee's Profile Picture       -->
          <div class="pfp-container col-fixed w-fit">
            <Button
              icon-class="text-4xl"
              icon="pi pi-user"
              style="min-width: 7rem; min-height: 7rem;"
              rounded
            />
          </div>

          <!--      Employee's Details       -->
          <div class="flex flex-column justify-content-between pl-3">
            <h2 class="text-3xl lg:text-4xl m-0 text-color font-semibold">
              Youssef Amazzal
            </h2>
            <div class="flex justify-content-start gap-5">
              <div
                v-for="item in information"
                :key="item.id"
              >
                <h3 class="text-color ">
                  {{ item.label.value }}
                </h3>
                <p class="mb-0">
                  {{ item.value.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!--      Employee's Statistics      -->
    <Card class="shadow-none p-5 border-2 surface-border">
      <template #header>
        <h1 class="text-4xl m-0 mb-2 text-color">
          {{ t('profile.stats.title') }}
        </h1>
      </template>

      <template #content />
    </Card>
  </div>
</template>

<style scoped>
:deep(.p-avatar) {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
}

:deep(.p-avatar-icon) {
  font-size: 3rem;
}
</style>
