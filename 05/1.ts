// Run with
// `ts-node filename example.txt`
import { range, readInput } from '../utils'

const part = (input: string) => {
  const [initial, moves] = input.split('\n\n')
  const stacks = initial.replace(/\s{4}/g, '_')
    .replace(/[\[\]]/g, '')
    .split('\n')
    .slice(0, -1)
    .map(stack =>
      stack
        .replace(/\s/g, '')
        .split('')
    ).reduce<string[][]>((stacks, current) => {
      current.forEach((value, index) => {
        if (!Array.isArray(stacks[index])) {
          stacks[index] = new Array()
        }
        if (value != '_') {
          stacks[index].push(value)
        }
      })
      return stacks
    }, [])

  moves
    .replace(/move\s/g, '')
    .replace(/from\s/g, '')
    .replace(/to\s/g, '')
    .split('\n').forEach((move) => {
      const [x, from, to] = move.split(' ').map(Number)
      range(x).forEach(() => {
        const value = stacks[from - 1].shift()!
        if (value) stacks[to - 1].unshift(value)
      })
    })
  return stacks.map(x => x.shift()).join('')
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
