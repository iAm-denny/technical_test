import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Loader from "../../components/Loader/Loader";
import { ItemContext } from "../../Context/ItemContext";
import "./home.css";
import IntroCircle from "./IntroCircle";
import Services from "./Services";

const Home = () => {
  const { items, setItems } = useContext(ItemContext);
  // tell to progress bar that api fetching is done.
  const [isDone, setIsDone] = useState(false);
  const [isDoneCircleIntro, setIsDoneCircleIntro] = useState(false);
  // this will show page after progress bar animation is finished.
  const [shouldShowPage, setShouldShowPage] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [skeletonLoader, setSkeletonLoader] = useState(false);

  const canvasRef = useRef();
  // infinite scroller
  const observer = useRef();

  const lastEelement = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSkeletonLoader(true);
        fetchData();
      }
    });
    if (node) observer.current.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      let scene, renderer, starGeo, stars, camera, controls;

      let velocities = [];
      let accelerations = [];

      camera = new THREE.PerspectiveCamera(
        75, // view angle
        window.innerWidth / window.innerHeight, // apsect ratio
        0.1, // near view point of camera
        1000 // far  view point of camera
      );

      function init() {
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor("#1a181b");
        canvasRef.current.appendChild(renderer.domElement);

        window.addEventListener("resize", () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        });

        document.querySelector(".canvas").addEventListener("mousemove", (e) => {
          const windowHalfWidth = window.innerWidth / 2;
          const windowHalfHeight = window.innerHeight / 2;
          const x = (e.clientX - windowHalfWidth) / 5;
          const y = (e.clientY - windowHalfHeight) / 5;
          camera.position.x = x;
          camera.position.y = y;
        });

        controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 200;
        controls.maxDistance = 1000;
        controls.enableZoom = false;
        controls.mouseButtons = {
          LEFT: "",
          MIDDLE: "",
          RIGHT: "",
        };
        controls.update();

        starGeo = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 600 - 300;
          const y = Math.random() * 600 - 300;
          const z = Math.random() * 600 - 300;
          velocities.push(0);
          accelerations.push(0.1);
          vertices.push(x, y, z);
        }

        starGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3)
        );

        const starMaterial = new THREE.PointsMaterial({
          color: "#fff",
          size: 2,
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);
        animate();
      }

      const animate = () => {
        let positionAttribute = starGeo.getAttribute("position");
        for (let i = 0; i < positionAttribute.count; i++) {
          if (i % 2 !== 0) {
            let x = positionAttribute.getX(i);
            let velocity = velocities[i];
            let acceleration = accelerations[i];

            velocity += acceleration;
            x -= velocity;

            if (x < -200) {
              x = 200;
              velocity = 0;
            }
            positionAttribute.setX(i, x);
          } else {
            let y = positionAttribute.getY(i);
            let velocity = velocities[i];
            let acceleration = accelerations[i];

            velocity += acceleration;
            y -= velocity;

            if (y < -200) {
              y = 200;
              velocity = 0;
            }
            positionAttribute.setY(i, y);
          }
        }
        controls.update();
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        var pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        positionAttribute.needsUpdate = true;
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      init();
    }
  }, [shouldShowPage, isDoneCircleIntro]);

  const fetchData = () => {
    fetch("https://www.wunderfauks.com/wp/wp-json/acf/v3/work")
      .then((t) => t.json())
      .then((res) => {
        setItems((prev) => [...prev, ...res]);
        setIsDone(true);
        setTimeout(() => {
          setSkeletonLoader(true);
        }, 3000);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loader
        isDone={isDone}
        shouldShowPage={shouldShowPage}
        setShouldShowPage={setShouldShowPage}
      />
      {!isDoneCircleIntro && shouldShowPage && (
        <IntroCircle setIsDoneCircleIntro={setIsDoneCircleIntro} />
      )}
      {isDoneCircleIntro && shouldShowPage && (
        <>
          <div className="banner">
            <div
              className={`canvas ${isMouseDown && "active"}`}
              ref={canvasRef}
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
            ></div>
            <div className="main_title">
              it is what it is.
              <br />
              Hheheheh
              <br />
              Hheheheh
            </div>
          </div>
          <div style={{ background: "#ffff", position: "relative", zIndex: 2 }}>
            <Services
              items={items}
              lastEelement={lastEelement}
              skeletonLoader={skeletonLoader}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
