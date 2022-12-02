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

const lose: Record<string, string> = {
  A: 'Z',
  B: 'X',
  C: 'Y',
}

const part = (input: string[]) => {
  return input.map((line): number => {
    const [elf, result] = line.split(' ')
    if (result == 'X')
      return score[lose[elf]] + 0
    if (result == 'Y')
      return score[draw[elf]] + 3
    if (result == 'Z')
      return score[winner[elf]] + 6
    throw new Error()
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
