import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [incorrectOpts, setIncorrectOpts] = useState(null);
  const [ans, setAns] = useState(null);
  const [opts, setOpts] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://the-trivia-api.com/v2/questions");
        const data = await res.json();

        setQuestions(data.map((e) => e.question.text));
        setIncorrectOpts(data.map((e) => e.incorrectAnswers));
        setAns(data.map((e) => e.correctAnswer));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (incorrectOpts && ans) {
      async function shuffleData() {
        const shuffledArr = shuffleArr(incorrectOpts, ans);
        setOpts(shuffledArr);
      }
      shuffleData();
    }
  }, [incorrectOpts, ans]);

  function shuffleArr(arr1, arr2) {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      let randomNum = Math.floor(Math.random() * 3);
      newArr[i] = [...arr1[i]];
      newArr[i].splice(randomNum, 0, arr2[i]);
    }
    return newArr;
  }

  return (
    <>
      {questions && questions[index]}
      {opts &&
        opts[index].map((e, i) => {
          return <li key={i} onClick={() => {console.log(e)}}>{e}</li>;
        })}

      <button onClick={() => setIndex(index + 1)}>Next</button>
    </>
  );
};

export default Quiz;
