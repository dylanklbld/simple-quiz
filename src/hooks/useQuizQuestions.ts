import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../redux/reducers'
import {updateQuestionList} from '../redux/actions'
import { useFetchedData } from '../hooks/useFetchData'

export function useQuizQuestions():[any, ()=>void, boolean, any] {
    const [shownQuestion, setShownQuestion]= useState<any>(null)
    const [isRefetchingQuestion, setIsRefetchingQuestion] = useState(true)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const questionIdList = useSelector((state:RootState)=>state.questions?.questionIdList)

    const fetchQuestion = async (): Promise<any> => {
        return fetch('http://jservice.io/api/random')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data[0]
            }).catch((err) => {
                setError(err)
            })
    }

    const [question, refetch, isLoading] = useFetchedData(async () => fetchQuestion())

    useEffect(() => {
        if (question) {
            // automatically refetch in case of it was already shown
            if (questionIdList.includes(question.id)) {
                setIsRefetchingQuestion(true)
                refetch()
            } else {
                setShownQuestion(question)
                dispatch(updateQuestionList(question.id))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question])

    useEffect(()=>{
        setIsRefetchingQuestion(false)
    }, [shownQuestion])

    const isWaiting = isLoading && isRefetchingQuestion 
    const refetchQuestion = refetch

    return [shownQuestion, refetchQuestion, isWaiting, error]
}
