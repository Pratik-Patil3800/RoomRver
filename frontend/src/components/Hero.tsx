import hero from '../assets/register.webp';

const Hero = () => {
  const containerStyle = {
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '600px',
  };

  return (
    <div className="flex items-center justify-center">
      <div style={containerStyle}></div>
    </div>
  );
};

export default Hero;
