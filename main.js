import snackbar from 'snackbar'
import { renderChart } from './chart.js'
import {
  FetchWrapper,
  calculateCalories,
  capitalize,
  formatDecimal,
  formatGrams,
} from './helpers.js'
import { Store } from './store.js'

const api = new FetchWrapper(import.meta.env.VITE_API_URL)

const store = new Store()

const form = document.querySelector('#create-form')
const nameSelect = form?.querySelector('#create-name')
const carbsInput = form?.querySelector('#create-carbs')
const proteinInput = form?.querySelector('#create-protein')
const fatInput = form?.querySelector('#create-fat')
const submitButton = form?.querySelector('input[type="submit"]')

const list = document.querySelector('#food-list')

const totalCalories = document.querySelector('#total-calories')

form?.addEventListener('submit', async (event) => {
  event.preventDefault()

  submitButton?.setAttribute('disabled', 'disabled')

  try {
    const data = await addFood({
      name: nameSelect?.value,
      carbs: carbsInput?.value,
      protein: proteinInput?.value,
      fat: fatInput?.value,
    })

    if (data.error) {
      return snackbar.show('Some data is missing.')
    }

    snackbar.show('Food added successfully.')

    const { name, carbs, protein, fat } = data.fields
    displayEntry({
      name: name.stringValue,
      carbs: carbs.integerValue,
      protein: protein.integerValue,
      fat: fat.integerValue,
    })
    render()

    // Reset form fields
    resetForm(event)
  } catch (error) {
    console.error(error)
  } finally {
    submitButton?.removeAttribute('disabled')
  }
})

function resetForm() {
  form?.reset()
  nameSelect?.focus()
}

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

function updateTotalCalories() {
  if (!totalCalories) {
    return
  }

  totalCalories.textContent = formatDecimal(store.totalCalories)
}

function displayEntry({ name, carbs, protein, fat }) {
  store.addFood({ carbs, protein, fat })

  const title = capitalize(name)
  const totalCalories = calculateCalories({ carbs, protein, fat })

  list.insertAdjacentHTML(
    'beforeend',
    `<li class="card">
        <div>
          <h3 class="name">
            ${title}
          </h3>
          <div class="calories">
            ${formatDecimal(totalCalories)} calories
          </div>
          <ul class="macros">
            <li class="carbs">
              <div>Carbs</div>
              <div class="value">
                ${formatGrams(carbs)}
              </div>
            </li>
            <li class="protein">
              <div>Protein</div>
              <div class="value">
                ${formatGrams(protein)}
              </div>
            </li>
            <li class="fat">
              <div>Fat</div>
              <div class="value">
                ${formatGrams(fat)}
              </div>
            </li>
          </ul>
        </div>
      </li>`,
  )
}

function render() {
  renderChart(store)
  updateTotalCalories()
}

async function init() {
  // TODO: Get the saved entries and list them
  const data = await api.get('/?pageSize=100')

  if (!data.documents) {
    return
  }

  for (const doc of data.documents) {
    const { name, carbs, protein, fat } = doc.fields
    displayEntry({
      name: name.stringValue,
      carbs: carbs.integerValue,
      protein: protein.integerValue,
      fat: fat.integerValue,
    })
  }
  render()
}

init()
