import { BsShare } from "react-icons/bs";

const ShareButton = () => {
  return (
    <button className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors flex items-center">
      <BsShare className="mr-1" size={14} />
      <span className="text-xs">Share</span>
    </button>
  );
};

export default ShareButton;
