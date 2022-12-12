// Run with
// `ts-node filename example.txt`
import { range, readInput } from '../utils'

const part = (input: string) => {
  const monkeys = input.split('\n\n').map(x => {
    const [, starting, operationString, testString, onTrueString, onFalseString] = x.split('\n')
    const items = starting.slice(18).split(',').map(Number)
    let inspectionCount = 0
    const inspect = (old: number): number => {
      inspectionCount++
      const [a, sign, b, more] = operationString
        .slice(19)
        .split(' ')
        .map(x => x === "old" ? old : x)

      if (more) throw new Error('more than 3 words in operation string')

      if (sign === '*') { return +a * +b }
      if (sign === '+') { return +a + +b }

      throw new Error(`undefined operation ${sign}`)
    }

    const testCheck = (value: number): boolean => {
      const t = testString.slice(8)
      if (t.startsWith('divisible by')) {
        const number = parseInt(testString.slice(21))
        if (Number.isNaN(number)) throw new Error('test number is NaN')
        return value % number == 0
      }
      throw new Error(`undefined test ${testString}`)
    }

    const onTrue = (): number => {
      const nextMonkey = parseInt(onTrueString.slice(29))
      if (Number.isNaN(nextMonkey)) throw new Error('nextMonkey number is NaN')
      return nextMonkey
    }

    const onFalse = (): number => {
      const nextMonkey = parseInt(onFalseString.slice(30))
      if (Number.isNaN(nextMonkey)) {
        throw new Error('nextMonkey number is NaN')
      }
      return nextMonkey
    }

    const test = (value: number): number => testCheck(value) ? onTrue() : onFalse()
    const getInspectionCount = () => inspectionCount
    return {
      items,
      inspect,
      test,
      getInspectionCount
    } as const
  })

  range(20).forEach(roundNumber => {
    monkeys.forEach(({ items, inspect, test }) => {
      while (items.length) {
        const item = items.shift()!
        const worry = inspect(item)
        const bored = Math.floor(worry / 3)
        const next = test(bored)
        monkeys[next].items.push(bored)
      }
    })
    console.log({ roundNumber, items: monkeys.map(x => x.items) })
  })

  return monkeys
    .map((x, i) => [i, x.getInspectionCount()])
    .sort((a, b) => +b[1] - a[1])
    .slice(0, 2)
    .map(([, count]) => count)
    .reduce((prev, curr) => prev * curr)
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log('Result:')
  console.log(result)
}

main()
  .catch(e => console.error(e))
