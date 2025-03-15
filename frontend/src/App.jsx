import React, { useRef, useState } from "react";
import { useEffect } from "react";

const styles = {
  canvas: {
    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✍️</text></svg>") 5 25,auto`,
  },
};

function App() {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080", "echo-protocol");
    ws.onopen = () => {
      console.log("Connected to server");
    };
  }, []);

  return (
    <canvas
      style={styles.canvas}
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth}
      className="bg-red-300"
      onMouseDown={(e) => {
        setIsDrawing(true);
        const context = e.currentTarget.getContext("2d");
        if (context) {
          context.beginPath();
          context.lineWidth = 5;
          context.lineCap = "round";
          context.strokeStyle = "#ACD3ED";
          context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
      }}
      onMouseMove={(e) => {
        if (isDrawing) {
          const context = e.currentTarget.getContext("2d");
          if (context) {
            context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            context.stroke();
          }
        }
      }}
      onMouseUp={() => {
        setIsDrawing(false);
      }}
    />
  );
}

export default App;
