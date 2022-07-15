import "./style.css";

type Operator = "+" | "-" | "×" | "÷" | "="
type ComputedValue = {
  [key in Exclude<Operator, "=">]: (num1: number, num2: number) => number
  // 추가 구현: 여기서 OPERATORS 타입을 뽑아오는 것(?)
}

interface CalculatorInterface {
  tempValue: string | number
  tempOperator?: Operator | string
  render(inputValue: string | number): void
  reset(): void
  calculate(operator: Operator | string): void
  initEvent(): void
}

const VALID_NUMBER_OF_DIGITS = 3
const INIT_VALUE = 0
const OPERATORS = ["+", "-", "×", "÷"]
// 추가 구현: OPERATORS에 '='도 같이 할당 하는 것
// 추가 구현: OPERATORS의 타입을 enum으로 하는 것

const validateNumberLength = (value: string | number) => {
  return String(value).length < VALID_NUMBER_OF_DIGITS
}

const isZero = (value: string) => Number(value) === 0

const getComputedValue: ComputedValue = {
  "+": (num1, num2) => num1 + num2,
  "-": (num1, num2) => num1 - num2,
  "×": (num1, num2) => num1 * num2,
  "÷": (num1, num2) => num1 / num2, // 추가 구현: 나눗셈 연산 오류, 그 외 연산 오류
}

const Calculator: CalculatorInterface = {
  tempValue: INIT_VALUE,
  tempOperator: undefined,
  render(inputValue: string | number) {
    const resultEl = <HTMLDivElement>document.querySelector("#result") // 추가 구현: 이 반복되는 선택자 부분 수정
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
    const resultEl = <HTMLDivElement>document.querySelector("#result")

    resultEl.innerText = String(INIT_VALUE)
    this.tempValue = INIT_VALUE
    this.tempOperator = undefined
  },
  calculate(operator: Operator | string) {
    const isReadyCalculated =
      operator === "=" && this.tempOperator && OPERATORS.includes(this.tempOperator)
    const isTempCalculate = OPERATORS.includes(operator)

    if (isTempCalculate) {
      const resultEl = <HTMLDivElement>document.querySelector("#result")

      this.tempOperator = operator
      this.tempValue = Number(resultEl.innerText)

      resultEl.innerText = String(INIT_VALUE)

      return
    }

    if (isReadyCalculated) {
      const resultEl = <HTMLDivElement>document.querySelector("#result")

      const resultValue = getComputedValue[this.tempOperator as Exclude<Operator, "=">](
        Number(this.tempValue),
        Number(resultEl.innerText)
      )

      resultEl.innerText = String(resultValue)
    }
  },
  initEvent() {
    const buttonContainerEl = document.querySelector(".contents")

    buttonContainerEl?.addEventListener("click", ({ target }) => {
      const buttonText = (target as HTMLButtonElement).innerText
      // 추가 구현: 이런 assertion 줄여가기

      if (buttonText === "AC") {
        this.reset()

        return
      }

      if (OPERATORS.concat("=").includes(buttonText)) {
        this.calculate(buttonText)

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
