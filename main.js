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
      // there was an error
      return
    }

    list.insertAdjacentHTML(
      'beforeend',
      `
      <li class="card">
        <div>
          <h3 class="name">${name.value}</h3>
          <div class="calories">0 calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs.value}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein.value}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat.value}g</div></li>
          </ul>
        </div>
      </li>
    `,
    )

    // Reset form fields
    event.target?.reset()
  } catch (error) {
    console.error(error)
  } finally {
    submit?.removeAttribute('disabled')
  }
})
