import ReactDOM from "react-dom";
import Options from "../components/Options";
const QuizPage = () => {
  const question = {
    question: "What is the capital of France?",
    answers: [
      {
        text: "Berlin",
        isCorrect: false,
      },
      {
        text: "Madrid",
        isCorrect: false,
      },
      {
        text: "Paris",
        isCorrect: true,
      },
      {
        text: "Rome",
        isCorrect: false,
      },
    ],
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-md">
      <div className="bg-white  min-w-[70%] min-h-[80%] rounded-lg">
        <div className="mx-16 bg-gray-300 min-h-[2vh] mt-6 rounded-lg">
          <div className="rounded-lg bg-primary max-w-[100%] min-h-[2vh]"></div>
        </div>
        <div className="min-w-full flex flex-col h-full">
          <h1 className="text-2xl font-bold text-center">
            {question.question}
          </h1>
          <div id="ans-container flex">
            {question.answers.map((ans) => {
              return <Options key={ans.text} ans={ans} />;
            })}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default QuizPage;
