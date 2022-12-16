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

const distress = ["[[2]]", "[[6]]",]

const part = (input: string) => {
  const pairs = input
    .split('\n').concat(distress)
    .filter(Boolean)
    .map(x => eval(x) as Packet)
    .sort(compare)

  return distress
    .map(x => pairs.findIndex(y => JSON.stringify(y) === x) + 1)
    .reduce((p, c) => p * c)
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log('Result:')
  console.log(result)
}

main()
  .catch(e => console.error(e))
