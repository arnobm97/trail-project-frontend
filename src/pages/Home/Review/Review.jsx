import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Use only the Vercel backend URL
const baseURL = "https://trial-project-backend.vercel.app";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching reviews from:", `${baseURL}/reviews`);

    fetch(`${baseURL}/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="my-20">
        <SectionTitle subHeading={"What our client say"} heading={"Review"} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-20">
        <SectionTitle subHeading={"What our client say"} heading={"Review"} />
        <div className="text-center text-red-500 p-8">
          <p>Error loading reviews: {error}</p>
          <p className="text-sm mt-2">Backend URL: {baseURL}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-20">
      <SectionTitle subHeading={"What our client say"} heading={"Review"} />

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="m-24 flex flex-col items-center">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <p className="text-center text-gray-600 mt-4">
                  {review.details}
                </p>
                <h3 className="text-2xl text-orange-400 mt-4">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="m-24 flex flex-col items-center">
              <p className="text-gray-500">No reviews available</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default Review;
