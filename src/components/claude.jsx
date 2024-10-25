import React, { useEffect, useState } from "react";

const Claude = () => {
  const [questions, setQuestions] = useState(null);
  const [incorrectOpts, setIncorrectOpts] = useState(null);
  const [ans, setAns] = useState(null);
  const [opts, setOpts] = useState(null);
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://the-trivia-api.com/v2/questions");
        const data = await res.json();
        
        setQuestions(data.map(e => e.question.text));
        setIncorrectOpts(data.map(e => e.incorrectAnswers));
        setAns(data.map(e => e.correctAnswer));
        setOpts(shuffleArr(incorrectOpts, ans));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleOptionClick = (selected) => {
    setSelectedAnswer(selected);
    setIsCorrect(selected === ans[index]);
  };

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
    <div className="max-w-2xl mx-auto p-6">
      {questions && (
        <div className="space-y-6">
          <div className="text-xl font-medium">
            Question {index + 1}: {questions[index]}
          </div>
          
          <div className="space-y-3">
            {opts && opts[index] && opts[index].map((option, optIndex) => (
              <button
                key={optIndex}
                onClick={() => handleOptionClick(option)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-white hover:bg-gray-50'
                } border-2 ${
                  selectedAnswer === option ? 'border-2' : 'border-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <div className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
            </div>
          )}

          <button
            onClick={() => {
              setIndex(index + 1);
              setSelectedAnswer(null);
              setIsCorrect(null);
            }}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Claude;