import React from "react";
import { Circle, Line, Rect, RegularPolygon } from "react-konva";
import { tool } from '../utils';

export default function Holder(props) {
  switch (props.type) {
    case tool.pen:
      return <Line {...props} />;
    case tool.rectangle:
      return <Rect {...props} />;
    case tool.circle:
      return <Circle {...props} />;
      case tool.triangle:
        return <RegularPolygon {...props} />;
    default:
      return <></>;
  }
}
