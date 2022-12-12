// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'

const part = (input: string) => {
  let X = 1
  let cycleIndex = 0
  let strengths = 0
  const pending: number[] = []
  const lines = input.split('\n')

  const cycle = () => {
    const toProcess = pending.shift()!
    if (typeof toProcess === 'number') {
      X += toProcess;
    }
    cycleIndex++
    console.log({ cycleIndex, X })
    if ((cycleIndex + 20) % 40 == 0) {
      strengths += cycleIndex * X
      console.log({ strengths })
    }
  }

  while (lines.length) {
    const line = lines.shift()!
    const [command, value] = line.split(' ')
    if (command === 'addx') {
      cycle()
      cycle()
      X += parseInt(value)
    } else if (command === 'noop') {
      cycle()
    }
  }

  cycle()

  return { X, strengths }
}


const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result:`)
  console.log(result)
}

main()
  .catch(e => console.error(e))
