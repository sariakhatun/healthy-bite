import React from 'react';
import animationData from '../../assets/Animation - 1748864066476.json'
import Lottie from 'lottie-react';
const ErrorPageAnimation = ({ loop = true, width = 300, height = 300 }) => {
  const style = { width: `${width}px`, height: `${height}px` };

  return <Lottie animationData={animationData} loop={loop} style={style} />;
};


export default ErrorPageAnimation;