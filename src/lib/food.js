import { FetchWrapper } from './utils.js'

const api = new FetchWrapper(
  `https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/${import.meta.env.VITE_API_URL}`,
)

export async function getAllFood() {
  const data = await api.get('/?pageSize=100')

  return data
}

export async function createFood({ name, carbs, protein, fat }) {
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
