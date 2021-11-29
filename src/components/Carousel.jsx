import React, { useEffect, useState } from "react";
import "../styles/carousel.css";
import Arrow from "../svg/Arrow";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item__wrapper" style={{ width: width }}>
      <div className="carousel-item__inner">{children}</div>
    </div>
  );
};

const Carousel = ({ children, show, infiniteLoop }) => {
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
  const [length, setLength] = useState(children.length);

  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && children.length > show
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > show);
  }, [children, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length + show - 1) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, show, length]);

  const next = () => {
    if (isRepeating || currentIndex < length + show) {
      setCurrentIndex((prevState) => prevState + 1);
      console.log(currentIndex);
    }
  };
  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      console.log(currentIndex);
    }
  };

  const goToIndex = (index) => {
    console.log(index);
    setCurrentIndex(index + show);
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex < show) {
        setTransitionEnabled(false);
        setCurrentIndex(length + show - 1);
      } else if (currentIndex >= length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  return (
    <div className="carousel">
      <div
        className={`inner show-${show}`}
        style={{
          transform: `translateX(-${currentIndex * (100 / show)}%)`,
          transition: !transitionEnabled ? "none" : undefined,
        }}
        onTransitionEnd={() => handleTransitionEnd()}
      >
        {length > show &&
          isRepeating &&
          React.Children.map(children, (child, index) => {
            if (index >= length - show) {
              return React.cloneElement(child, {
                width: `calc(100% / ${show})`,
              });
            }
          })}
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            width: `calc(100% / ${show})`,
          });
        })}
        {length > show &&
          isRepeating &&
          React.Children.map(children, (child, index) => {
            if (index <= length - 1) {
              return React.cloneElement(child, {
                width: `calc(100% / ${show})`,
              });
            }
          })}
      </div>

      <div className="indicators">
        {(isRepeating || currentIndex > 0) && (
          <div onClick={prev} className="left-arrow">
            <Arrow />
          </div>
        )}

        {React.Children.map(children, (child, index) => {
          return (
            <div
              className={`${index === currentIndex - show ? "active" : ""} dot`}
              onClick={() => {
                goToIndex(index);
              }}
            ></div>
          );
        })}

        {(isRepeating || currentIndex < length - show) && (
          <div onClick={next} className="right-arrow">
            <Arrow />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
