import { FetchWrapper } from './helpers.js'

const api = new FetchWrapper(import.meta.env.VITE_API_URL)

export async function getAllFoods() {
  const data = await api.get('/?pageSize=100')

  return data
}

export async function addFood({ name, carbs, protein, fat }) {
  const object = {
    fields: {
      name: { stringValue: name },
      carbs: { integerValue: carbs },
      protein: { integerValue: protein },
      fat: { integerValue: fat },
    },
  }
  const data = await api.post('/', object)

  return data
}
