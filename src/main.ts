import "./style.css";

const VALID_NUMBER_OF_DIGITS = 3;
const BASE_DIGIT = 10;

// const resultEl = document.querySelector("#result") as HTMLElement
const resultEl = <HTMLDivElement>document.querySelector("#result") 

if (resultEl) {
  resultEl.innerText = String(99999)
}

resultEl.addEventListener("click", function ({ target }: MouseEvent) {
  if (target) {
    alert((target as HTMLDivElement).innerText)
  }
})