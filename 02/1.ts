// Run with
// `ts-node filename example.txt`

import fs from 'node:fs/promises'
import { sum } from '../utils'

const filePath = process.argv[2] || './example.txt'
const getInput = async (filePath: string) => {
  return await fs.readFile(filePath, 'utf8')
}

const score: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3
}

const winner: Record<string, string> = {
  A: 'Y',
  B: 'Z',
  C: 'X',
}

const draw: Record<string, string> = {
  A: 'X',
  B: 'Y',
  C: 'Z',
}
const winnerPoints = (elf: string, my: string) => {
  if (winner[elf] == my) return 6
  if (draw[elf] == my) return 3
  return 0
}

const part = (input: string[]) => {
  return input.map(line => {
    const [elf, my] = line.split(' ')
    return score[my] + winnerPoints(elf, my)
  }).reduce(sum, 0)
}


const main = async () => {
  console.log(`Running 2022/02 for file ${filePath}`)
  const input = await getInput(filePath)
  const lines = input.split('\n').filter(Boolean)
  const result = part(lines)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
