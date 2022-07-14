import "./style.css";

const VALID_NUMBER_OF_DIGITS = 3;
const BASE_DIGIT = 10;


// resultEl.addEventListener("click", function ({ target }: MouseEvent) {
//   if (target) {
//     alert((target as HTMLDivElement).innerText)
//   }
// })

const Calculator = {
  value: 0,
  render() {
    const resultEl = <HTMLDivElement>document.querySelector("#result")

    if (resultEl) {
      resultEl.innerText = String(this.value)
    }
  },
  reset() {
    this.value = 0,
  },
  initEvent() {
    const buttonContainerEl = document.querySelector(".contents")

    buttonContainerEl?.addEventListener("click", function ({ target }) {
      const buttonText = (target as HTMLButtonElement).innerText

      if (buttonText === "AC") {
        this.reset()
      } else {
      }
    })
  },
}

Calculator.render()
Calculator.initEvent()