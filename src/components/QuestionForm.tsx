import './QuestionForm.css';

import React, {FormEvent, useEffect, useState} from 'react'

type QuestionFormProps = {
    question: any,
    onCorrectAnswer: ()=>void,
    onWrongAnswer:()=>void
}

export const placeholderText = "Type answer here"

const QuestionForm = ({ question, onCorrectAnswer, onWrongAnswer }:QuestionFormProps) => {
    const [answer, setAnswer] = useState<string>('')
    
    const handleSubmit = (e:any) => {
        e.preventDefault()

        if(answer){
            if (hasCorrectAnswer(answer)) {
                onCorrectAnswer()
            } else {
                onWrongAnswer()
            }
        }
        
        // clearing the field
        setAnswer('')
    }

    const hasCorrectAnswer = (answer: string): boolean => {
        // cleaning from quotes and simple html tags like <i></i>
        return question.answer.toLowerCase().trim().replace(/['"]+/g, '').replace(/<[^>]+>/g, '') === answer.toLowerCase().trim().replace(/['"]+/g, '').replace(/<[^>]+>/g, '')
    }

    return (
        <div className="qa">
            <div className="question">
                <span>{question && question.question}</span>
            </div>
            <form className="answer" onSubmit={handleSubmit}>
                <input value={answer} onChange={(e)=>setAnswer(e.target.value)} name="answer" type="text" placeholder={placeholderText} />
                <input type="submit" value="Submit" onSubmit={handleSubmit}/>
            </form>
        </div>
    );
}

export default QuestionForm