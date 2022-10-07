import React, { memo } from "react";
import Card from "../../components/Card/Card";
import Skeleton from "../../components/Loader/Skeleton";

const Services = (props) => {
  const { items, lastEelement, skeletonLoader } = props;
  return (
    <div className="cards-grid">
      {items &&
        items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <Card
                key={item.id}
                lastEelement={lastEelement}
                currentCount={index + 1}
                id={item.id}
                title={item.acf.client}
                subtitle={item.acf.work_category}
                banner={item.acf.image.sizes.medium_large}
              />
            );
          }
          return (
            <Card
              key={item.id}
              currentCount={index + 1}
              id={item.id}
              title={item.acf.client}
              subtitle={item.acf.work_category}
              banner={item.acf.image.sizes.medium_large}
            />
          );
        })}
      {skeletonLoader && (
        <>
          <Skeleton width="100%" height={80} />
          <Skeleton width="100%" height={80} />
          <Skeleton width="100%" height={80} />
        </>
      )}
    </div>
  );
};

export default memo(Services);
