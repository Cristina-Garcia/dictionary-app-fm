import fetchDictionaryData from './service.js'

const checkbox = document.querySelector('#switch')

const btnSearch = document.getElementById('btn-search')
const input = document.querySelector('.form__inputsearch')
const textInvalid = document.querySelector('.form__alert__text')

const selectOption = document.querySelector('.header__select')

const word = document.querySelector('.searchedword__word')
const phonetic = document.querySelector('.searchedword__phonetic')

const nounList = document.querySelector('#list__noun')
const verbList = document.querySelector('#list__verb')

const synonyms = document.querySelector('#section-synonims')
const source = document.querySelector('.section__source')
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
  console.log(data[0])
  word.textContent = data[0].word
  phonetic.textContent = data[0].phonetic
    ? data[0].phonetic
    : data[0].phonetics[1].text
  const nounMeanings = data[0].meanings[0].definitions
  const synonim = data[0].meanings[0].synonyms
  nounMeanings.forEach((meaning) => {
    console.log(meaning)
    const li = document.createElement('li')
    li.innerHTML = meaning.definition
    nounList.appendChild(li)
  })
  const p = document.createElement('p')
  p.innerHTML = synonim
  synonyms.appendChild(p)
  const verbMeaning = data[0].meanings[1].definitions
  verbMeaning.forEach((meaning) => {
    const verbLi = document.createElement('li')
    verbLi.innerHTML = meaning.definition
    verbList.appendChild(verbLi)
  })
  const example = verbMeaning[0].example
  const exampleP = document.createElement('p')
  exampleP.innerText = example
  verbList.appendChild(exampleP)
  // console.log(ejemplo)
  const urlSource = data[0].sourceUrls[0]
  const a = document.createElement('a')
  a.href = urlSource
  a.innerHTML = urlSource
  source.appendChild(a)
})
