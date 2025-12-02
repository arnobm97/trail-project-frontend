import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import img1 from '../../../assets/home/project photo/11.jpg';
import img2 from '../../../assets/home/project photo/aa.jpg';
import img3 from '../../../assets/home/project photo/c.jpg';
//import img4 from '../../../assets/home/project photo/d.jpg';
//import img5 from '../../../assets/home/project photo/e.jpg';
//import img6 from '../../../assets/home/project photo/f.jpg';

const Banner=()=>{
    return(
        <Carousel>
                <div>
                    <img src={img1}/>
                 
                </div>
                <div>
                    <img src={img2}
                    />
                
                </div>
               
                
            </Carousel>
    );
};
 export default Banner;