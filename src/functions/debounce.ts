type Procedure = (...args: any[]) => void

export const debounce = <F extends Procedure>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<F>): void => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}
