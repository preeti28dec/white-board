import React, { createContext, useRef, useState } from "react";
export const ContextData = createContext({});

function ContextProvider(props) {
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [circleSet, setcircleSet] = useState([]);
  const [redo, setRedo] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [tool, setTool] = useState( "pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [dataSetLocal, setDataSetLocal] = useState(
    JSON.parse(localStorage.getItem("whitebord")) || []
  );
  const handleMouseDown = (e) => {
    if (activeTab === 1) {
        const { x, y } = e.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: 0 }]);
    } else if (activeTab === 2) {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, {tool, points: [pos.x, pos.y] }]);
    }
  };
  const handleMouseUp = (e) => {
    if (activeTab === 1) {
      if (newAnnotation.length === 1) {
        const sx = parseInt(newAnnotation[0].x);
        const sy = parseInt(newAnnotation[0].y);
        const { x, y } = e.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: Math.abs(x - sx),
          height: Math.abs(y - sy),
          key: Date.now(),
        };
        circleSet.push(annotationToAdd);
        setNewAnnotation([]);
        setcircleSet(circleSet);
        localStorage.setItem("whitebord", JSON.stringify([...circleSet, ...newAnnotation, ...dataSetLocal]));
        setDataSetLocal([...circleSet, ...newAnnotation, ...dataSetLocal])
      }
    } else if (activeTab === 2) {
        isDrawing.current = false;
    }
  };
  const handleMouseMove = (e) => {
    if (activeTab === 1) {
      if (newAnnotation.length === 1) {
        const sx = parseInt(newAnnotation[0].x);
        const sy = parseInt(newAnnotation[0].y);
        const { x, y } = e.target.getStage().getPointerPosition();
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width: Math.abs(x - sx),
            height: Math.abs(y - sy),
            key: activeTab + "-" + Date.now()
          },
        ]);
      }
    } else if (activeTab === 2) {
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      localStorage.setItem("whitebord",JSON.stringify([...lines, ...dataSetLocal]));
      
    }
  };
  const removeMe = () => {
    const rem = dataSetLocal.pop();
    setRedo((s) => [...s, rem]);
    console.log(dataSetLocal,"removeMe");
    setDataSetLocal(dataSetLocal.filter((i, ind) => ind !== dataSetLocal.length - i));
  };
  const handleRedo = () => {
    if (redo.length > 0) {
        console.log(dataSetLocal,"addMe");
      setDataSetLocal([...dataSetLocal, redo[redo.length - 1]]);
      setRedo(redo.filter((i, ind) => ind !== redo.length - 1));
    }
  };

  return (
    <ContextData.Provider
      value={{
        redo,
        removeMe,
        handleRedo,
        dataSetLocal,
        setDataSetLocal,
        circleSet,
        setcircleSet,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        newAnnotation,
        setNewAnnotation,
        activeTab,
        setActiveTab,
        lines,
        setLines,
        tool,
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
}

export default ContextProvider;
