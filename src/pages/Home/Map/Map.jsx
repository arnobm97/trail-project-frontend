
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SectionTitleMap from "../../../Components/SectionTitle/SectionTitleMap";
const rentalListings = [
  {
    id: 1,
    title: "House No-28",
    lat:  23.7890 ,
    lng: 90.4127,
    price: "$1500/month",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    title: "Modern Studio",
    lat:23.7166484,
    lng:90.4126128,
    price: "$1200/month",
    image: "https://via.placeholder.com/150"
  }
];

const Map=()=>{
    const center = [23.8103, 90.4125]; 
    return(
         <section>
          <SectionTitleMap subHeading={"check Here"}
          heading={"Map Search"}>

          </SectionTitleMap>

          <div className="w-full">
      <MapContainer center={center} zoom={10} style={{ height: "500px", width: "1280px" }}>
       <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  
        />

        {rentalListings.map((house) => (
          <Marker key={house.id} position={[house.lat, house.lng]}>
            <Popup>
              <div>
                <strong>{house.title}</strong><br />
                {house.price}<br />
                <img src={house.image} alt="House" width="100" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
         </section>
    );
};
 export default Map;