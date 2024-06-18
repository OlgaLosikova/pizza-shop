import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="138" cy="131" r="120" />
    <rect x="-2" y="270" rx="12" ry="12" width="280" height="27" />
    <rect x="-2" y="311" rx="12" ry="12" width="280" height="88" />
    <rect x="-1" y="420" rx="12" ry="12" width="90" height="27" />
    <rect x="125" y="407" rx="12" ry="12" width="152" height="50" />
  </ContentLoader>
);

export default PizzaSkeleton;
