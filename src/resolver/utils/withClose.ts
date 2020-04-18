export function withClose<T> (asyncIterator: AsyncIterator<T | undefined>, onCancel: () => void): AsyncIterator<T | undefined> {
  return {
    ...asyncIterator,
    return: (): ReturnType<AsyncIterator<T>['return']> => {
      onCancel()
      return asyncIterator.return ? asyncIterator.return() : Promise.resolve({ value: undefined, done: true })
    }
  }
}
export default withClose
