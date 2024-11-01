import { Spin } from "antd";
import React, { FC } from "react";

const CustomSpin: FC = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default CustomSpin;

