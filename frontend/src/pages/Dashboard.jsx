import React, { useRef, useState, useEffect, useContext } from "react";
import { Context } from "../context/ContextProvider";

const styles = {
  canvas: {
    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✍️</text></svg>") 5 25,auto`,
  },
};

const randomUserId = Math.floor(Math.random() * 1000);

const Dashboard = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [socket, setSocket] = useState(null);
  const [userId] = useState(randomUserId.toString());
  const { username, canvasId } = useContext(Context);

  const canvasRef = useRef();
  const prevXRef = useRef(null);
  const prevYRef = useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    const ws = new WebSocket("ws://localhost:8080", "echo-protocol");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to server");
      ws.send(
        JSON.stringify({
          type: "JOIN",
          payload: {
            name: username,
            canvasId,
            userId,
          },
        })
      );
    };

    ws.onmessage = (message) => {
      try {
        const { payload, type } = JSON.parse(message.data);
        if (type === "DRAW") {
          if (context) {
            context.beginPath();
            context.lineWidth = 5;
            context.lineCap = "round";
            context.strokeStyle = "#ACD3ED";
            context.moveTo(payload.prevX, payload.prevY);
            context.lineTo(payload.x, payload.y);
            context.stroke();
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
    };

    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);

  const sendDrawMessage = (prevX, prevY, x, y) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(
      JSON.stringify({
        type: "DRAW",
        payload: {
          canvasId,
          userId,
          prevX,
          prevY,
          x,
          y,
        },
      })
    );
  };

  return (
    <canvas
      style={styles.canvas}
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth}
      className="bg-red-300"
      onMouseDown={(e) => {
        setIsDrawing(true);
        prevXRef.current = e.nativeEvent.offsetX;
        prevYRef.current = e.nativeEvent.offsetY;
      }}
      onMouseMove={(e) => {
        if (isDrawing) {
          const context = canvasRef.current.getContext("2d");
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;

          if (
            context &&
            prevXRef.current !== null &&
            prevYRef.current !== null
          ) {
            context.beginPath();
            context.lineWidth = 5;
            context.lineCap = "round";
            context.strokeStyle = "#ACD3ED";
            context.moveTo(prevXRef.current, prevYRef.current);
            context.lineTo(x, y);
            context.stroke();

            sendDrawMessage(prevXRef.current, prevYRef.current, x, y);

            prevXRef.current = x;
            prevYRef.current = y;
          }
        }
      }}
      onMouseUp={() => {
        setIsDrawing(false);
        prevXRef.current = null;
        prevYRef.current = null;
      }}
    />
  );
};

export default Dashboard;
