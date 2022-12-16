// Run with
// `ts-node filename example.txt`
import { readInput } from '../utils'

type Position = { x: number, y: number }

const getPositonOf = (char: string, heights: string[][]): Position => {
  const found = heights
    .flatMap((row, y) => {
      return row.map((value, x) => {
        return { y, x, value } as const
      })
    })
    .find(({ value }) => value == char)

  if (found) {
    const { x, y } = found
    console.log({ found })
    return { x, y }
  }
  throw new Error(`Position not found for ${char}`)
}

const getValue = (char: string) =>
  char == "S"
    ? "a".charCodeAt(0) - 1
    : char == "E"
      ? "z".charCodeAt(0) + 1
      : char.charCodeAt(0)

const getNext = (pos: Position, heights: string[][]): Position[] => {
  const value = getValue(heights[pos.y][pos.x])
  return [
    { x: pos.x - 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x + 1, y: pos.y },
  ].filter(({ x, y }) =>
    x >= 0
    && y >= 0
    && x < heights[0].length
    && y < heights.length
  ).filter(({ x, y }) => {
    const diff = (getValue(heights[y][x]) - value)
    return diff <= 1
  })
}

const part = (input: string) => {
  const heights = input.split('\n')
    .map(x => x.split(''))
  const start = getPositonOf("S", heights)
  const end = getPositonOf("E", heights)
  console.log({ start, end })
  const visited = new Set<string>()
  const turnStack: Position[] = [start]
  let turnIndex = 0;

  while (turnStack.length) {
    if (turnStack.some(({ x, y }) => x === end.x && y === end.y)) {
      console.log({ end })
      return turnIndex
    }
    console.log({ turnIndex, turnStack })
    const nextTurnStack: Position[] = []
    while (turnStack.length) {
      const currentPosition = turnStack.pop()!

      const nextMoves =
        getNext(currentPosition, heights)
          .filter(({ x, y }) => !visited.has(`${x}.${y}`))

      nextMoves
        .forEach(({ x, y }) => visited.add(`${x}.${y}`))

      console.log({ currentPosition, nextMoves })
      nextTurnStack.push(...nextMoves)
    }
    turnIndex++
    turnStack.push(...nextTurnStack)
  }

  throw new Error('Path not found')
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log('Result:')
  console.log(result)
}

main()
  .catch(e => console.error(e))
