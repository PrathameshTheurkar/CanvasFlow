import React, { useRef, useState, useEffect, useContext } from "react";
import { Context } from "../context/ContextProvider";
import {
  BsCursor,
  BsHandIndex,
  BsSquare,
  BsDiamond,
  BsCircle,
  BsArrowRight,
  BsSlash,
  BsPencil,
  BsTypeH1,
  BsImage,
  BsEraser,
  BsArrowCounterclockwise,
  BsList,
  BsPerson,
  BsShare,
} from "react-icons/bs";

const Dashboard = () => {
  const [currentTool, setCurrentTool] = useState("pencil");
  const [socket, setSocket] = useState(null);
  const [userId] = useState(Math.floor(Math.random() * 1000).toString());
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { username, canvasId } = useContext(Context);
  const [startPoint, setStartPoint] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastCanvas, setLastCanvas] = useState(null);

  const canvasRef = useRef();
  const prevXRef = useRef(null);
  const prevYRef = useRef(null);

  const tools = [
    { id: "select", icon: BsCursor, tooltip: "Select" },
    { id: "hand", icon: BsHandIndex, tooltip: "Hand" },
    { id: "rectangle", icon: BsSquare, tooltip: "Rectangle" },
    { id: "diamond", icon: BsDiamond, tooltip: "Diamond" },
    { id: "circle", icon: BsCircle, tooltip: "Circle" },
    { id: "arrow", icon: BsArrowRight, tooltip: "Arrow" },
    { id: "line", icon: BsSlash, tooltip: "Line" },
    { id: "pencil", icon: BsPencil, tooltip: "Pencil" },
    { id: "text", icon: BsTypeH1, tooltip: "Text" },
    { id: "image", icon: BsImage, tooltip: "Image" },
    { id: "eraser", icon: BsEraser, tooltip: "Eraser" },
  ];

  const getCursorCSS = (tool) => {
    switch (tool) {
      case "pencil":
        return "cursor-crosshair";
      case "eraser":
        return "cursor-crosshair";
      case "select":
        return "cursor-default";
      case "hand":
        return "cursor-grab";
      case "rectangle":
      case "diamond":
      case "circle":
        return "cursor-crosshair";
      case "arrow":
      case "line":
        return "cursor-crosshair";
      case "text":
        return "cursor-text";
      case "image":
        return "cursor-pointer";
      default:
        return "cursor-default";
    }
  };

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
            context.lineWidth = 2;
            context.lineCap = "round";
            context.strokeStyle = "white";
            context.moveTo(payload.prevX, payload.prevY);
            context.lineTo(payload.x, payload.y);
            context.stroke();
          }
        } else if (type === "ERASE") {
          if (context) {
            context.clearRect(payload.x - 5, payload.y - 5, 10, 10);
          }
        } else if (type === "LINE") {
          if (context) {
            context.beginPath();
            context.lineWidth = 2;
            context.lineCap = "round";
            context.strokeStyle = "white";
            context.moveTo(payload.startX, payload.startY);
            context.lineTo(payload.endX, payload.endY);
            context.stroke();
          }
        } else if (type === "RECTANGLE") {
          if (context) {
            context.beginPath();
            context.lineWidth = 2;
            context.lineCap = "round";
            context.strokeStyle = "white";
            // context.moveTo(payload.startX, payload.startY);
            // context.lineTo(payload.endX, payload.endY);
            // context.stroke();
            context.strokeRect(
              payload.x,
              payload.y,
              payload.width,
              payload.height
            );
          }
        } else if (type === "CIRCLE") {
          if (context) {
            context.beginPath();
            context.lineWidth = 2;
            context.lineCap = "round";
            context.strokeStyle = "white";
            context.arc(payload.x, payload.y, payload.radius, 0, 2 * Math.PI);
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
  }, [username, canvasId, userId]);

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

  const sendEraseMessage = (x, y) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "ERASE",
        payload: {
          canvasId,
          userId,
          x,
          y,
        },
      })
    );
  };

  const sendLineMessage = (startX, startY, endX, endY) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "LINE",
        payload: {
          canvasId,
          userId,
          startX,
          startY,
          endX,
          endY,
          name: username,
        },
      })
    );
  };

  const sendRectangleMessage = (x, y, width, height) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "RECTANGLE",
        payload: {
          canvasId,
          userId,
          x,
          y,
          width,
          height,
          name: username,
        },
      })
    );
  };

  const sendCircleMessage = (x, y, radius) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "CIRCLE",
        payload: {
          canvasId,
          userId,
          x,
          y,
          radius,
          name: username,
        },
      })
    );
  };

  const handleToolChange = (toolId) => {
    setCurrentTool(toolId);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const saveCanvasState = () => {
    if (canvasRef.current) {
      setLastCanvas(
        canvasRef.current
          .getContext("2d")
          .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      );
    }
  };

  const restoreCanvasState = () => {
    if (lastCanvas && canvasRef.current) {
      canvasRef.current.getContext("2d").putImageData(lastCanvas, 0, 0);
    }
  };

  const handleCanvasAction = (e) => {
    const context = canvasRef.current.getContext("2d");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (context && prevXRef.current !== null && prevYRef.current !== null) {
      if (currentTool === "pencil") {
        context.beginPath();
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "#ACD3ED";
        context.moveTo(prevXRef.current, prevYRef.current);
        context.lineTo(x, y);
        context.stroke();

        sendDrawMessage(prevXRef.current, prevYRef.current, x, y);
      } else if (currentTool === "eraser") {
        context.clearRect(x - 5, y - 5, 10, 10);
        sendEraseMessage(x, y);
      } else if (currentTool === "line" && isDrawing && startPoint) {
        restoreCanvasState();

        context.beginPath();
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "#ACD3ED";
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(x, y);
        context.stroke();
      } else if (currentTool === "rectangle" && isDrawing && startPoint) {
        restoreCanvasState();

        context.beginPath();
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "#ACD3ED";
        // context.moveTo(startPoint.x, startPoint.y);
        // context.lineTo(x, y);
        context.strokeRect(
          startPoint.x,
          startPoint.y,
          x - startPoint.x,
          y - startPoint.y
        );
        // context.stroke();
      } else if (currentTool === "circle" && isDrawing && startPoint) {
        restoreCanvasState();

        context.beginPath();
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "#ACD3ED";
        context.arc(
          startPoint.x,
          startPoint.y,
          Math.sqrt((startPoint.x - x) ** 2 + (startPoint.y - y) ** 2),
          0,
          2 * Math.PI
        );
        context.stroke();
      }

      prevXRef.current = x;
      prevYRef.current = y;
    }
  };

  const handleMouseDown = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    prevXRef.current = x;
    prevYRef.current = y;

    if (
      currentTool === "line" ||
      currentTool == "rectangle" ||
      currentTool == "circle"
    ) {
      setIsDrawing(true);
      setStartPoint({ x, y });
      saveCanvasState();
    }
  };

  const handleMouseUp = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (currentTool === "line" && isDrawing && startPoint) {
      const context = canvasRef.current.getContext("2d");

      context.beginPath();
      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = "#ACD3ED";
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(x, y);
      context.stroke();

      sendLineMessage(startPoint.x, startPoint.y, x, y);

      setIsDrawing(false);
      setStartPoint(null);
    } else if (currentTool === "rectangle" && isDrawing && startPoint) {
      const context = canvasRef.current.getContext("2d");

      context.beginPath();
      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = "#ACD3ED";
      // context.moveTo(startPoint.x, startPoint.y);
      // context.lineTo(x, y);
      // context.stroke();
      context.strokeRect(
        startPoint.x,
        startPoint.y,
        x - startPoint.x,
        y - startPoint.y
      );

      sendRectangleMessage(
        startPoint.x,
        startPoint.y,
        x - startPoint.x,
        y - startPoint.y
      );

      setIsDrawing(false);
      setStartPoint(null);
    } else if (currentTool === "circle" && isDrawing && startPoint) {
      const context = canvasRef.current.getContext("2d");

      context.beginPath();
      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = "#ACD3ED";
      // context.moveTo(startPoint.x, startPoint.y);
      // context.lineTo(x, y);
      // context.stroke();
      // context.strokeRect(
      //   startPoint.x,
      //   startPoint.y,
      //   x - startPoint.x,
      //   y - startPoint.y
      // );
      context.arc(
        startPoint.x,
        startPoint.y,
        Math.sqrt((startPoint.x - x) ** 2 + (startPoint.y - y) ** 2),
        0,
        2 * Math.PI
      );
      context.stroke();

      sendCircleMessage(
        startPoint.x,
        startPoint.y,
        Math.sqrt((startPoint.x - x) ** 2 + (startPoint.y - y) ** 2)
      );

      setIsDrawing(false);
      setStartPoint(null);
    }

    prevXRef.current = null;
    prevYRef.current = null;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#121212] text-gray-300">
      <div className="fixed left-3 top-3 z-10">
        <button className="p-1.5 rounded-md bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors text-gray-300">
          <BsList size={18} />
        </button>
      </div>

      <div className="fixed top-3 left-1/2 transform -translate-x-1/2 bg-[#1e1e1e] rounded-lg shadow-lg z-10">
        <div className="flex items-center h-10 px-1">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <button
                key={tool.id}
                className={`p-1.5 m-0.5 rounded-md transition-colors relative group ${
                  currentTool === tool.id
                    ? "bg-[#2a2a2a] text-white"
                    : "hover:bg-[#2a2a2a] text-gray-400 hover:text-white"
                }`}
                onClick={() => handleToolChange(tool.id)}
                aria-label={tool.tooltip}
              >
                <IconComponent size={16} />
                <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-[#2a2a2a] text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {tool.tooltip}
                </span>
              </button>
            );
          })}
          <div className="h-5 mx-1 w-px bg-[#2a2a2a]"></div>
          <button
            className="p-1.5 m-0.5 rounded-md hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors relative group"
            aria-label="Undo"
          >
            <BsArrowCounterclockwise size={16} />
            <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-[#2a2a2a] text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Undo
            </span>
          </button>
        </div>
      </div>

      <div className="fixed right-3 top-3 flex items-center space-x-2 z-10">
        <button className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors flex items-center">
          <BsShare className="mr-1" size={14} />
          <span className="text-xs">Share</span>
        </button>

        <div className="relative">
          <button
            className="flex items-center p-1.5 rounded-md bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors"
            onClick={toggleProfileMenu}
          >
            <BsPerson size={16} />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1e1e1e] rounded-md shadow-lg py-1 z-20">
              <div className="px-3 py-2 text-xs border-b border-[#2a2a2a]">
                Signed in as{" "}
                <span className="font-medium">{username || "User"}</span>
              </div>
              <div className="px-3 py-2 text-xs">
                Canvas ID:{" "}
                <span className="font-medium">{canvasId || "Default"}</span>
              </div>
              <button className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-[#2a2a2a]">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      <canvas
        className={`bg-[#121212] ${getCursorCSS(currentTool)}`}
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
        onMouseDown={handleMouseDown}
        onMouseMove={handleCanvasAction}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          if (currentTool === "line" && isDrawing) {
            restoreCanvasState();
            setIsDrawing(false);
          } else if (currentTool === "rectangle" && isDrawing) {
            restoreCanvasState();
            setIsDrawing(false);
          } else if (currentTool === "circle" && isDrawing) {
            restoreCanvasState();
            setIsDrawing(false);
          }
          prevXRef.current = null;
          prevYRef.current = null;
        }}
      />
    </div>
  );
};

export default Dashboard;
