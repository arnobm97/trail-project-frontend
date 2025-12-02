import Banner from "../Banner/Banner";
import Catagory from "../Catagory/Catagory";
import Map from "../Map/Map";
import PopularMenu from "../PopularMenu/PolpularMenu";
import FeaturedItem from "../Featured/Featured";
import Review from "../Review/Review";
const Home=()=>{
    return(
        <div className="bg-gradient-to-br from-green-400 to-blue-600 ">
         <Banner></Banner>
         <Catagory></Catagory>
         <Map></Map>
         <PopularMenu></PopularMenu>
         <FeaturedItem></FeaturedItem>
        <Review></Review>

        </div>
    );
};
 export default Home;