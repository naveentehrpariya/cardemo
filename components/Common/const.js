export const getImages = (imageName) => {
  return `/images/${imageName}`;
};

export const LazyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};
