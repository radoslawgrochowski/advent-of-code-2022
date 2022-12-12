// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'

const print = (render: boolean[][]) => {
  for (let y = 0; y < 6; y++) {
    let line = ''
    for (let x = 0; x < 40; x++) {
      const value = render[y][x]
      const char = value ? '#' : '.'
      line += char
    }
    console.log(line)
  }
}

const getPosition = (cycleIndex: number) => {
  const x = (cycleIndex - 1) % 40
  const y = Math.floor((cycleIndex - 1) / 40)
  return { x, y }
}

const part = (input: string) => {
  let X = 1
  let cycleIndex = 0
  let strengths = 0
  const pending: number[] = []
  const lines = input.split('\n')

  const render: boolean[][] = [[], [], [], [], [], []]

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

    const { x, y } = getPosition(cycleIndex)
    console.log(x, y)
    if ([x - 1, x, x + 1].includes(X)) {
      render[y][x] = true
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
  return render
}


const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result:`)
  print(result)
}

main()
  .catch(e => console.error(e))
