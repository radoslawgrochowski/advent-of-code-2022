// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'

type Packet = number | Packet[]

const compare = (a: Packet, b: Packet): number => {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  a = Array.isArray(a) ? a : [a]
  b = Array.isArray(b) ? b : [b]
  for (let i = 0; i < a.length && i < b.length; i++) {
    const result = compare(a[i], b[i]);
    if (result !== 0) return result;
  }

  return a.length - b.length;
};

const part = (input: string) => {
  const pairs = input.split('\n\n').slice()
  const diffs = pairs.map(x => {
    const [left, right] = x.split('\n')
    const result = compare(eval(left), eval(right))
    console.log({ result })
    return result
  })
  return diffs.reduce((prev, current, index) => {
    if (current < 0) return prev + index + 1
    return prev
  }, 0)
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log('Result:')
  console.log(result)
}

main()
  .catch(e => console.error(e))
