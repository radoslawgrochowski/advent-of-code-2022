// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'

const part = (input: string) => {
  const a = input.split('')
  for (let i = 3; i < a.length; i++) {
    const set = new Set(a.slice(i - 4, i))
    if (Array.from(set).length === 4) {
      return i
    }
  }
  return -1
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
