
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

import slide1 from '../../../assets/home/project photo/ap.jpg';
import slide2 from '../../../assets/home/project photo/a.jpg';
import slide3 from '../../../assets/home/project photo/b.jpg';
import slide4 from '../../../assets/home/project photo/be.jpg';
import slide5 from '../../../assets/home/project photo/fu.jpg';
import { Link } from 'react-router-dom';

const Catagory=()=>{
    return(
        <section>
          <SectionTitle subHeading={"check Here"} heading={"For Catagoties"}>
          </SectionTitle>
        
          <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24 " 
      >
        <SwiperSlide ><Link to="/apartment"><img src={slide1} alt="" style={{height:'300px'}}/>
        <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Apartment</h3></Link> 
        </SwiperSlide>
        <SwiperSlide><Link to="/flat"><img src={slide2} alt="" style={{height:'300px'}}/>
        <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Flat</h3></Link>
        </SwiperSlide>
        <SwiperSlide><Link to="/singleRoom"><img src={slide3} alt="" style={{height:'300px'}}/>
        <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Single Room</h3></Link>
        </SwiperSlide>
        <SwiperSlide><Link to="/bachelor"><img src={slide4} alt="" style={{height:'300px'}}/>
        <h3 className='text-4xl uppercase text-center -mt-16 text-white'>bechalor</h3></Link>
        </SwiperSlide>
        <SwiperSlide><Link to="/wholeSpace"><img src={slide5} alt="" style={{height:'300px', width:'280px'}}/>
        <h3 className='text-4xl uppercase text-center -mt-16 text-white'>whole space</h3></Link>
        </SwiperSlide>
        
      </Swiper>
    
        </section>
          
    );
};
 export default Catagory;