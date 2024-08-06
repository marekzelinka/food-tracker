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
    return this.#getTotal('carbs')
  }

  get totalProtein() {
    return this.#getTotal('protein')
  }

  get totalFat() {
    return this.#getTotal('fat')
  }

  #getTotal(key) {
    return this.foods.reduce((total, item) => total + item[key], 0)
  }
}
