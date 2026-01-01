import React from "react";

interface Text3DRowProps {
  primary: string;
  secondary: string;
  color?: string;
  shade?: string;
}

const Text3DRow = ({ primary, secondary, color, shade }: Text3DRowProps) => {
  return (
    <div className="textContainer">
      <p className="primary" style={color ? { color } : undefined}>
        {primary}
      </p>
      <p className="secondary" style={shade ? { color: shade } : undefined}>
        {secondary}
      </p>
    </div>
  );
};

export default Text3DRow;
