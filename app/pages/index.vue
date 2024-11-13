<template>
  <div>
    <UiGradientDivider class="container my-7" />
    <h1 class="mb-1 text-2xl font-bold">Конвертер валют</h1>
    <form class="w-full space-y-4" @submit="onSubmit">
      <div class="flex gap-10">
        <div class="w-full">
          <UiVeeNumberField
            name="payment"
            :format-options="{
              style: 'currency',
              currency: convertFrom,
            }"
          >
            <UiNumberFieldInput placeholder="15" />
          </UiVeeNumberField>
        </div>
        <div class="w-52">
          <UiSelect :defaultValue="convertFrom" v-model="convertFrom">
            <UiSelectTrigger placeholder="Конвертировать с" />
            <UiSelectContent class="h-[500px]">
              <UiSelectLabel>Валюта</UiSelectLabel>
              <UiSelectSeparator />
              <UiSelectGroup>
                <UiSelectItem
                  v-for="(veg, i) in currenciesSelect"
                  :key="i"
                  :value="veg.code"
                  :text="veg.name"
                />
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </div>
        <div class="w-52">
          <UiSelect :defaultValue="convertTo" v-model="convertTo">
            <UiSelectTrigger placeholder="Конвертировать в" />
            <UiSelectContent class="h-[500px]">
              <UiSelectLabel>Валюта</UiSelectLabel>
              <UiSelectSeparator />
              <UiSelectGroup>
                <UiSelectItem
                  v-for="(veg, i) in currenciesSelect"
                  :key="i"
                  :value="veg.code"
                  :text="veg.name"
                />
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </div>
      </div>

      <div>
        <UiButton type="submit">Конвертировать</UiButton>
      </div>
    </form>
    <p class='mt-5' v-if="conversionResult">{{ conversionResult }}</p>
  </div>
</template>

<script setup lang="ts">
  import { z } from "zod";

  const currencyStore = useCurrencyStore();
  const { currencies, conversionResult } = storeToRefs(currencyStore);

  const currenciesSelect = computed(() => currencies.value);

  const convertFrom = ref("AED");
  const convertTo = ref("AFN");

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        payment: z
          .number({
            description: "Сумма",
            invalid_type_error: "Пожалуйста, введите действительный номер",
          })
          .nonnegative()
          .min(1),
      })
    ),
  });

  const onSubmit = handleSubmit(async (values) => {
    await currencyStore.convertCurrency(values.payment, convertFrom.value, convertTo.value);
    useSonner.success("Успешно!!");
  });

  onMounted(async () => {
    await currencyStore.fetchCurrencies();
  });
</script>
