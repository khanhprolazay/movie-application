import { useState } from "react";

export const useSlider = (total: number) => {
  const [current, setCurrent] = useState<number>(0);
  const handlePrev = () => current !== 0 && setCurrent((cur) => cur - 1);
  const handleNext = () => current < total - 1 && setCurrent((cur) => cur + 1);

  const disablePrev = current === 0;
  const disableNext = current === total - 1 - 4

  return { current, handlePrev, handleNext, disablePrev, disableNext }; 
}