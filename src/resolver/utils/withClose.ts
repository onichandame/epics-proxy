export function withClose<T> (asyncIterator: AsyncIterator<T | undefined>, onCancel: () => void): AsyncIterator<T | undefined> {
  const oldReturn = asyncIterator.return
  let run = false // somehow the return function is run twice
  asyncIterator.return = (): ReturnType<AsyncIterator<T>['return']> => {
    onCancel()
    return oldReturn && run ? (run = true) && oldReturn() : Promise.resolve({ value: undefined, done: true })
  }
  return asyncIterator
}
