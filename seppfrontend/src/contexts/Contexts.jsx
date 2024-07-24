import React, { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const ContextProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(20);

    return (
        <QuizContext.Provider value={{ score, setScore, timer, setTimer }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => useContext(QuizContext);

export default QuizContext;

// Exporting the context itself
