// import Canvas from "../WebGL/Game/Canvas.jsx";
import questionsAnswer from "../../data/questions.json";
// Import statements...
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Island } from "@/components/Island/Island";

const GameView = () => {
    const { user, loggedIn, isLoading } = useContext(AuthContext);
    const [questions, setQuestions] = useState(questionsAnswer.questions);
    const [question, setQuestion] = useState({});
    const [level, setLevel] = useState(1);
    const [progress, setProgress] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null);
    const LastLevel = 9;



    useEffect(() => {
        const currentQuestion = questions.find((q) => q.level === level);
        setQuestion(currentQuestion);
    }, [questions, level]);

    const shuffleAnswers = (answers) => {
        // Shuffle answers randomly
        const shuffledAnswers = answers.slice().sort(() => Math.random() - 0.5);
        return shuffledAnswers;
    };


    const handleAnswer = (answer) => {
        if (!showExplanation) {
            var event = new KeyboardEvent('keydown', {
                key: 'p',
                ctrlKey: true
            });
            document.dispatchEvent(event);
            event.preventDefault();

            setAnswerStatus(answer.status);
            setProgress([...progress, { level: level, reponse: answer.status }]);
            setShowExplanation(true);
        }
    };

    const handleNextQuestion = () => {
        setShowExplanation(false);
        setQuestion({});
        setAnswerStatus(null);
        setLevel(level + 1);
    };

    useEffect(() => {
        if (user && loggedIn && !isLoading) {
            fetch("https://danettenuitinfo.alwaysdata.net/v1/game/getprogression", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.progression) {
                        setProgress(JSON.parse(data.progression));
                        setLevel(JSON.parse(data.progression).length + 1);
                        if (JSON.parse(data.progression).length > 0) {
                            const lastLevel = JSON.parse(data.progression).pop().level;
                            setLevel(lastLevel + 1);
                        }
                    } else {
                        setProgress([]);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        if (!user && !loggedIn && !isLoading) {
            const savedProgress = localStorage.getItem("progress");
            if (savedProgress) {
                if (JSON.parse(savedProgress).length > 0) {
                    const lastLevel = JSON.parse(savedProgress).pop().level;
                    setLevel(lastLevel + 1);
                } else {
                    setProgress(JSON.parse(savedProgress));
                }
            } else {
                setProgress([]);
            }
        }
    }, [user, loggedIn, isLoading]);

    useEffect(() => {
        if (user && loggedIn && !isLoading) {
            if (progress.length > 0) {
                fetch("https://danettenuitinfo.alwaysdata.net/v1/game/updateprogression", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: new URLSearchParams({
                        progression: JSON.stringify(progress),
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
        if (!user && !loggedIn && !isLoading) {
            localStorage.setItem("progress", JSON.stringify(progress));
        }
    }, [progress, user, loggedIn, isLoading]);

    return (
        <div className="game">
           
            
            {LastLevel === level ? (
                <div className="end">
                    <h1>Fin du jeu</h1>
                    <p>
                        Vous avez répondu correctement à{" "}
                        {progress.filter((item) => item.reponse === true).length} questions
                        sur {LastLevel - 1}
                    </p>
                </div>
            ) : (
                <>
                    <Island level={level} />
                    {showExplanation ? (
                        <div className="game_popup explanation">
                            <h3 className={answerStatus ? "correct" : "incorrect"}>
                                {answerStatus ? "Correct" : "Incorrect"}
                            </h3>
                            <h5>{question.explications}</h5>
                            <button className="primary" onClick={handleNextQuestion}>
                                Next
                            </button>
                        </div>
                    ) : (
                        <div className="game_popup">
                            <h3>{question.question}</h3>
                            <div className="answers">
                                {question.reponses &&
                                    (() => {
                                        const falseAnswers = {
                                            answer: question.reponses.incorrecte,
                                            status: false,
                                        };
                                        const correctAnswer = {
                                            answer: question.reponses.correcte,
                                            status: true,
                                        };
                                        const answers = shuffleAnswers([falseAnswers, correctAnswer]);
                                        return answers.map((answer, index) => (
                                            <button
                                                className="primary"
                                                key={index}
                                                onClick={() => handleAnswer(answer)}
                                            >
                                                {answer.answer}
                                            </button>
                                        ));
                                    })()}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GameView;