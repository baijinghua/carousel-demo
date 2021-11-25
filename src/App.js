import "./App.css";

import React from "react";
import classnames from "classnames";

import img1 from "./images/1.webp";
import img2 from "./images/2.webp";
import img3 from "./images/3.webp";
import img4 from "./images/4.webp";

const imageSrc = [img1, img2, img3, img4];

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.mergedIndex = 0;
    this.prevIndex = this.getValidIndex(this.mergedIndex - 1);
    this.nextIndex = this.getValidIndex(this.mergedIndex + 1);
    this.length = imageSrc.length;
  }

  getValidIndex(i) {
    const indexNumber = +i;
    return (indexNumber + this.length) % this.length;
  }

  slideTo({ targetIndex }) {
    if (targetIndex !== this.mergedIndex) {
      this.setState({ index: targetIndex });
    }
  }

  componentDidMount() {
    this.timer && clearInterval(this.timer);

    this.timer = setInterval(
      () =>
        this.slideTo({
          targetIndex: this.nextIndex,
        }),
      3000
    );
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   this.slideTo({
  //     targetIndex: this.mergedIndex,
  //   });
  // }

  onMouseEnter() {
    this.timer && clearInterval(this.timer);
  }
  onMouseLeave() {
    this.timer = setInterval(
      () =>
        this.slideTo({
          targetIndex: this.nextIndex,
        }),
      3000
    );
  }

  render() {
    this.mergedIndex = this.state.index;
    this.prevIndex = this.getValidIndex(this.mergedIndex - 1);
    this.nextIndex = this.getValidIndex(this.mergedIndex + 1);
    return (
      <div
        className="carousel-wrapper"
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        <div className="carousel ">
          <div class="carousel-card">
            {imageSrc.map((src, index) => {
              const isCurrent = index === this.mergedIndex;
              const isPrev = index === this.prevIndex;
              const isNext = index === this.nextIndex;

              return (
                <div
                  key={index}
                  className={classnames(
                    isCurrent && "carousel-item-current",
                    isNext &&
                      (this.length > 2
                        ? "carousel-item-next"
                        : "carousel-item-next-few"),
                    isPrev && this.length > 2 && "carousel-item-prev"
                  )}
                  onClick={() =>
                    this.slideTo({
                      targetIndex: index,
                      isNegative: index === this.prevIndex,
                    })
                  }
                >
                  <img
                    src={src}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
