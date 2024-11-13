<template>
  <div>
    <UiGradientDivider class="container my-7" />
    <div class="mb-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Конвертер валют</h1>
      <h2>Текущие курсы валют относительно {{ currencyStore.baseCurrency }}</h2>
    </div>
    <label>Выберите базовую валюту:</label>
    <UiSelect :defaultValue="currencyStore.baseCurrency" v-model="newBaseCurrency">
      <UiSelectTrigger placeholder="Валюта" />
      <UiSelectContent class="h-[500px]">
        <UiSelectGroup>
          <UiSelectItem
            v-for="(veg, i) in currencyStore.currencies"
            :key="i"
            :value="veg.code"
            :text="veg.name"
          />
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
    <div class="my-5">
      <UiButton @click="currencyStore.fetchRates(newBaseCurrency)">
        <Icon class="size-4" name="lucide:rotate-ccw" />
        Обновить курсы
      </UiButton>
    </div>
    <div>
      <UiTable v-if="currencyStore.rates">
        <UiTableCaption>«Свежие» курсы</UiTableCaption>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-[100px]">Ваша валюта</UiTableHead>
            <UiTableHead>Стоимость</UiTableHead>
            <UiTableHead>Мировые валюты</UiTableHead>
            <UiTableHead class="text-right">Приравнивается</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody class="last:border-b">
          <template v-for="(rate, currency) in currencyStore.rates" :key="сurrency">
            <UiTableRow>
              <UiTableCell class="font-medium">{{ currencyStore.baseCurrency }} </UiTableCell>
              <UiTableCell>1</UiTableCell>
              <UiTableCell>{{ currency }}</UiTableCell>
              <UiTableCell class="text-right">{{ rate }}</UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
      <TableLoading v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  const currencyStore = useCurrencyStore();
  const newBaseCurrency = ref();

  // Загружаем курсы при инициализации компонента
  onMounted(async () => {
    await currencyStore.fetchCurrencies();
    await currencyStore.fetchRates();
  });
</script>
