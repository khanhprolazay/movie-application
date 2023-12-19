import { useLayoutEffect } from "react";

export const useScrollToTop = (dependencies: any[]) => {
  useLayoutEffect(() => {
    const scroller = document.getElementById("scroller");
    if (scroller) scroller.scrollTo({ top: 0, behavior: "smooth" });
  }, dependencies);

};
