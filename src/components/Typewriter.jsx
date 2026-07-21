import { useState, useEffect, useRef } from 'react';

export default function Typewriter({ words, typingSpeed = 100, deletingSpeed = 50, delay = 2000 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    clearTimer();

    if (isDeleting) {
      timerRef.current = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 1) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }, deletingSpeed);
    } else {
      timerRef.current = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          timerRef.current = setTimeout(() => setIsDeleting(true), delay);
        }
      }, typingSpeed);
    }

    return clearTimer;
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span className="knowledge typewriter-container">
      {text}
      <span className="cursor">|</span>
    </span>
  );
}
