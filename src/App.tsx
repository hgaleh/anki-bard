import { useState, useEffect, useMemo } from 'react';
import { Result } from './Result';

interface Props {
  answer: string
  state: 'front' | 'back'
}

interface Pair {
  id: number;
  word: string;
}

const ScrambledChips = ({ answer, state }: Props) => {
  const [availableWords, setAvailableWords] = useState<Pair[]>(state === 'back' ? JSON.parse(sessionStorage.getItem('availableWords') || '[]') : []);
  const [selectedWords, setSelectedWords] = useState<Pair[]>(state === 'back' ? JSON.parse(sessionStorage.getItem('selectedWords') || '[]') : []);
  const userAnswer = useMemo<string>(() => {
    return selectedWords.map(parts => parts.word).join(' ');
  }, [selectedWords]);

  const shuffleArray = (array: Pair[]) => {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    sessionStorage.setItem('availableWords', JSON.stringify(availableWords));
    sessionStorage.setItem('selectedWords', JSON.stringify(selectedWords));
  }, [availableWords, selectedWords]);

  useEffect(() => {
    if (answer && state === 'front') {
      const words = answer
        .split(' ')
        .filter(Boolean)
        .map((word: string, index: number) => ({ id: index, word }));
      const scrambled = shuffleArray(words);
      setAvailableWords(scrambled);
      setSelectedWords([]);
    }
  }, [answer]);

  const handleAvailableClick = (chip: Pair) => {
    setAvailableWords((prev) => prev.filter((item) => item.id !== chip.id));
    setSelectedWords((prev) => [...prev, chip]);
  };

  const handleSelectedClick = (chip: Pair) => {
    setSelectedWords((prev) => prev.filter((item) => item.id !== chip.id));
    setAvailableWords((prev) => {
      const newAvailable = [...prev, chip];
      return newAvailable.sort((a, b) => a.id - b.id);
    });
  };

  return (
    <div>
      {state === 'front' ? <>
        <h3>Your Selected Order</h3>
        <div style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', display: 'flex', flexWrap: 'wrap', height: '7rem', overflowY: 'auto'}}>
          {selectedWords.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleSelectedClick(chip)}
              style={{
                margin: '5px',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '16px',
                cursor: 'pointer',
                height: '2rem'
              }}
            >
              {chip.word}
            </button>
          ))}
        </div>

        <h3>Available Words</h3>
        <div style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', display: 'flex', flexWrap: 'wrap', height: '7rem', overflowY: 'auto'}}>
          {availableWords.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleAvailableClick(chip)}
              style={{
                margin: '5px',
                height: '2rem',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '16px',
                cursor: 'pointer'
              }}
            >
              {chip.word}
            </button>
          ))}
        </div>
      </> : <>
        <Result correct={answer} answer={selectedWords.map(s => s.word).join(' ')} />
      </>}
    </div>
  );
};

export default ScrambledChips;

