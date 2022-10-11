import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { ItemContext } from "../../Context/ItemContext";
import "./work.css";

const Work = () => {
  const [isDone, setIsDone] = useState(false);
  // this will show page after progress bar animation is finished.
  const [shouldShowPage, setShouldShowPage] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const { items } = useContext(ItemContext);

  useEffect(() => {
    if (id) {
      const findItem = items.find((item) => item.id === parseInt(id));
      setData(findItem);
      setTimeout(() => {
        setIsDone(true);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <Loader
        isDone={isDone}
        shouldShowPage={shouldShowPage}
        setShouldShowPage={setShouldShowPage}
      />
      {shouldShowPage && (
        <>
          <div className="banner">
            <div
              style={{
                background: `url(${data?.acf.image.sizes["1536x1536"]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="banner_image"
            ></div>
          </div>
          <div
            style={{
              background: "#ffff",
              position: "relative",
              zIndex: 2,
              padding: 60,
            }}
          >
            <div className="breadcrumbs">{data?.acf.work_category}</div>
            <h1 className="title">{data?.acf.client}</h1>
            <p className="content">
              With the awardment to design and produce National Youth Council of
              Singapore (NYC) statistical handbooks and collaterals, we proposed
              a vibrant and friendlier creative concept to showcase the
              interactions amongst Singapore youths and their contributions to
              the community.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Work;
