// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'

const part = (input: string) => {
  const lines = input.split('\n')
  return lines.reduce((count, line) => {
    const [first, second] = line.split(',')
    const [a, b] = first.split('-').map(Number)
    const [c, d] = second.split('-').map(Number)
    if (a <= c && b >= d) return count + 1
    if (c <= a && d >= b) return count + 1
    return count
  }, 0)
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
