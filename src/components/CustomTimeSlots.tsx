import { Tag } from "antd";
import React, { FC } from "react";

const CustomTimeSlots: FC = ({
  timeSlots,
  handleChange,
}) => {
  return timeSlots.map((timeSlot) => (
    <Tag.CheckableTag
      key={timeSlot.id}
      checked={!timeSlot.isAvailable}
      onChange={(checked) => handleChange(timeSlot, checked)}
    >
      {timeSlot.time}
    </Tag.CheckableTag>
  ));
};

export default CustomTimeSlots;

