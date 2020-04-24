export function withClose<T> (asyncIterator: AsyncIterator<T | undefined>, onCancel: () => void): AsyncIterator<T | undefined> {
  if (!asyncIterator.return) {
    asyncIterator.return = (): ReturnType<AsyncIterator<T>['return']> => Promise.resolve({ value: undefined, done: true })
  }
  const newReturn = asyncIterator.return.bind(asyncIterator)
  asyncIterator.return = () => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
    onCancel()
    return newReturn()
  }
  return asyncIterator
}
