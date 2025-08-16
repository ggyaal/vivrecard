import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ $isVisible: boolean }>`
  display: flex;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const FadeInImageCard = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const imgTags = containerRef.current.querySelectorAll("img");

    let loadedCount = 0;

    imgTags.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === imgTags.length) {
          setIsVisible(true);
        }
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === imgTags.length) {
            setIsVisible(true);
          }
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === imgTags.length) {
            setIsVisible(true);
          }
        });
      }
    });

    if (loadedCount === imgTags.length) {
      setIsVisible(true);
    }
  }, []);

  return (
    <Container ref={containerRef} $isVisible={isVisible}>
      {children}
    </Container>
  );
};

export default FadeInImageCard;
