import React, { useRef, useState } from "react";
import { useEffect } from "react";

const styles = {
  canvas: {
    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✍️</text></svg>") 5 25,auto`,
  },
};

const randomUserId = Math.floor(Math.random() * 1000);

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [socket, setSocket] = useState(null);
  // const [context, setContext] = useState();
  const [userId, setUserId] = useState(randomUserId.toString());

  const canvasRef = useRef();

  const sendDrawMessage = () => {
    if (!socket) {
      return;
    }

    socket.send(
      JSON.stringify({
        type: "DRAW",
        payload: {
          canvasId: "1",
          userId,
          x,
          y,
          name: "Prathamesh",
        },
      })
    );
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    const ws = new WebSocket("ws://localhost:8080", "echo-protocol");
    setSocket(ws);
    ws.onopen = () => {
      console.log("Connected to server");
      // const userId = randomUserId.toString();
      setUserId(randomUserId.toString());
      ws.send(
        JSON.stringify({
          type: "JOIN",
          payload: {
            name: "Prathamesh",
            canvasId: "1",
            userId,
          },
        })
      );
    };

    ws.onmessage = (message) => {
      const { payload, type } = JSON.parse(message.data);
      // console.log("Payload: ", payload);
      // console.log("Type: ", type);

      if (type == "DRAW") {
        console.log("context", context);
        if (context) {
          context.beginPath();
          context.lineWidth = 5;
          context.lineCap = "round";
          context.strokeStyle = "#ACD3ED";
          context.moveTo(payload.x, payload.y);
          context.lineTo(payload.x, payload.y);
          context.stroke();
        }
      }
    };

    ws.onerror = (error) => {
      alert("Error");
      console.log("Error: ", error);
    };

    ws.onclose = () => {
      alert("Disconnected");
    };

    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const context = canvasRef.current.getContext("2d");
  //     console.log("context useEffect: ", context);
  //     setContext(context);
  //   }
  // }, []);

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
          setX(e.nativeEvent.offsetX);
          setY(e.nativeEvent.offsetY);
          sendDrawMessage();
        }
      }}
      onMouseMove={(e) => {
        if (isDrawing) {
          const context = e.currentTarget.getContext("2d");
          // setContext(e.currentTarget.getContext("2d"));
          if (context) {
            context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            context.stroke();
            setX(e.nativeEvent.offsetX);
            setY(e.nativeEvent.offsetY);
            sendDrawMessage();
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
