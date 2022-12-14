import { useEffect, useState } from "react";
import React from "react";
import { FaUndo, FaRedo } from "react-icons/fa";
import { BsPencilFill, BsCircleFill } from "react-icons/bs";
import { Stage, Layer, Circle, Line, Text } from "react-konva";

const DrawingPage = () => {
  const [circleSet, setcircleSet] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [redo, setRedo] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [dataSetLocal, setDataSetLocal] = useState(JSON.parse(localStorage.getItem("whitebord")) || []);
  const isDrawing = React.useRef(false);
  const handleMouseDownPen = (e) => {
    if (activeTab === 1) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    } else {
      if (newAnnotation.length === 0) {
        const { x, y } = e.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    }
  };

  const handleMouseMovePen = (e) => {
    if (activeTab === 1) {
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...lines, ...dataSetLocal])
      );
    } else {
      handleMouseMove(e);
    }
  };

  const handleMouseUpPen = (e) => {
    if (activeTab === 1) {
      isDrawing.current = false;
    } else {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = e.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: Math.abs(x - sx),
          height: Math.abs(y - sy),
          key: circleSet.length + 1,
        };
        circleSet.push(annotationToAdd);
        setNewAnnotation([]);
        setcircleSet(circleSet);
        localStorage.setItem(
          "whitebord",
          JSON.stringify([...circleSet, ...newAnnotation, ...dataSetLocal])
        );
        console.log(circleSet, "llll");
      }
    }
  };

  const handleMouseDown = (e) => {
    if (newAnnotation.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (e) => {
    if (newAnnotation.length === 1) {
      const sx = parseInt(newAnnotation[0].x);
      const sy = parseInt(newAnnotation[0].y);
      const { x, y } = e.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: Math.abs(x - sx),
        height: Math.abs(y - sy),
        key: circleSet.length + 1,
      };
      circleSet.push(annotationToAdd);
      setNewAnnotation([]);
      setcircleSet(circleSet);
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...circleSet, ...newAnnotation, ...dataSetLocal])
      );
    }
  };

  const handleMouseMove = (e) => {
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
          key: "0",
        },
      ]);
    }
  };
  const circleSetToDraw = [...circleSet, ...newAnnotation, ...dataSetLocal];
  const penSetToDraw = [...lines, ...dataSetLocal];

  const removeMe = () => {
    const rem = dataSetLocal.pop();
    setRedo((s) => [...s, rem]);
    setDataSetLocal(
      dataSetLocal.filter((i, ind) => ind !== dataSetLocal.length - i)
    );
  };
  const handleRedo = () => {
    if (redo.length > 0) {
      setDataSetLocal([...dataSetLocal, redo[redo.length - 1]]);
      setRedo(redo.filter((i, ind) => ind !== redo.length - 1));
    }
  };

  useEffect(()=>{
    console.log(dataSetLocal);
  },[dataSetLocal])
  return (
    <>
      <div className=" border w-full h-full">
        <Stage
          width={1400}
          height={750}
          onMouseDown={(e) => {
            if (activeTab === 0) {
              handleMouseDown(e);
            } else {
              handleMouseDownPen(e);
            }
          }}
          onMouseUp={(e) => {
            if (activeTab === 0) {
              handleMouseUp(e);
            } else {
              handleMouseUpPen(e);
            }
          }}
          onMouseMove={(e) => {
            if (activeTab === 0) {
              handleMouseMove(e);
            } else {
              handleMouseMovePen(e);
            }
          }}
        >
          <Layer>
            {circleSetToDraw.map((value, i) => {
              return (
                <Circle
                  key={i}
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.height}
                  fill="transparent"
                  stroke="black"
                />
              );
            })}

            {penSetToDraw.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#000"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className="flex justify-center items-center mx-auto mt-3">
        <div className=" bg-gray-300 rounded-full shadow-lg p-2 px-4 flex gap-4 justify-between">
          <div
            onClick={() => setActiveTab(0)}
            className={
              activeTab === 0
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsCircleFill />
          </div>
          <div
            onClick={() => setActiveTab(1)}
            className={
              activeTab === 1
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsPencilFill />
          </div>
          <div className={dataSetLocal.length > 0 ? "flex gap-4 " : "hidden"}>
            <div
              onClick={removeMe}
              className={"bg-blue-400 p-3 rounded-full text-white"}
            >
              <FaUndo />
            </div>
            <div onClick={handleRedo} className={redo.length > 0? "bg-gray-500 p-3 rounded-full text-white": " hidden "}>
              <FaRedo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawingPage;
