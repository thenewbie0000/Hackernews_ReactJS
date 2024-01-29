// CardSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <Skeleton height={100} width={200} />
      <Skeleton count={3} height={20} style={{ marginBottom: 10 }} />
    </div>
  );
};

export default CardSkeleton;