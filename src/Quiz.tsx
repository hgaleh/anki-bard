import { useCallback, useState } from 'react';

interface Props {
    words: string; // comma separated words
    sentence: string;
}

export function Quiz({ words, sentence }: Props) {
    const [isShow, setShow] = useState<boolean>(false);

    const onClick = useCallback(() => {
        setShow(true);
    }, [setShow]);

    return (
        isShow ? <div>{sentence}</div> : <button onClick={onClick}>{words}</button>
    );
}