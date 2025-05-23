const PlaceholderImage = () => {
  const placeholderSvg = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
        No Image Available
      </text>
    </svg>
  `)}`;

  return (
    <img 
      src={placeholderSvg}
      alt="Placeholder"
      className="w-full h-full object-cover"
    />
  );
};

export default PlaceholderImage; 