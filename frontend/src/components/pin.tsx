import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: HotelType;
};

function Pin({ hotel }:Props) {
  return (
    <Marker position={[hotel.latitude,hotel.longitude]}>
      <Popup>
        <div className="flex gap-5">
          <img src={hotel.imageUrls[0]} alt="" className="w-16 h-12 object-cover rounded" />
          <div className="flex flex-col justify-between ">
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer mr-4" >{hotel.name}</Link>
            <span className="flex">
            
              {Array.from({ length: hotel.starRating }).map(() => (
                  <AiFillStar className="fill-yellow-400" />
                ))}
            </span>
            <b className="mr-2">$ {hotel.pricePerNight}</b>
          </div>
        </div>
      </Popup>
    </Marker>
   
  );
}

export default Pin;