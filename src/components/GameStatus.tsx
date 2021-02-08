import './GameStatus.css';

import React, {useEffect} from 'react'

import { RootState } from '../redux/reducers'
import { useSelector } from 'react-redux'

function GameStatusBoard() {
    const { round, roundsAmount, score } = useSelector((state:RootState) => state?.quizInfo)

    return (
        <div className="status">
            <div className="info">
                <span>Round:{round}/{roundsAmount}</span>
                <span>Score:{score}</span>
            </div>
        </div>
    );
}

export default GameStatusBoard;
