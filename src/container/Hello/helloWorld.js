import React, { useState, useEffect, useRef } from "react";
import "./helloWorld.css";
import { pictureImg } from "./pictureImg.js";
import { pictureText } from "./pictureText";

function HelloWorld() {
  /*選取圖片*/
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setCount(index +1)
  };

  /*左上旋轉*/
  const [count, setCount] = useState(1);
  const [aAngle, setAAngle] = useState(0);
  const [bAngle, setBAngle] = useState(0);

  /*ref*/
  const  TriangleBg = useRef(null);
  const  TriangleBg1 = useRef(null);
  const imgContainerRef = useRef(null);

  useEffect(() => {
    console.log(count)

    /*將選中的圖片移動到中間*/
    const imgContainer = imgContainerRef.current;

    const selectedImgWidth = imgContainer.querySelector(".Img-box.selected").offsetWidth;
    const selectedImgLeft = imgContainer.querySelector(".Img-box.selected").offsetLeft;
    const imgContainerWidth = imgContainer.offsetWidth;

    const moveDistance = 
    imgContainerWidth / 2 - (selectedImgLeft + selectedImgWidth / 2); 
    imgContainer.style.transform = `translateX(${moveDistance}px)`;

    /*變更背景*/
    const TriangleBgCurrent = TriangleBg.current;
    const TriangleBgCurrent1 = TriangleBg1.current;
    if(count === 2){TriangleBgCurrent.style.background = '#52b69a'}
    if(count === 4){TriangleBgCurrent.style.background = '#168aad'}
    if(count === 1){TriangleBgCurrent1.style.background = '#76c893'}
    if(count === 3){TriangleBgCurrent1.style.background = '#34a0a4'}
    if(count === 5){TriangleBgCurrent1.style.background = '#1a759f'}

    /*左上旋轉*/
    if (count % 2 === 0) {
      setAAngle(-20);
      setBAngle(0);
    } else {
      setAAngle(0);
      setBAngle(-20);
    }

  }, [selectedImageIndex,count]);

  return (
    <div className="parent">
      <div className="left">
        <div
          style={{ transform: `rotate(${aAngle}deg)` }}
          ref={TriangleBg}
          className="left-before"
        ></div>
        <div
          style={{ transform: `rotate(${bAngle}deg)` }}
          ref={TriangleBg1}
          className="left-before1"
        ></div>
        <div className="left-after"></div>
        <div className="text">
        {pictureText.map(({text}, index1) => {
            return (
              <div className={index1+1 === count ? "text box" : ""} key={index1}>
                <h5>{text}</h5>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        <div className="Img-container" ref={imgContainerRef}>
          {pictureImg.map(({ avatar, name }, index) => {
            return (
              <div
                className={`Img-box ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
                onClick={() => handleImageClick(index)}
                key={index}
              >
                <img className="Img" src={avatar} alt={`img-${index}`} />
                <h5>{name}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HelloWorld;
