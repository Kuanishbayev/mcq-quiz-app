import { useRef, useState } from 'react'
import { quiz } from '../data/db'

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [showCorrect, setShowCorrect] = useState(false)

    const {questions} = quiz
    const {question, choices, correctAnswer} = questions[activeQuestion]


    const onClickNext = () => {
        setShowCorrect(false)
        setSelectedAnswerIndex(null)
        setResult(prev => selectedAnswer ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
        } : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1
        }
    )
    if (activeQuestion !== questions.length - 1) {
        setActiveQuestion(prev => prev + 1)
    } else {
        setActiveQuestion(0)
        setShowResult(true)
    }
    }


    const onAnswerSelected = (answer, index, e) => {
        if (selectedAnswerIndex === null) {
            setShowCorrect(answer !== correctAnswer)
            setSelectedAnswerIndex(index)
            setSelectedAnswer(answer === correctAnswer)
        }
    }


  return (
    <div className='h-screen grid place-content-center bg-stone-300'>
        {
            !showResult ? (
                <div className='border p-4 bg-white rounded flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h1>Quiz</h1>
                        <div>
                            <span>{activeQuestion + 1}</span>
                            <span>/{questions.length}</span>
                        </div>
                    </div>
                    <h2 className='font-bold'>{question}</h2>
                    <ul className='flex flex-col gap-2'>
                        {
                            choices.map((answer, index) => (
                                <li className={`${selectedAnswerIndex !== null && 'cursor-not-allowed'} cursor-pointer rounded p-2 border ${choices.indexOf(correctAnswer) !== index && selectedAnswerIndex === index  ? 'bg-red-300' : selectedAnswerIndex === index ? 'bg-green-300' : showCorrect && choices.indexOf(correctAnswer) === index ? 'green' : ''}`} onClick={(e) => onAnswerSelected(answer, index, e)} key={index}>{answer}</li>
                            ))
                        }
                    </ul>
                    <button className='self-end bg-blue-400 text-white py-2 px-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                        {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            ) : (
                <div className='flex flex-col gap-2 bg-white rounded p-4 min-w-fit w-96'>
                    <h3 className='font-bold text-lg'>Result</h3>
                    <div className='border-b border-stone-500 pb-2'>
                        <p className='flex justify-between'>Total Questions: <span className='font-bold'>{questions.length}</span></p>
                        <p className='flex justify-between'>Total Score: <span className='font-bold'>{result.score}</span></p>
                        <p className='flex justify-between'>Correct Answers: <span className='font-bold text-green-500'>{result.correctAnswers}</span></p>
                        <p className='flex justify-between'>Wrong Answers: <span className='font-bold text-red-500'>{result.wrongAnswers}</span></p>
                    </div>
                    <button className='self-end bg-gray-500 px-4 py-2 rounded text-white' onClick={() => location.reload()}>Restart</button>
                </div>
            )
        }
    </div>
  )
}

export default Quiz