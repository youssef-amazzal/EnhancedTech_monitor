<template>
  <Card
    class="shadow-none border-2 surface-border h-full p-2"
  >
    <template #header>
      <div class="flex justify-content-between align-items-center">
        <Skeleton
          width="4rem"
          height="1.5rem"
        />
        <Skeleton
          shape="circle"
          size="1.5rem"
        />
      </div>
    </template>

    <template #title>
      <Skeleton
        class="w-full mt-3"
        height="1.3rem"
      />
      <Skeleton
        class="w-5rem mt-2"
      />
    </template>

    <template #footer>
      <Divider class="my-2" />
      <div class="flex gap-2 align-items-center">
        <Skeleton
          shape="circle"
          size="1rem"
        />
        <Skeleton class="w-2rem" />
        <Skeleton
          height="0.5rem"
        />
        <Skeleton class="w-2rem" />
      </div>
    </template>
  </Card>
</template>
