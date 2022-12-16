import styled from "styled-components";
import { Stage, Layer } from "react-konva";
import React, { useEffect, useRef, useState } from "react";
import Holder from "./Holder";
import { FaUndo, FaRedo } from "react-icons/fa";
import { BsPencilFill, BsCircleFill, BsFillSquareFill,BsTriangleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { tool } from "../utils";

const DrawingPage = () => {
  const [elements, setElements] = useState([]);
  const [redo, setRedo] = useState([]);
  const [getlocalStorage, setGetLocalStorage] = useState(JSON.parse(localStorage.getItem("whiteboard")) || []);
  const [activeType, setActiveType] = useState(tool.circle);
  let isDraw = useRef(false);
  const onMouseDown = (e) => {
    isDraw.current = true;
    setElements((s) => [
      ...s,
      {
        id: activeType + "-" + Date.now(),
        type: activeType,
        points: [
          e.target?.getStage().getPointerPosition().x,
          e.target?.getStage().getPointerPosition().y,
        ],
        x: e.target?.getStage().getPointerPosition().x,
        y: e.target?.getStage().getPointerPosition().y,
        width: 0,
        height: 0,
        stroke: "#000",
        sides:3,
      },
    ]);
  };

  const onMouseMove = (e) => {
    if (!isDraw.current) return;
    const st = e.currentTarget;
    const pos = st.getPointerPosition();
    let lastId = [...elements].pop().id;
    const shapeAttrs = e.target.getStage().findOne("#" + lastId);
      if (activeType === tool.pen) {
         shapeAttrs.setAttrs({
          points: shapeAttrs.attrs.points.concat(pos.x, pos.y),
          x: 0,
          y: 0,
        });
      } else if (activeType === tool.circle) {
         shapeAttrs.setAttrs({
          radius: Math.abs(pos.x - shapeAttrs.attrs.x),
        });
      } else if (activeType === tool.rectangle) {
         shapeAttrs.setAttrs({
          width: pos.x - shapeAttrs.attrs.x,
          height: pos.y - shapeAttrs.attrs.y,
        });
      }
      else if(activeType===tool.triangle){
         shapeAttrs.setAttrs({
          radius: Math.abs(pos.x - shapeAttrs.attrs.x),
          points: shapeAttrs.attrs.points.concat(pos.x, pos.y),
        });
      }
  };
  const onMouseUp = (e) => {
    isDraw.current = false;
    let lastId = [...elements].pop().id;
    const shapeAttrs = e.target.getStage().findOne("#" + lastId);
    localStorage.setItem("whiteboard",  JSON.stringify([...elements.map((i) => { 
        if (i.id === lastId) {
          return {
            ...i,
            ...shapeAttrs.attrs,
          };
        } else {
          console.log(e.target.getStage().findOne("#" + i.id).attrs, "i")
          return  e.target.getStage().findOne("#" + i.id).attrs
          
        }
      }), ...getlocalStorage]));
      // setGetLocalStorage([...elements ,...getlocalStorage]);
  };
  const removeMe = () => {
    const rem = getlocalStorage.pop();
    setRedo((s) => [...s, rem]);
    setGetLocalStorage(
      getlocalStorage.filter((i, ind) => ind !== getlocalStorage.length - i)
      );
      console.log(getlocalStorage, "removeMe");
  };
  const handleRedo = () => {
    if (redo.length > 0) {
      setGetLocalStorage([...getlocalStorage, redo[redo.length - 1]]);
      setRedo(redo.filter((i, ind) => ind !== redo.length - 1));
      console.log(getlocalStorage, "addMe");
    }
  };
  const elementstore = [...elements, ...getlocalStorage];
  return (
    <>
      <Root>
        <DrawingBoard>
          <Stage
            className="canvas-size"
            width={1400}
            height={700}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            <Layer>
              {elementstore.map((i) => {
                return <Holder {...i}  />;
              })}
            </Layer>
          </Stage>
        </DrawingBoard>
        <Sidebar>
          <div className="flex justify-center items-center mx-auto mt-3">
            <div className=" bg-gray-300 rounded-full shadow-lg p-2 px-4 flex gap-4 justify-between">
              <div
                onClick={() => setActiveType(tool.circle)}
                className={
                  activeType === tool.circle
                    ? "bg-blue-600 p-3 rounded-full text-white"
                    : "p-3 "
                }
              >
                <BsCircleFill />
              </div>
              <div
                onClick={() => setActiveType(tool.pen)}
                className={
                  activeType === tool.pen
                    ? "bg-blue-600 p-3 rounded-full text-white"
                    : "p-3 "
                }
              >
                <BsPencilFill />
              </div>
              <div
                onClick={() => setActiveType(tool.rectangle)}
                className={
                  activeType === tool.rectangle
                    ? "bg-blue-600 p-3 rounded-full text-white"
                    : "p-3 "
                }
              >
                <BsFillSquareFill />
              </div>
              <div
               onClick={() => setActiveType(tool.triangle)}
                className={
                  activeType === tool.triangle
                    ? "bg-blue-600 p-3 rounded-full text-white"
                    : "p-3 "
                }>
                <BsTriangleFill/>
              </div>
              <div
                className={
                  getlocalStorage ? "flex gap-4 " : "hidden"
                }
              >
                <div
                  onClick={removeMe}
                  className={"bg-blue-400 p-3 rounded-full text-white"}
                >
                  <FaUndo />
                </div>
                <div
                  onClick={handleRedo}
                  className={
                    redo.length > 0
                      ? "bg-gray-500 p-3 rounded-full text-white"
                      : " hidden "
                  }
                >
                  <FaRedo />
                </div>
              </div>

              <div>
                <button
                  className="bg-red-500 p-3 rounded-full text-white"
                  onClick={() => { localStorage.removeItem("whiteboard"); }}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </div>
        </Sidebar>
      </Root>
    </>
  );
}
export default DrawingPage;
const Root = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 12px auto;
`;
const Sidebar = styled.div`
  padding: 1rem 0px;
`;
const DrawingBoard = styled.div`
  .canvas-size {
    width: 100%;
    height: 100%;
    background-color: #e5e7eb;
  }
`;