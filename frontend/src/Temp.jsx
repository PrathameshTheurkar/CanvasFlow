"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Drag() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //   useEffect(() => {
  //     //     console.log(cursorRef.current.getBoundingClientRect());
  //     //     const cursor = cursorRef.current.getBoundingClientRect();
  //     // cursor.left = 100;
  //     // cursorRef.current.style.position = "absolute";
  //     // cursorRef.current.style.left = "100px";
  //     setPosition({ x: 200, y: 100 });
  //   }, []);

  const handleCursorMove = () => {
    setPosition({ x: 200, y: 200 });
  };
  return (
    <>
      <motion.div
        className="w-20 h-20 bg-blue-500 rounded"
        animate={{ x: position.x, y: position.y }}
        // transition={{ type: "spring", stiffness: 300 }}
      />
      <button onClick={handleCursorMove}>press</button>
    </>
  );
}
