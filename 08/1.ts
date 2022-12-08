// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'


const getBelow = (x: number, y: number, fields: number[][]): number[] =>
  fields.slice(y + 1).map((line) => line[x])
const getAbove = (x: number, y: number, fields: number[][]): number[] =>
  fields.slice(0, y).map((line) => line[x])
const getLeft = (x: number, y: number, fields: number[][]): number[] =>
  fields[y].filter((_, i) => i < x)
const getRight = (x: number, y: number, fields: number[][]): number[] =>
  fields[y].filter((_, i) => i > x)

const part = (input: string) => {
  const fields = input.split('\n').map(x => x.split('').map(Number))
  const visible = fields.map((line, y) => line.map((v, x) => {
    if (Math.max(...getLeft(x, y, fields)) < v) return true
    if (Math.max(...getRight(x, y, fields)) < v) return true
    if (Math.max(...getAbove(x, y, fields)) < v) return true
    if (Math.max(...getBelow(x, y, fields)) < v) return true
    return false
  }))
  console.log({ visible })
  const notVisibleCount = visible
    .reduce((sum, currentLine) => {
      return sum + currentLine.filter(Boolean).length
    }, 0)
  return notVisibleCount
}


const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
