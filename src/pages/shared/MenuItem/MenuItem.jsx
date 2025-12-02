const MenuItem= ({item}) =>{
    const{image,
  title,
  location,
  price,
  rentTag,
  propertyType,
  perMonthRate,
  bedrooms,
  baths,
  size,
  ownerName,
  ownerRole,
  postedTime}=item;
    return(
        <div className="flex space-x-4">
            <img className="w-[120px]" src={image} alt="" />
            <div>
                <h3>{title}-----</h3>

                <p>{location}</p>
                <p>{rentTag}</p>
                <p>{propertyType}</p>
                <p>{perMonthRate}</p>
                <p>{bedrooms}</p>
                <p>{baths}</p>
                <p>{ownerName}</p>
                <p>{ownerRole}</p>
                <p>{postedTime}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};
export default MenuItem;