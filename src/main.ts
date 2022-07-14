import "./style.css";

interface CalculatorInterface {
  targetValue: string | number
  operator?: Operator | string
  render(inputValue: string | number): void
  reset(): void
  tempCalculate(operator: Operator | string): void
  initEvent(): void
}

const VALID_NUMBER_OF_DIGITS = 3
const BASE_DIGIT = 10
const INIT_VALUE = 0

type Operator = "+" | "-" | "×" | "÷" | "="

const validateNumberLength = (value: string | number) => {
  return String(value).length < VALID_NUMBER_OF_DIGITS
}

const isZero = (value: string) => Number(value) === 0

const plus = (num1: number, num2: number) => num1 + num2
const minus = (num1: number, num2: number) => num1 - num2
const multiply = (num1: number, num2: number) => num1 * num2
const divide = (num1: number, num2: number) => num1 / num2

const Calculator: CalculatorInterface = {
  targetValue: 0,
  operator: undefined,
  render(inputValue: string | number) {
    const resultEl = <HTMLDivElement>document.querySelector("#result")
    const prevValue = resultEl.innerText

    if (!validateNumberLength(prevValue)) {
      alert("3자리 초과 숫자를 입력할 수 없습니다.")
      return
    }

    if (resultEl) {
      this.targetValue = isZero(prevValue) ? String(inputValue) : String(prevValue + inputValue)
      resultEl.innerText = this.targetValue
    }
  },
  reset() {
    this.targetValue = 0
  },
  tempCalculate(operator: Operator | string) {
    const isCalculate = operator === "="

    if (isCalculate) {
    }
    this.operator = operator

    if (operator === "+") {
      plus()
    }
    if (operator === "-") {
      minus()
    }
    if (operator === "×") {
      multiply()
    }
    if (operator === "÷") {
      divide()
    }
  },
  initEvent() {
    const buttonContainerEl = document.querySelector(".contents")

    buttonContainerEl?.addEventListener("click", ({ target }) => {
      const buttonText = (target as HTMLButtonElement).innerText

      if (buttonText === "AC") {
        this.reset()
      }

      if (["+", "-", "×", "÷", "="].includes(buttonText)) {
        this.tempCalculate(buttonText)
      }

      if (!Number.isNaN(buttonText)) {
        this.render(Number(buttonText))
      }
    })
  },
}

Calculator.render(INIT_VALUE)
Calculator.initEvent()