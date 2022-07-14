import "./style.css";

const VALID_NUMBER_OF_DIGITS = 3;
const BASE_DIGIT = 10;
const INIT_VALUE = 0

const validateNumberLength = (value: string | number) => {
  return String(value).length < VALID_NUMBER_OF_DIGITS
}

const isZero = (value: string) => Number(value) === 0

const Calculator = {
  value: 0,
  render(inputValue: string | number) {
    const resultEl = <HTMLDivElement>document.querySelector("#result")
    const prevValue = resultEl.innerText

    if (!validateNumberLength(prevValue)) {
      alert("3자리 초과 숫자를 입력할 수 없습니다.")
      return
    }

    if (resultEl) {
      resultEl.innerText = isZero(prevValue) ? String(inputValue) : String(prevValue + inputValue)
    }
  },
  reset() {
    this.value = 0
  },
  operator(inputNumber: number) {
    this.render(inputNumber)
  },
  initEvent() {
    const buttonContainerEl = document.querySelector(".contents")

    buttonContainerEl?.addEventListener("click", ({ target }) => {
      const buttonText = (target as HTMLButtonElement).innerText

      if (buttonText === "AC") {
        this.reset()
      } else {
        this.render(Number(buttonText))
      }
    })
  },
}

Calculator.render(INIT_VALUE)
Calculator.initEvent()