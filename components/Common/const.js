export const getImages = (imageName) => {
  if (imageName && (imageName.endsWith('.png') || imageName.endsWith('.jpg') || imageName.endsWith('.jpeg'))) {
    return `/images/${imageName.replace(/\.(png|jpg|jpeg)$/, '.webp')}`;
  }
  return `/images/${imageName}`;
};

export const LazyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};
