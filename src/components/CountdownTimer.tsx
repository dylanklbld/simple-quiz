import "./CountdownTimer.css"

import React, { useEffect, useRef, useState } from 'react'

type CountdownTimerProps = {
    timeInSeconds: number,
    timePeriodInSeconds: number,
    onTimeout: () => void
}

const initialOffset = 441
const colorStep = Math.floor(initialOffset/3)

const fineGreenColor = "#6fdb6f"
const hurryYellowColor = "#ebd334"
const lastSecondsRedColor = "#cf0c0c"

const colors = [fineGreenColor, hurryYellowColor, lastSecondsRedColor]

function CountdownTimer({ timeInSeconds, timePeriodInSeconds, onTimeout }: CountdownTimerProps): React.ReactElement {
    useEffect(() => {
        // after 0 seconds
        if (timeInSeconds < 0) {
            onTimeout()
        }
    }, [onTimeout, timeInSeconds])

    const strokeDashoffset = initialOffset-(timeInSeconds*(initialOffset/timePeriodInSeconds));

    const getStrokeColor = () => {
        const index = Math.floor(strokeDashoffset/colorStep) > 2 ? 2 : Math.floor(strokeDashoffset/colorStep)

        return colors[index]
    }

    const strokeColor = getStrokeColor()

    return <div className="timer">
        {timeInSeconds >= 0 ? <h2>{timeInSeconds}</h2> : <h2>{":("}</h2>}
        <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
            <g>
                <circle className="circle-animation" 
                 strokeDashoffset={strokeDashoffset.toString()}
                 r="70" cy="81" cx="81" 
                 strokeWidth="8" stroke={strokeColor}
                 fill="none"/>
            </g>
        </svg>
    </div>
}

export default CountdownTimer