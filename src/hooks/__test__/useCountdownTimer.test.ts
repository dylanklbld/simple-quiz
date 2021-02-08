import { act, renderHook } from '@testing-library/react-hooks'

import useCountdownTimer from '../useCountdownTimer'

it('should initialize the timer and start countdown', async function () {
  const seconds = 3
  const { result, waitForNextUpdate, waitFor } = renderHook(() => useCountdownTimer(seconds))

  expect(result.current[0]).toBe(seconds)

  //start timer
  result.current[1]()

  for(let i = 1; i < seconds; i++) {
    await waitForNextUpdate({timeout:2000})
    await waitFor(()=>{expect(result.current[0]).toBe(seconds-i)})
  }
})

it('should stop the timer', async function () {

  const seconds = 3
  const { result, waitForNextUpdate, waitFor } = renderHook(() => useCountdownTimer(seconds))

  expect(result.current[0]).toBe(seconds)

  //start timer
  result.current[1]()

  await waitForNextUpdate({timeout:2000})
  await waitFor(()=>{expect(result.current[0]).toBe(seconds-1)})

  act(()=>{
    // stop timer
    result.current[3]()
  })

  await waitFor(()=>{expect(result.current[0]).toBe(seconds)})

})

it('should restart the timer', async function () {
  const seconds = 3
  const { result, waitForNextUpdate, waitFor } = renderHook(() => useCountdownTimer(seconds))

  expect(result.current[0]).toBe(seconds)

  //start timer
  result.current[1]()

  await waitForNextUpdate({timeout:2000})
  await waitFor(()=>{expect(result.current[0]).toBe(seconds-1)})

  act(()=>{
    //restart timer
    result.current[2]()
  })

  expect(result.current[0]).toBe(seconds)
})

