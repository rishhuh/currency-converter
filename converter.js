const AMOUNT = document.getElementById('amount');
const FROM = document.getElementById('fromcurrency');
const TO = document.getElementById('tocurrency');
const BTN = document.getElementById('convertbtn');
const Result = document.getElementById('result');

// Currency list
const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CNY", "CHF"];

currencies.forEach(currency => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.value = option2.value = currency;
  option1.textContent = option2.textContent = currency;
  FROM.appendChild(option1);
  TO.appendChild(option2);
});

FROM.value = 'USD';
TO.value = 'INR';

// Event Listener for button
BTN.addEventListener('click', () => {
  const amountinput = parseFloat(AMOUNT.value);
  const fromcurrency = FROM.value;
  const tocurrency = TO.value;

  if (isNaN(amountinput) || amountinput <= 0) {
    Result.textContent = 'Please enter a valid number';
    return;
  }

  const apiKey = '05be8351aba98a9418659219';
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromcurrency}/${tocurrency}/${amountinput}`;

  console.log("Fetching:", url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        Result.textContent = `${amountinput} ${fromcurrency} = ${data.conversion_result.toFixed(2)} ${tocurrency}`;
      } else {
        Result.textContent = 'Conversion failed. Try again.';
      }
    })
    .catch(error => {
      Result.textContent = 'Error occurred. Please try again later.';
    });
});
