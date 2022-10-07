import React, { useEffect } from "react";

import "./loader.css";

const Loader = (props) => {
  const { isDone, shouldShowPage, setShouldShowPage } = props;

  useEffect(() => {
    const loaderEle = document.querySelector(".loader");
    let control = "paused";
    setTimeout(() => {
      loaderEle.style.animationDuration = "10s";
      loaderEle.style.animationPlayState = "paused";
    }, [300]);

    setInterval(() => {
      loaderEle.style.animationDuration = "10s";
      loaderEle.style.animationPlayState =
        control === "paused" ? "running" : "paused";
    }, 2000);
  }, []);

  useEffect(() => {
    if (isDone) {
      setTimeout(() => {
        setShouldShowPage(true);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone]);

  return (
    <div className={`loader-wrapper ${shouldShowPage && "done"}`}>
      <div className={`loader ${isDone && "done"}`}></div>
    </div>
  );
};

export default Loader;
