import snackbar from 'snackbar'
import { FetchWrapper, calculateCalories, capitalize } from './helpers.js'

const api = new FetchWrapper(import.meta.env.VITE_API_URL)

async function addFood(food) {
  const object = {
    fields: {
      name: { stringValue: food.name },
      carbs: { integerValue: food.carbs },
      protein: { integerValue: food.protein },
      fat: { integerValue: food.fat },
    },
  }
  const data = await api.post('/', object)

  return data
}

const form = document.querySelector('#create-form')
const name = form?.querySelector('#create-name')
const carbs = form?.querySelector('#create-carbs')
const protein = form?.querySelector('#create-protein')
const fat = form?.querySelector('#create-fat')
const submit = form?.querySelector('input[type="submit"]')
const list = document.querySelector('#food-list')

form?.addEventListener('submit', async (event) => {
  event.preventDefault()

  submit?.setAttribute('disabled', 'disabled')

  try {
    const data = await addFood({
      name: name?.value,
      carbs: carbs?.value,
      protein: protein?.value,
      fat: fat?.value,
    })

    if (data.error) {
      return snackbar.show('Some data is missing.')
    }

    snackbar.show('Food added successfully.')

    list.insertAdjacentHTML(
      'beforeend',
      `<li class="card">
        <div>
          <h3 class="name">${capitalize(name.value)}</h3>
          <div class="calories">${calculateCalories({ carbs: carbs.value, protein: protein.value, fat: fat.value })} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs.value}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein.value}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat.value}g</div></li>
          </ul>
        </div>
      </li>`,
    )

    // Reset form fields
    event.target?.reset()
  } catch (error) {
    console.error(error)
  } finally {
    submit?.removeAttribute('disabled')
  }
})

async function init() {
  // TODO: Get the saved entries and list them
  const data = await api.get('/?pageSize=100')

  if (!data.documents) {
    return
  }

  for (const doc of data.documents) {
    const fields = doc.fields
    list?.insertAdjacentHTML(
      'beforeend',
      `<li class="card">
        <div>
          <h3 class="name">${capitalize(fields.name.stringValue)}</h3>
          <div class="calories">${calculateCalories({ carbs: fields.carbs.integerValue, protein: fields.protein.integerValue, fat: fields.fat.integerValue })} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${fields.carbs.integerValue}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${fields.protein.integerValue}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fields.fat.integerValue}g</div></li>
          </ul>
        </div>
      </li>`,
    )
  }
}

init()
