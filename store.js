import { calculateCalories } from './helpers.js'

export class Store {
  constructor() {
    this.foods = []
  }

  addFood({ carbs, protein, fat }) {
    this.foods.push({
      carbs: Number(carbs),
      protein: Number(protein),
      fat: Number(fat),
    })
  }

  get totalCarbs() {
    return this.#getMacroTotal('carbs')
  }

  get totalProtein() {
    return this.#getMacroTotal('protein')
  }

  get totalFat() {
    return this.#getMacroTotal('fat')
  }

  get totalCalories() {
    return calculateCalories({
      carbs: this.totalCarbs,
      protein: this.totalProtein,
      fat: this.totalFat,
    })
  }

  #getMacroTotal(key) {
    return this.foods.reduce((total, item) => total + item[key], 0)
  }
}
