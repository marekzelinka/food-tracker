import { FetchWrapper } from './fetch-wrapper.js'

const api = new FetchWrapper(import.meta.env.VITE_API_URL)

async function addFood(food) {
  const data = {
    fields: {
      name: { stringValue: food.name },
      carbs: { integerValue: food.carbs },
      protein: { integerValue: food.protein },
      fat: { integerValue: food.fat },
    },
  }
  const result = await api.post('/', data)

  if (result.error) {
    throw new Error(result.error)
  }

  return result
}

const form = document.querySelector('#create-form')
const nameSelect = form?.querySelector('#create-name')
const carbsInput = form?.querySelector('#create-carbs')
const proteinInput = form?.querySelector('#create-protein')
const fatInput = form?.querySelector('#create-fat')
const submitButton = form?.querySelector('input[type="submit"]')

form?.addEventListener('submit', async (event) => {
  event.preventDefault()

  submitButton?.setAttribute('disabled', 'disabled')

  try {
    await addFood({
      name: nameSelect?.value,
      carbs: carbsInput?.value,
      protein: proteinInput?.value,
      fat: fatInput?.value,
    })

    // Reset form fields
    event.target?.reset()
  } catch (error) {
    console.error(error)
  } finally {
    submitButton?.removeAttribute('disabled')
  }
})
