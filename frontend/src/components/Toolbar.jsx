import { BsArrowCounterclockwise } from "react-icons/bs";

const Toolbar = ({ tools, currentTool, handleToolChange }) => {
  return (
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
  );
};

export default Toolbar;
