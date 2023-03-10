async function fetchWithError(url = "", config = {}) {
    const response = await fetch(url, config);
    return response.ok
        ? await response.json()
        : Promise.reject(new Error("not found"));
}

const myHeaders = new Headers();
myHeaders.append("apikey", "7qYa5NwHZOu6wg0oNh3pQ9b59tqOW0gJ");

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
}

export function fetchConvert(fromCurrency, toCurrency, fromValue) {
    return fetchWithError(`https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${fromValue}`, requestOptions)
}

