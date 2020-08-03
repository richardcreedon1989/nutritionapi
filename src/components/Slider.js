import React, { useState } from "react";
import Slider from "react-rangeslider";

const Sliders = () => {
  const [volume, setVolume] = useState(40);

  const handleOnChange = (value) => {
    console.log("value slider", value);
    setVolume(value);
  };

  return (
    <Slider
      value={volume}
      orientation="vertical"
      onChange={handleOnChange}
      handleLabel="string"
    />
  );
};

export default Sliders;
