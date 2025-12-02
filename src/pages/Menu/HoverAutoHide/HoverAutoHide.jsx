import React, { useState, useEffect } from "react";

const HoverAutoHide = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timeout;
    if (showTooltip) {
      timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 2000); // hide after 2 seconds
    }
    return () => clearTimeout(timeout);
  }, [showTooltip]);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Hover Me
      </button>

      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 px-3 py-1 bg-black text-white text-sm rounded">
          Tooltip disappears in 2s
        </div>
      )}
    </div>
  );
};

export default HoverAutoHide;
