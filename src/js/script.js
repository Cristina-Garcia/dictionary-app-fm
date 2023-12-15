import fetchDictionaryData from './service.js'

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'
const checkbox = document.querySelector('#switch')

const btnSearch = document.getElementById('btn-search')
const input = document.querySelector('.form__inputsearch')
const textInvalid = document.querySelector('.form__alert__text')

const selectOption = document.querySelector('.header__select')

// funcion del switch
checkbox.addEventListener('change', function () {
  if (this.checked) {
    trans()
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    trans()
    document.documentElement.setAttribute('data-theme', 'light')
  }
})

let trans = () => {
  document.documentElement.classList.add('transition')
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition')
  }, 1000)
}

// funcion de select font
selectOption.addEventListener('change', (e) => {
  const options = ['sans', 'serif', 'mono']
  const value = e.target.value
  for (const option in options) {
    if (value === options[option]) {
      document.documentElement.setAttribute('data-font', `${options[option]}`)
    }
  }
})

btnSearch.addEventListener('click', async function () {
  let wordToSearch = ''
  wordToSearch = input.value
  if (wordToSearch === '') {
    input.classList.add('alert--invalid')
    textInvalid.classList.add('alert--invalid__text')
    return
  }
  const data = await fetchDictionaryData(wordToSearch)
  console.log(data)
  // const response = await fetch(`${URL}/${wordToSearch}`)
  // const data = await response.json()
  // console.log(data)
})
