import { useEffect, useRef, useState } from 'react'

export function useCountdownTimer(countdownInSeconds:number):[number, ()=>void,()=>void, ()=>void] {
    const [timeInSeconds, setTimeInSeconds] = useState<number>(countdownInSeconds)
    
    const startTime = useRef<number>(0)
    const timeInSecondsRef = useRef<number>(countdownInSeconds)
    const tickHandler = useRef<any>()

    useEffect(() => {
        return () => {
            clearInterval(tickHandler?.current);
        }
    }, [])

    const handleTick = () => {
        const secondsLeft = timeInSecondsRef.current - Math.floor((Date.now()-startTime.current) / 1000)

        // after 0 will stop counting
        if(secondsLeft >= -1) {
            setTimeInSeconds(secondsLeft)
        }
    }

    const startTimer = () => {
        timeInSecondsRef.current = countdownInSeconds
        startTime.current = Date.now()
        tickHandler.current = setInterval(handleTick, 1000)
    }

    const stopTimer = () => {
        clearInterval(tickHandler?.current)
        setTimeInSeconds(countdownInSeconds)
    }

    const restartTimer = () => {
        clearInterval(tickHandler?.current)
        setTimeInSeconds(countdownInSeconds)
        
        startTimer()
    }

    return [timeInSeconds, startTimer, restartTimer, stopTimer]
}

export default useCountdownTimer
