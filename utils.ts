export const range = (n: number) => Array.from({ length: n }, (_, i) => i)
export const sum = <V extends number>(prev: V, current: V) => prev + current
export const sortAsc = (a: number, b: number) => a - b
export const sortDesc = (a: number, b: number) => b - a

import fs from 'node:fs/promises'

const filePath = process.argv[2] || './example.txt'
export const readInput = async () => (await fs.readFile(filePath, 'utf8')).replace(/\n$/, "")

