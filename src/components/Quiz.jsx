import React, { useEffect, useState } from 'react'

const Quiz = () => {
  const [questions, setQuestions] = useState(null)
  const [incorrectOpts, setIncorrectOpts] = useState(null);
  const [correctAns, setCorrectAns] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect( ()=>{
    getData()
  },[] )

  async function getData(){
    try {
      const res = await fetch('https://the-trivia-api.com/v2/questions')
      const data = await res.json()
      setQuestions(data.map(e => e.question.text));
      setIncorrectOpts(data.map(e => e.incorrectAnswers));
      setCorrectAns(data.map(e => e.correctAnswer));
      console.log(data);      
    } catch (error) {
      setError(true)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <h2>....</h2>}
      {error && <h2>😥</h2>}
      {console.log(questions)}
      {console.log(incorrectOpts)}
      {console.log(correctAns)}
    </>
  )
}

export default Quiz
