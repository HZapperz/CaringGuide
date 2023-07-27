import { useState, useEffect } from "react";
import { Text } from "@nextui-org/react";

type TypingProps = {
  texts: string[];
  delay?: number;
};

const Typing: React.FC<TypingProps> = ({ texts, delay = 1000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping) {
      // typing
      if (currentText.length < texts[currentTextIndex].length) {
        timer = setTimeout(() => {
          setCurrentText((prevText) => {
            return prevText + texts[currentTextIndex][prevText.length];
          });
        }, 50);
      }
      // delay before backspacing
      else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, delay);
      }
    } else {
      // backspacing
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText((prevText) => {
            return prevText.slice(0, -1);
          });
        }, 50);
      }
      // switch to next text
      else {
        setIsTyping(true);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, delay, isTyping, texts]);

  return (
    <Text
      h1
      weight="bold"
      css={{ textAlign: "center" }}
      color="primary"
      size={60}
    >
      {currentText}
    </Text>
  );
};

export default Typing;
