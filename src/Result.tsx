interface PropType {
    isCorrect: boolean;
}

export function Result({ isCorrect }: PropType) {
    return (
        isCorrect ? <h3 style={{ color: 'green' }}>Correct!</h3> : <h3 style={{ color: 'red' }}>Incorrect!</h3>
    );
}