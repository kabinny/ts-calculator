import "./style.css";

interface CalculatorInterface {
  tempValue: string | number
  tempOperator?: Operator | string
  render(inputValue: string | number): void
  reset(): void
  tempCalculate(operator: Operator | string): void
  initEvent(): void
}

const VALID_NUMBER_OF_DIGITS = 3
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

type ComputedValue = {
  [key in Exclude<Operator, "=">]: (num1: number, num2: number) => number
}

const getComputedValue: ComputedValue = { "+": plus, "-": minus, "×": multiply, "÷": divide }

const Calculator: CalculatorInterface = {
  tempValue: 0,
  tempOperator: undefined,
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
    // this.targetValue = 0
  },
  tempCalculate(operator: Operator | string) {
    const isReadyCalculate = operator === "="
    const isTempCalculate = ["+", "-", "×", "÷"].includes(operator)

    if (isTempCalculate) {
      const resultEl = <HTMLDivElement>document.querySelector("#result")

      this.tempOperator = operator
      this.tempValue = Number(resultEl.innerText)

      resultEl.innerText = String(0)

      return
    }

    if (this.tempOperator && ["+", "-", "×", "÷"].includes(this.tempOperator) && isReadyCalculate) {
      const resultEl = <HTMLDivElement>document.querySelector("#result")

      const resultValue = getComputedValue[this.tempOperator as Exclude<Operator, "=">](
        Number(this.tempValue),
        Number(resultEl.innerText)
      )

      resultEl.innerText = String(resultValue)
    }
    // this.operator = operator

    // if (operator === "+") {
    //   plus()
    // }
    // if (operator === "-") {
    //   minus()
    // }
    // if (operator === "×") {
    //   multiply()
    // }
    // if (operator === "÷") {
    //   divide()
    // }
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
        return
      }

      if (!Number.isNaN(buttonText)) {
        this.render(Number(buttonText))
      }
    })
  },
}

Calculator.render(INIT_VALUE)
Calculator.initEvent()