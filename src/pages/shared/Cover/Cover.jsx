import { Parallax, Background } from 'react-parallax';
const Cover = ({img, title}) => {
  return (
     <Parallax
        blur={{ min: -80, max: 80 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
    >
       <div
      className="hero h-[400px]"
      
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
          <p className="mb-5">
            Discover the perfect blend of comfort, convenience, and style in this beautifully maintained rental apartment. Ideally situated in a prime location, this property offers modern living spaces designed to meet the needs of today’s lifestyle.
          </p>
         
        </div>
      </div>
    </div>
    </Parallax>
    
  );
};

export default Cover;
