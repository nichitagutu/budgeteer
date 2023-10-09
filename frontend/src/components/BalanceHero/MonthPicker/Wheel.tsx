import { useEffect, useRef, useState } from "react";
import {
  KeenSliderOptions,
  TrackDetails,
  useKeenSlider,
} from "keen-slider/react";
import styled from "styled-components";

const WheelContainer = styled.div`
  display: block;
  color: var(--tg-theme-text-color);
  height: 100%;
  overflow: visible;
  width: 100%;

  &.wheel--perspective-right .wheel__inner {
    perspective-origin: calc(50% + 100px) 50%;
    transform: translateX(10px);
  }

  &.wheel--perspective-left .wheel__inner {
    perspective-origin: calc(50% - 100px) 50%;
    transform: translateX(-10px);
  }
`;

const WheelInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 16%;
  width: 100%;
`;

const WheelSlides = styled.div<{ width?: string }>`
  height: 100%;
  position: relative;
  width: ${(props) => props.width || "100%"};
`;

const WheelShadow = styled.div<{ type: "top" | "bottom" }>`
  background: ${(props) =>
    props.type === "top"
      ? "linear-gradient(to bottom, rgba(239, 239, 243, 0.9) 0%, rgba(239, 239, 243, 0.5) 100%)"
      : "linear-gradient(to bottom, rgba(239, 239, 243, 0.5) 0%, rgba(239, 239, 243, 0.9) 100%)"};
  left: 0;
  height: calc(42% + 2px);
  width: 100%;
  border-bottom: ${(props) =>
    props.type === "top" ? "0.5px solid rgba(255, 255, 255, 0.3)" : "none"};
  border-top: ${(props) =>
    props.type === "bottom" ? "0.5px solid rgba(255, 255, 255, 0.3)" : "none"};
  position: relative;
  margin-top: ${(props) => (props.type === "bottom" ? "2px" : "-2px")};
  z-index: 5;
`;

const WheelLabel = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  margin-top: 1px;
  margin-left: 5px;
`;

const WheelSlide = styled.div`
  align-items: center;
  backface-visibility: hidden;
  display: flex;
  font-size: 20px;
  font-weight: 400;
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: flex-end;
`;

export default function Wheel(props: {
  initIdx?: number;
  label?: string;
  length: number;
  loop?: boolean;
  perspective?: "left" | "right" | "center";
  setValue?: (relative: number, absolute: number) => string;
  width: number;
  onValueChange?: (value: string) => void;
}) {
  const perspective = props.perspective || "center";
  const wheelSize = 20;
  const slides = props.length;
  const slideDegree = 360 / wheelSize;
  const slidesPerView = props.loop ? 9 : 1;
  const [sliderState, setSliderState] = useState<TrackDetails | null>(null);
  const size = useRef(0);
  const options = useRef<KeenSliderOptions>({
    slides: {
      number: slides,
      origin: props.loop ? "center" : "auto",
      perView: slidesPerView,
    },

    vertical: true,

    initial: props.initIdx || 0,
    loop: props.loop,
    dragSpeed: (val) => {
      const height = size.current;
      return (
        val *
        (height /
          ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      );
    },
    created: (s) => {
      size.current = s.size;
    },
    updated: (s) => {
      size.current = s.size;
    },
    detailsChanged: (s) => {
      setSliderState(s.track.details);

      if (props.onValueChange) {
        const currentSlide = s.track.details.slides.find(
          (slide) => slide.distance === 0
        );

        if (currentSlide) {
          const i = currentSlide.abs;
          const value = props.setValue ? props.setValue(i, i) : i;
          props.onValueChange(value.toString());
        }
      }
    },
    rubberband: !props.loop,
    mode: "free-snap",
  });

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options.current);

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2);
  }, [slider]);

  function slideValues() {
    if (!sliderState) return [];
    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

    const values = [];
    for (let i = 0; i < slides; i++) {
      const distance = sliderState
        ? (sliderState.slides[i].distance - offset) * slidesPerView
        : 0;
      const rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };
      const value = props.setValue
        ? props.setValue(i, sliderState.abs + Math.round(distance))
        : i;
      values.push({ style, value });
    }

    return values;
  }

  return (
    <WheelContainer
      ref={sliderRef}
      className={`wheel wheel--perspective-${perspective}`}
    >
      <WheelShadow
        type="top"
        style={{ transform: `translateZ(${radius}px)` }}
      />
      <WheelInner>
        <WheelSlides style={{ width: props.width + "px" }}>
          {slideValues().map(({ style, value }, idx) => (
            <WheelSlide style={style} key={idx}>
              <span>{value}</span>
            </WheelSlide>
          ))}
        </WheelSlides>
        {props.label && (
          <WheelLabel style={{ transform: `translateZ(${radius}px)` }}>
            {props.label}
          </WheelLabel>
        )}
      </WheelInner>
      <WheelShadow
        type="bottom"
        style={{ transform: `translateZ(${radius}px)` }}
      />
    </WheelContainer>
  );
}
