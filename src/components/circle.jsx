import React, { useRef } from "react";
import { Stage, Layer, Circle, Line, Text } from "react-konva";



export default function Circledrow() {
  const circ = useRef();
  const changeSize = () => {
    circ.current.to({
      scaleX: Math.random() + 0.9,
      scaleY: Math.random() + 0.8,
      duration: 0.2,
    });
  };
  
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle
            x={100}
            y={100}
            width={100}
            height={100}
            fill="red"
            shadowBlur={5}
            draggable
            ref={circ}
            onDragStart={changeSize}
            onDragEnd={changeSize}
          />
        </Layer>
      </Stage>
    </div>
  );
}
