export class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async get(endpoint) {
    const response = await fetch(this.baseURL + endpoint)
    return await response.json()
  }

  put(endpoint, body) {
    return this.#send('put', endpoint, body)
  }

  post(endpoint, body) {
    return this.#send('post', endpoint, body)
  }

  delete(endpoint, body) {
    return this.#send('delete', endpoint, body)
  }

  async #send(method, endpoint, body) {
    const response = await fetch(this.baseURL + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return await response.json()
  }
}

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1)
}

export function calculateCalories({ carbs, protein, fat }) {
  return carbs * 4 + protein * 4 + fat * 9
}

export function formatDecimal(value) {
  return value.toLocaleString('en-US', { style: 'decimal' })
}

export function formatGrams(value) {
  return Number(value).toLocaleString('en-US', {
    style: 'unit',
    unit: 'gram',
    unitDisplay: 'narrow',
  })
}
