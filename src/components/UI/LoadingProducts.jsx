import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = ({ height, width}) => {
  return (
    <React.Fragment>
      <li>
        <Skeleton height={height} width={width} />
      </li>
    </React.Fragment>
  );
};

export default Loading;