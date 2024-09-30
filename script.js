let rate = [];
document.querySelector('#currencyConverterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const amount = document.querySelector('#amount').value;
  const fromCurrency = document.querySelector('#fromCurrency').value;
  const toCurrency = document.querySelector('#toCurrency').value;
  getExchangeRate(amount);

  async function getExchangeRate(amount) {
    const url = `https://v6.exchangerate-api.com/v6/b9c3f1049d2c28b58247e8d2/latest/${fromCurrency}`;
    axios.get(url)
      .then((res) => {
        rate = res.data.conversion_rates[toCurrency];
        if (!rate) {
          showError("Выбранная валютная пара не найдена.")
          return;
        }

        console.log(res.data.conversion_rates);
        const convertedAmount = (amount * rate).toFixed(2);

        document.querySelector('#result').textContent = `${convertedAmount} ${toCurrency}`;
      })
      .catch((error) => {
        console.error('errors:', error);
        showError("API недоступно. Попробуйте позже.")
      });
  }

})

async function showKztRate() {
  const url = `https://v6.exchangerate-api.com/v6/b9c3f1049d2c28b58247e8d2/latest/KZT`;
  axios.get(url)
    .then((res) => {
      const usdRate = res.data.conversion_rates['USD'];
      const euroRate = res.data.conversion_rates['EUR'];

      document.querySelector('#usdRate').textContent = usdRate;
      document.querySelector('#euroRate').textContent = euroRate;
    })
    .catch((error) => {
      console.error('errors:', error)
    });
}

function showError(message) {
  document.querySelector('#result').textContent = message;
}


window.onload = showKztRate;










