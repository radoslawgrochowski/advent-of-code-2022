// Run with
// `ts-node filename example.txt`

import fs from 'node:fs/promises'
import {  sortDesc, sum } from '../utils'

const filePath = process.argv[2] || './example.txt'
const getInput = async (filePath: string) => {
  return await fs.readFile(filePath, 'utf8')
}
const part = (input: string[]) => {
  let temp = 0
  const array = []
  for (let x of input) {
    if (!x) {
      array.push(temp)
      temp = 0
    } else {
      temp += +x
    }
  }
  return array.sort(sortDesc).slice(0, 3).reduce(sum)
}


const main = async () => {
  console.log(`Running 2022/01 for file ${filePath}`)
  const input = await getInput(filePath)
  const lines = input.split('\n')
  const result = part(lines)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
