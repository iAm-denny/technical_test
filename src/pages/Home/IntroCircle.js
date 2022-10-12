import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { gsap } from "gsap";

const IntroCircle = (props) => {
  const [doneAnimate, setDoneAnimate] = useState(false);
  const [fastAnimation, setFastAnimation] = useState(false);
  const [dataCirlce, setDataCircle] = useState([
    { index: 0, name: "Hide", value: 90 },
    { index: 1, name: "Real", value: 10 },
  ]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const ref = useRef(null);
  const textRef = useRef();
  const q = gsap.utils.selector(textRef);
  const tl = useRef();
  const cache = useRef(dataCirlce);

  const width = 960,
    height = 500;

  const radius = Math.min(width, height) / 2;
  const innerRadius = radius;
  const outerRadius = radius - 10;

  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const data = createPie(dataCirlce);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    const arcTween = (data) => {
      // create donut chart
      return (t) => createArc(data);
    };

    path
      .attr("class", "arc")
      .attr("fill", (d, i) => colors(i))
      .transition()
      .attrTween("d", arcTween);

    cache.current = dataCirlce;

    let rootSVGSize = d3.select("svg.d3_dounut").node().getBoundingClientRect();

    setX(rootSVGSize.width / 2);
    setY(rootSVGSize.height / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCirlce]);

  const calculateDataForNormal = () => {
    if (!doneAnimate) {
      let resData = [];
      const cloneData = [...dataCirlce];

      cloneData.map((c) => {
        if (c.name === "Real" && c.value <= 100) {
          c.value = c.value + 0.1 > 1000 ? 1000 : c.value + 0.3;
        } else if (c.value >= 0) {
          c.value = c.value - 0.1 < 0 ? 0 : c.value - 0.3;
        }
        return resData.push(c);
      });
      return resData;
    }
  };

  const calculateDataFastSpeed = () => {
    if (!doneAnimate) {
      let resData = [];
      const cloneData = [...dataCirlce];

      cloneData.map((c) => {
        if (c.name === "Real" && c.value <= 100) {
          c.value = c.value + 1 > 100 ? 100 : c.value + 1;
        } else if (c.value >= 0) {
          c.value = c.value - 1 < 0 ? 0 : c.value - 1;
        }
        return resData.push(c);
      });
      return resData;
    }
  };

  const animateFast = () => {
    if (
      !doneAnimate &&
      dataCirlce[0].value !== 0 &&
      dataCirlce[1].value !== 100
    ) {
      setDataCircle(calculateDataFastSpeed());
      requestAnimationFrame(animateFast);
    }
  };

  const animateNormal = () => {
    if (
      !doneAnimate &&
      dataCirlce[0].value !== 0 &&
      dataCirlce[1].value !== 100
    ) {
      setDataCircle(calculateDataForNormal());
      requestAnimationFrame(animateNormal);
    }
  };

  useEffect(() => {
    if (dataCirlce[0].value === 0 && dataCirlce[1].value === 100) {
      setDoneAnimate(true);
    }
  }, [dataCirlce]);

  useEffect(() => {
    if (!doneAnimate) {
      animateNormal();
      window.addEventListener("keydown", (e) => {
        setFastAnimation(true);
        if (e.code === "Space") {
          return animateFast();
        } else {
          setFastAnimation(false);
          return animateNormal();
        }
      });
      window.addEventListener("keyup", (e) => {
        setFastAnimation(false);
        return animateNormal();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneAnimate]);

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .from(q(".text_1"), {
        duration: 1,
        opacity: 0,
      })
      .to(q(".text_1"), {
        duration: 1,
        opacity: 1,
      })
      .to(q(".text_1"), {
        duration: 0.5,
        opacity: 0,
      })
      .from(q(".text_2"), {
        opacity: 0,
      })
      .to(q(".text_2"), {
        duration: 1,
        opacity: 1,
      })
      .to(q(".text_2"), {
        duration: 0.5,
        opacity: 0,
      })
      .from(q(".text_3"), {
        duration: 0.5,
        opacity: 0,
      })
      .to(q(".text_3"), {
        duration: 0.5,
        opacity: 1,
      })
      .to(q(".text_3"), {
        duration: 0.1,
        opacity: 0,
        onComplete: () => props.setIsDoneCircleIntro(true),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fastAnimation) {
      tl.current.timeScale(5);
    }
  }, [fastAnimation]);

  return (
    <div style={{ background: "#000", width: "100%", height: "100vh" }}>
      <svg preserveAspectRatio="xMinYMin" className="d3_dounut">
        <g ref={ref} transform={`translate(${x - 50}, ${y})`} />
        <g transform={`translate(${x - 100}, ${y})`} ref={textRef}>
          <text className="intro_circle text_1">Hello</text>
          <text className="intro_circle text_2">Welcome!!!</text>
          <text className="intro_circle text_3"> That's all!</text>
        </g>
      </svg>
    </div>
  );
};

export default IntroCircle;
