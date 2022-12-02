export const range = (n: number) => Array.from({ length: n }, (_, i) => i)
export const sum = <V extends number>(prev: V, current: V) => prev + current
export const sortAsc = (a: number, b: number) => a - b
export const sortDesc = (a: number, b: number) => b - a
