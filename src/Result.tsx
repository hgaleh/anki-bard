import { CSSProperties, useMemo } from "react";

interface PropType {
    correct: string;
    answer: string;
}

interface Answer {
    word: string;
    style: CSSProperties
}

const correctStyle: CSSProperties = {
    backgroundColor: 'green'
}

const incorrectStyle: CSSProperties = {
    backgroundColor: 'red'
}

export function Result({ correct, answer }: PropType) {
    const splittedCorrect = useMemo<string[]>(() => correct.split(' '), [correct]);
    const splittedAnswer = useMemo<Answer[]>(() => answer.split(' ')
        .map((answerWord, i) => ({ word: answerWord, style: answerWord === splittedCorrect[i] ? correctStyle : incorrectStyle })), [correct, splittedCorrect]);

    return (
        <>
            { splittedAnswer.map(word => <span style={word.style}>{word.word}&nbsp;</span>) }
        </>
    );
}