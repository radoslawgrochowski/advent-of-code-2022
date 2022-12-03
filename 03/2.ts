// Run with
// `ts-node filename example.txt`

import fs from 'node:fs/promises'

const filePath = process.argv[2] || './example.txt'
const getInput = async (filePath: string) => {
  return await fs.readFile(filePath, 'utf8')
}

const getPriority = (char: string) => {
  if (char.toUpperCase() === char) return char.charCodeAt(0) - 38
  return char.charCodeAt(0) - 96
}

const part = (input: string[]) => {
  return input.reduce<string[][]>((prev, current) => {
    if (prev[prev.length - 1].length < 3) {
      prev[prev.length - 1].push(current)
    } else {
      prev.push([current])
    }
    return prev
  }, [[]]).reduce((prev, current) => {
    const [first, second, third] = current.map(x => x.split(''))
    const common = first.find(x => second.some(s => x === s) && third.some(s => x === s))
    console.log({ first, second, third })
    if (!common) { new Error('no common'); return 0 }
    const priority = getPriority(common)
    console.log({ common, priority })
    return prev + priority
  }, 0)
}


const main = async () => {
  console.log(`Running 2022/03 for file ${filePath}`)
  const input = await getInput(filePath)
  const lines = input.split('\n').filter(Boolean)
  const result = part(lines)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
