import "./Quiz.css"

import React, { useEffect, useState } from 'react';
import { resetQuiz, restartQuiz, setRound, updateGameStatus } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import CountdownTimer from '../components/CountdownTimer';
import {GameStatus} from '../types'
import GameStatusBoard from '../components/GameStatus'
import OutcomePopup from "../components/OutcomePopup";
import QuestionForm from "../components/QuestionForm";
import { RootState } from '../redux/reducers'
import {useCountdownTimer} from '../hooks/useCountdownTimer'
import {useQuizQuestions} from '../hooks/useQuizQuestions'

const timeIsOutMessage = "Time is out! Why so slow?"
const wrongAnswerMessage = "Wrong answer"

function Quiz() {
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [extraMessage, setExtraMessage] = useState<string>('')
    
    const { gameStatus, timePeriodInSeconds } = useSelector((state:RootState) => state?.quizInfo)
    console.log("tototo", useQuizQuestions())
    const [question, refetchQuestion, isWaiting] = useQuizQuestions()
    const [timer, startTimer, restartTimer, stopTimer] = useCountdownTimer(timePeriodInSeconds)
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if([GameStatus.Won, GameStatus.Lost].includes(gameStatus)) {
            setShowPopup([GameStatus.Won, GameStatus.Lost].includes(gameStatus))
        }
    }, [gameStatus])

    const onCorrectAnswer = () => {
        dispatch(setRound())
        dispatch(updateGameStatus())
        
        refetchQuestion()
        restartTimer()
    }

    const onAnswerFailed = ({isTimeout=false}={}) => {
        if(isTimeout) {
            setExtraMessage(timeIsOutMessage)
        } else {
            setExtraMessage(wrongAnswerMessage)
        }

        const wrong = true
        dispatch(updateGameStatus(wrong))
        stopTimer()
    }

    const startQuiz = () => {
        startTimer()
        dispatch(updateGameStatus())
    }

    const handleRestartQuiz = () => {
        setExtraMessage('')        
        setShowPopup(false)
        refetchQuestion()
        
        restartTimer()
        dispatch(restartQuiz())
    }

    const handleResetQuiz = () => {
        setExtraMessage('')        
        setShowPopup(false)
        refetchQuestion()
        
        stopTimer()
        dispatch(resetQuiz())
    }

    const handleClosePopup = ()=>{
        setShowPopup(false)
        dispatch(resetQuiz())
    }

    const gameIsRunning = gameStatus === GameStatus.Playing

    return (
        <div className="main">
            {showPopup && <OutcomePopup 
                answer={question?.answer}
                onRestart={handleRestartQuiz}
                onClose={handleClosePopup}
                extraMessage={extraMessage} 
                gameStatus={gameStatus} />}
            <GameStatusBoard />
            {gameIsRunning && !isWaiting &&
                <QuestionForm question={question} onCorrectAnswer={onCorrectAnswer} onWrongAnswer={onAnswerFailed} />}
            <div className="controls">
               {!gameIsRunning ? 
                <button className="start-button" onClick={startQuiz}>Start</button> :
                <button className="reset-button" onClick={handleResetQuiz}>Reset</button>}
            </div>
            {gameIsRunning && !isWaiting && <CountdownTimer
                timeInSeconds={timer} 
                timePeriodInSeconds={timePeriodInSeconds}
                onTimeout={()=>{onAnswerFailed({isTimeout:true})}} />}
        </div>
    );
}

export default Quiz