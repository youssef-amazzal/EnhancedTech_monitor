<script setup>
import {useI18n} from "vue-i18n";
import HeaderTemplate from "../components/HeaderTemplate.vue";
import {useSettings} from "../composables/useSettings";
import {formatKey} from "../assets/js/Enums";

const {t} = useI18n();

const {themeOptions, selectedTheme, changeTheme} = useSettings();
const {langOptions, selectedLang, changeLang} = useSettings();
const {shortcutOptions, changeShortcut} = useSettings();

</script>

<template>
  <div class="settings-container">
    <Accordion>
      <!--      Theme Settings      -->
      <AccordionTab>
        <template #header>
          <HeaderTemplate
            :title="t('settings.theme.title')"
            :description="t('settings.theme.description')"
          />
        </template>
        <div class="grid justify-content-center">
          <div
            v-for="option in themeOptions"
            :key="option.id"
            class="col-4 px-1"
          >
            <card
              class="shadow-none surface-ground border-2 surface-border "
            >
              <template #header>
                <div>
                  <img
                    alt="light theme card"
                    :src="option.image"
                    class="border-round-top-sm h-full w-full border-bottom-2 surface-border"
                    style="object-fit: cover;"
                  >
                </div>
              </template>
              <template #content>
                <div class="pb-2 px-3 flex gap-3 align-items-center">
                  <RadioButton
                    v-model="selectedTheme"
                    :input-id="option.key"
                    name="theme"
                    :value="option.label.value"
                    @change="changeTheme"
                  />
                  <h3 class="text-base m-0">
                    {{ option.label.value }}
                  </h3>
                </div>
              </template>
            </card>
          </div>
        </div>
      </AccordionTab>

      <!--      Language Settings      -->
      <AccordionTab
        :disabled="true"
      >
        <template #header>
          <div class="flex justify-content-between w-full align-items-center">
            <HeaderTemplate
              :title="t('settings.language.title')"
              :description="t('settings.language.description')"
            />
            <Dropdown
              v-model="selectedLang"
              :options="langOptions"
              class="h-fit"
              @change="changeLang"
            >
              <template #value="slotProps">
                <div
                  v-if="slotProps.value"
                  class="flex align-items-center gap-3"
                >
                  <component :is="slotProps.value.icon" />
                  <div>{{ slotProps.value.label.value }}</div>
                </div>
              </template>
              <template #option="slotProps">
                <div
                  class="flex align-items-center gap-3"
                >
                  <component :is="slotProps.option.icon" />
                  <div>{{ slotProps.option.label.value }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
        </template>
        <div class="flex justify-content-center gap-8" />
      </AccordionTab>

      <!--      Notification Settings      -->
      <AccordionTab>
        <template #header>
          <HeaderTemplate
            :title="t('settings.notifications.title')"
            :description="t('settings.notifications.description')"
          />
        </template>
        <div class="flex justify-content-center gap-8" />
      </AccordionTab>

      <!--      Shortcuts Settings      -->
      <AccordionTab>
        <template #header>
          <HeaderTemplate
            :title="t('settings.shortcuts.title')"
            :description="t('settings.shortcuts.description')"
          />
        </template>
        <div
          v-for="shortcut in shortcutOptions"
          :key="shortcut.title"
          class="py-2"
        >
          <div class="flex justify-content-between align-items-center gap-3">
            <div class="flex-column ">
              <h2 class="m-0 text-base font-semibold">
                {{ shortcut.title }}
              </h2>
              <p class="font-normal m-0 text-sm text-color-secondary">
                {{ shortcut.description }}
              </p>
            </div>
            <div class="flex align-items-center gap-3">
              <div class="flex align-items-center">
                <div
                  v-for="(key,index) in shortcut.keyCombination"
                  :key="key"
                  class="flex align-items-center"
                >
                  <kbd class="keyboard-shortcut">{{ formatKey(key) }}</kbd>
                  <span
                    v-if="index < shortcut.keyCombination.length - 1"
                    class="px-2"
                  >+</span>
                </div>
              </div>
              <ToggleButton
                v-model="shortcut.edit"
                class="p-button-rounded p-button-text p-button-plain"
                off-icon="pi pi-pencil"
                on-icon="pi pi-check"
                off-label=""
                on-label=""
                @change="changeShortcut(shortcut)"
              />
            </div>
          </div>
        </div>
      </AccordionTab>

      <!--      About      -->
      <AccordionTab>
        <template #header>
          <HeaderTemplate
            title="About"
            description="About the application"
          />
        </template>
        <div class="flex justify-content-center gap-8" />
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style>

.p-accordion-tab:hover:nth-child(2) .p-accordion-header-link {
  background-color: var(--surface-card) !important;
  cursor: auto !important;
}

.p-accordion-tab:nth-child(2) > .p-disabled, .p-accordion-tab:nth-child(2) > .p-disabled * {
  opacity: 1 !important;
  cursor: auto !important;
  pointer-events: auto;
}

.p-accordion-tab:nth-child(2) .p-accordion-toggle-icon {
  display: none !important;
}

.keyboard-shortcut {
  background-color: var(--surface-100);
  border-radius: 0.25rem;
  color: var(--text-color);

  box-shadow: var(--surface-200) 0px -4px 0px inset, var(--surface-200) 0px 1px 1px;

  padding: 0.45rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
