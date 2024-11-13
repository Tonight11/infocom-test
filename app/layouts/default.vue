<template>
  <div class="min-h-dvh">
    <UiNavbar sticky>
      <UiContainer class="flex h-14 items-center justify-between px-10">
        <NuxtLink class="text-lg font-semibold" to="/">{{ SITE_NAME }}</NuxtLink>
        <div class="flex items-center gap-2">
          <nav class="hidden items-center gap-5 sm:flex">
            <NuxtLink
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              to="/"
              >Конвертировать</NuxtLink
            >
            <NuxtLink
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              to="/rates"
              >Свежие курсы</NuxtLink
            >
          </nav>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton class="h-9 w-9" variant="ghost" size="icon" title="Theme switcher">
                <span class="sr-only">Theme switcher</span>
                <Icon :name="currentIcon || 'lucide:sun'" class="h-[18px] w-[18px]"
              /></UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" :side-offset="5">
              <UiDropdownMenuItem
                class="cursor-pointer"
                v-for="(m, i) in modes"
                :key="i"
                :icon="m.icon"
                :title="m.title"
                @click="setTheme(m.value)"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </UiContainer>
    </UiNavbar>
    <div class="px-10">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "system" },
  ];

  const colorMode = useColorMode();
  const setTheme = (val: string) => {
    colorMode.preference = val;
  };

  const currentIcon = computed(() => {
    return modes.find((m) => m.value === colorMode?.preference)?.icon;
  });
</script>
