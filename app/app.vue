<template>
  <ConfigProvider :use-id="useIdFunction">
    <div>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <UiVueSonner />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
  import { ConfigProvider } from "radix-vue";

  const useIdFunction = () => useId()!;
</script>
