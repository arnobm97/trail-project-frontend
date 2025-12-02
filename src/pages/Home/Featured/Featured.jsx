import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import FeaturedImg from"../../../assets/home/project photo/ap.jpg";
import './Featured.css';
const FeaturedItem=()=>{
    return(
        <div className="featured-item bg-fixed text-white pt-8 my-20">
         <SectionTitle subHeading={"Check it out"}
         heading={"Features"}></SectionTitle>
         <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-30 pb-20 pt-12 px-36">
            <div>
                <img src={FeaturedImg} 
                
                  alt="" />
            </div>
            <div className="md:ml-10">
                <p>Aug 20,2025</p>
                <p className="uppercase">Where Can i get some.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis assumenda earum dignissimos ipsam aut deleniti delectus deserunt veniam excepturi animi, optio harum dolorum, distinctio tempora temporibus autem. Repudiandae, reprehenderit!</p>
                <button className="btn btn-outline border-0 border-b-2">Oder now</button>
            </div>
         </div>
        </div>
    );
};
 export default FeaturedItem;