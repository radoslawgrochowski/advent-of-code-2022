// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'


const getBelow = (x: number, y: number, fields: number[][]): number[] =>
  fields.slice(y + 1).map((line) => line[x])
const getAbove = (x: number, y: number, fields: number[][]): number[] =>
  fields.slice(0, y).map((line) => line[x]).reverse()
const getLeft = (x: number, y: number, fields: number[][]): number[] =>
  fields[y].filter((_, i) => i < x).reverse()
const getRight = (x: number, y: number, fields: number[][]): number[] =>
  fields[y].filter((_, i) => i > x)

const getScore = (v: number, line: number[]) => {
  if(line.length === 0) return 0
  const index = line.findIndex(l => l >= v) 
  if (index == -1) return line.length
  else return index + 1
}

const part = (input: string) => {
  const fields = input.split('\n').map(x => x.split('').map(Number))
  const scores = fields.map((line, y) => line.map((v, x) => {
    const score = [
      getScore(v, getBelow(x, y, fields)),
      getScore(v, getAbove(x, y, fields)),
      getScore(v, getLeft(x, y, fields)),
      getScore(v, getRight(x, y, fields)),
    ].reduce((prev, current) => prev * current)

    return score
  }))

  return Math.max(...scores.flat(2))
}


const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
