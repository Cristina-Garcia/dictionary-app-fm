const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

const fetchDictionaryData = async (word) => {
  const response = await fetch(`${URL}/${word}`)
  const data = await response.json()
  return data
}

export default fetchDictionaryData
