import './OutcomePopup.css';

import { GameStatus } from '../types';

type StatusPopupProps = {
    answer: string,
    extraMessage: string,
    gameStatus: GameStatus,
    onClose: ()=>void,
    onRestart: ()=>void
}

const StatusMessages = new Map<number, string>([
    [GameStatus.Won, "Congratulations! You won!"],
    [GameStatus.Lost, "You've lost! Sorry"]
  ]);


const OutcomePopup = ({ answer, extraMessage, gameStatus, onClose, onRestart }:StatusPopupProps) => {
    const statusMessage = StatusMessages.get(gameStatus)
    const lost = gameStatus === GameStatus.Lost

    return (
        <div className='popup'>
            <div className='popup-inner'>
                <h1>{statusMessage}</h1> 
                {extraMessage && <h2>{extraMessage}</h2>}
                {lost && <div>
                    <span>The answer was:</span>
                    <h3>{answer}</h3>
                </div>}
                <button onClick={()=>onClose()}>Close</button>
                <button onClick={()=>onRestart()}>Restart</button>
            </div>
        </div>
    );
}

export default OutcomePopup