import { act, renderHook } from '@testing-library/react-hooks'

import {useFetchedData} from '../useFetchData'

it('should call the promise and return the result', async function () {
  const { result, waitForNextUpdate } = renderHook(() => useFetchedData(() => Promise.resolve('test result')))

  await waitForNextUpdate()

  expect(result.current[0]).toBe('test result')
})

it('should call the callback a second time on refetch', async function () {
  const testPromise = jest.fn().mockResolvedValue('final result').mockResolvedValueOnce('test result')
  const { result, waitForNextUpdate } = renderHook(() => useFetchedData<string>(async () => await testPromise()))

  await waitForNextUpdate()
  expect(result.current[0]).toBe('test result')

  // call refetch
  await act(async () => {
    const refetchResult = await result.current[1]()
    expect(refetchResult).toBe('final result')
  })
  expect(result.current[0]).toBe('final result')
})
