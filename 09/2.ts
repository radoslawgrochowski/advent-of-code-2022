// Run with
// `ts-node filename example.txt`
import { readInput, range } from '../utils'

type Direction = 'L' | 'U' | 'D' | 'R'
type Position = { x: number, y: number }

const getNextState = (prevKnot: Position, prevState: Position, d: Direction) => {
  const newState = { ...prevState };
  const xDiff = () => Math.abs(prevKnot.x - newState.x)
  const yDiff = () => Math.abs(prevKnot.y - newState.y)

  const tooFar = () => xDiff() > 1 || yDiff() > 1
  if (!tooFar()) return newState

  // if diagonal 
  if (xDiff() + yDiff() > 2) {
    if (prevKnot.x > prevState.x) newState.x += 1
    else newState.x -= 1
    if (prevKnot.y > prevState.y) newState.y += 1
    else newState.y -= 1
  } else {
    if (xDiff() > 1) {
      if (prevKnot.x > prevState.x) newState.x += 1
      else newState.x -= 1
    }
    if (yDiff() > 1) {
      if (prevKnot.y > prevState.y) newState.y += 1
      else newState.y -= 1
    }
  }

  return newState
}

const debug = (state: Position[], size: number) => {
  const map = range(size * 2).map(_ => range(size * 2).map(_ => '.'))
  map[size][size] = 's'
  state.forEach(({ x, y }, i) => {
    map[size + y][size + x] = String(i)
  })
  map.forEach(x => {
    console.log(x.join(''))
  })
  console.log('\n')
}



const part = (input: string) => {
  const state: Position[] = range(10).map(_ => ({ x: 0, y: 0 }))
  const tVisited = new Set<string>()
  const visit = () => tVisited.add(`${state[9].x},${state[9].y}`)
  visit()
  const moves = input
    .split('\n')
    .map(x => x.split(' '))
    .map(([a, b]) => [a as Direction, parseInt(b)] as const)
  for (let [d, n] of moves) {
    console.log({ d, n })
    for (let i = 0; i < n; i++) {
      if (d === 'U') { state[0].y -= 1 }
      if (d === 'R') { state[0].x += 1 }
      if (d === 'D') { state[0].y += 1 }
      if (d === 'L') { state[0].x -= 1 }

      for (let t = 1; t < state.length; t++) {
        state[t] = getNextState(state[t - 1], state[t], d)
      }
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
