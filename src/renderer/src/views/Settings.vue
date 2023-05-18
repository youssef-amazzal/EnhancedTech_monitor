<script setup>

</script>

<template>
  <div class="profile-container flex flex-column gap-5">
    <!--      Employee's Information      -->
    <Accordion
      class="accordion-custom"
      :active-index="0"
    >
      <AccordionTab>
        <template #header>
          <div class="flex-column">
            <h1 class="m-0 text-xl">
              Theme
            </h1>
            <p class="font-normal m-0">
              Personalize the app's appearance with the Theme settings.
            </p>
          </div>
        </template>
        <div class="grid">
          <card />
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style scoped>

</style>
