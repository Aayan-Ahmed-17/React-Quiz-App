import React, { useEffect, useState } from 'react'

const Quiz = () => {
  const [questions, setQuestions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect( ()=>{
    getData()
  },[] )

  async function getData(){
    try {
      const res = await fetch('https://the-trivia-api.com/v2/questions')
      const data = await res.json()
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

    </>
  )
}

export default Quiz
