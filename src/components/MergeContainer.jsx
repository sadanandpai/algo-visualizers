import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { swapTime, compareTime } from "./config";

const Container = styled.div`
  display: flex;
  height: 150px;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
`;

const comparisionColor = "pink";
const swapColor = "yellow";
const sortedColor = "springgreen";

const swapAnimation = (distance, finalMerge) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  10%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  30% {
    transform: translate(0px, -50px);
    background-color: ${swapColor};
  }
  70% {
    transform: translate(-${distance * 50}px, -50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(-${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(-${distance * 50}px, 0px);
    background-color: ${finalMerge ? sortedColor : ""};
  }
`;

const moveAnimation = () => keyframes`
  0%{
    transform: translate(0px, 0px);
  }
  100%{
    transform: translate(50px, 0px);
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

const AnimatedItem = styled(Item)`
  animation: ${(props) => swapAnimation(props.distance, props.finalMerge)}
    ${swapTime / 1000}s forwards;
`;

const MoveItem = styled(Item)`
  animation: ${moveAnimation()} ${swapTime / 1000}s forwards;
`;

const generateItems = (setItems, source, destination) => {
  setItems((items) => {
    const newItems = [...items];

    const temp = newItems[source];
    for (let i = source; i > destination; i--) {
      newItems[i] = newItems[i - 1];
    }

    newItems[destination] = temp;
    return newItems;
  });
};

export function MergeContainer({
  array,
  source,
  destination,
  hightlightedIndices,
  finalMerge,
}) {
  const [items, setItems] = useState([...array]);

  useEffect(() => {
    if (source !== -1 && destination !== -1) {
      generateItems(setItems, source, destination);
    }
  }, [source, destination]);

  return (
    <>
      <Container>
        {items.map((value, i) => {
          if (i === destination) {
            return (
              <AnimatedItem
                key={i + ":" + value}
                style={{
                  order: source + 1,
                  backgroundColor: hightlightedIndices?.includes(i)
                    ? comparisionColor
                    : "",
                }}
                distance={source - destination}
                finalMerge={finalMerge}
              >
                {value}
              </AnimatedItem>
            );
          } else if (i > destination && i <= source) {
            return (
              <MoveItem
                key={i + ":" + value}
                style={{
                  order: i,
                  backgroundColor: hightlightedIndices?.includes(i)
                    ? comparisionColor
                    : "",
                  transform: "translate(50px)",
                }}
              >
                {value}
              </MoveItem>
            );
          } else {
            return (
              <Item
                key={i + ":" + value}
                style={{
                  order: i,
                  backgroundColor:
                    i < destination && finalMerge
                      ? sortedColor
                      : hightlightedIndices?.includes(i)
                      ? comparisionColor
                      : "",
                }}
              >
                {value}
              </Item>
            );
          }
        })}
      </Container>
    </>
  );
}
