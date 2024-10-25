const question = document.getElementById("question")
const opts = document.getElementById("opts")
const button = document.getElementById("button")

let i = 0

function shuffleArr(arr1, arr2) {
  const newArr = [];
  for (let i = 0; i < 10; i++) {
    let randomNum = Math.floor(Math.random() * 3);
    newArr[i] = [...arr1[i]];
    newArr[i].splice(randomNum, 0, arr2[i]);
  }
  return newArr;
}

async function getData() {
  try {
    const res = await fetch("https://the-trivia-api.com/v2/questions");
    const data = await res.json();
    
    console.log(data);
    
    showData(data)

    
  } catch (err) {
    console.warn("error aar a ai", err);
  }
}
getData();

function showData (arr){
    const ques = arr.map((e) => e.question.text);
    const incorrectOpts = arr.map((e) => e.incorrectAnswers);
    const ans = arr.map((e) => e.correctAnswer);
    const options = shuffleArr(incorrectOpts, ans);

    question.innerHTML = ques[i];
    opts.innerHTML = options[i];
}

button.addEventListener("click", function(){
    i++;
    getData()
})


