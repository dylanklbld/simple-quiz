import { useEffect, useState } from 'react'

export type FetchedData<D> = [D | undefined, () => Promise<D | undefined>, boolean]

export const useFetchedData = <D>(
  callback: () => Promise<D>,
  compare: React.DependencyList = [],
  initial?: D,
): FetchedData<D> => {
  const [data, setData] = useState(initial)
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(
    () => {
      let subscribed = true
      setIsLoading(true)
      callback()
        .then((res) => {
          if (subscribed) {
            setData(res)
            setIsLoading(false)
          }
        })
        .catch(() => subscribed && setIsLoading(false))
      return () => {
        subscribed = false
      }
    },
    // Compare can not be verified statically by eslint rule.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    compare,
  )

  const refetch = async () => {
    setIsLoading(true)
    try {
      const res = await callback()
      setData(res)
      return res
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  return [data, refetch, isLoading]
}