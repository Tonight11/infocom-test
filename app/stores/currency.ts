interface ICurrencise {
  name: string;
  code: string;
}

export const useCurrencyStore = defineStore("Currency", () => {
  const baseCurrency = ref("RUB");
  const rates = ref<Record<string, number>>({});
  const currencies = ref<ICurrencise[]>();
  const conversionResult = ref<string | null>(null);

  const secretApi = "cur_live_GNvekOTdDKOnW5Q2hSh8zC5M40TcVNO1KzNAUXBN";

  const setBaseCurrency = (currency: string) => {
    baseCurrency.value = currency;
  };

  const fetchRates = async (newBaseCurrency: string = "EUR") => {
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?base=${newBaseCurrency}`);
      const data = await res.json();

      baseCurrency.value = data.base
      rates.value = data.rates;
    } catch (error) {
      console.error("Ошибка при загрузке курсов валют", error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`https://api.frankfurter.app/currencies`);
      const currency = await res.json();

      currencies.value = Object.entries(currency).map(([code, name]) => ({ code, name: name as string }));

      console.log(currencies.value)
    } catch (error) {
      console.error("Ошибка при загрузке валют", error);
    }
  };

  const convertCurrency = async (amount: number, from: string, to: string) => {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`
      );
      const data = await res.json();

      const convertedAmount = (amount * data.rates[to]).toFixed(2);
      conversionResult.value = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
      console.error("Ошибка при конвертации валют", error);
    }
  };

  return {
    baseCurrency,
    rates,
    currencies,
    conversionResult,
    setBaseCurrency,
    fetchRates,
    fetchCurrencies,
    convertCurrency,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrencyStore, import.meta.hot));
}
