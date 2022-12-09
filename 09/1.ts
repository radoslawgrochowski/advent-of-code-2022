// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'

type Direction = 'L' | 'U' | 'D' | 'R'
type Position = { x: number, y: number }

const part = (input: string) => {
  const state = {
    head: { x: 0, y: 0 },
    tail: { x: 0, y: 0 }
  }
  const tVisited = new Set<string>()
  const visit = () => tVisited.add(`${state.tail.x},${state.tail.y}`)
  visit()
  const moves = input
    .split('\n')
    .map(x => x.split(' '))
    .map(([a, b]) => [a as Direction, parseInt(b)] as const)
  for (let [d, n] of moves) {
    for (let i = 0; i < n; i++) {
      console.log({ d })
      if (d === 'U') { state.head.y -= 1 }
      if (d === 'R') { state.head.x += 1 }
      if (d === 'D') { state.head.y += 1 }
      if (d === 'L') { state.head.x -= 1 }


      const needJump =
        Math.abs(state.head.x - state.tail.x)
        + Math.abs(state.head.y - state.tail.y) > 2
      if (needJump) {
        if (['U', 'D'].includes(d)) { state.tail.x = state.head.x }
        else { state.tail.y = state.head.y }
      }

      const needMove =
        Math.abs(state.head.x - state.tail.x) >= 2 ||
        Math.abs(state.head.y - state.tail.y) >= 2

      if (needMove) {
        if (d === 'U') { state.tail.y -= 1 }
        if (d === 'R') { state.tail.x += 1 }
        if (d === 'D') { state.tail.y += 1 }
        if (d === 'L') { state.tail.x -= 1 }
      }
      console.log({ state })
      visit()
    }
  }

  return Array.from(tVisited.keys()).length
}


const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
