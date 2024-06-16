import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';

interface LocationMarkerProps {
  setCoordinates: React.Dispatch<React.SetStateAction<[number, number]>>;
}
interface DetailsSectionProps {
  initialCoordinates: [number, number];
}

function LocationMarker({ setCoordinates } :LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setCoordinates([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const DetailsSection = ({ initialCoordinates }: DetailsSectionProps) => {
  const [coordinates, setCoordinates] = useState<[number,number]>(initialCoordinates);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  useEffect(() => {
    setValue("latitude", coordinates[0]);
    setValue("longitude", coordinates[1]);
  }, [coordinates, setValue]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
        Latitude
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("latitude", { required: "This field is required" })}
            value={coordinates[0]}
            onChange={(e) => setCoordinates([parseFloat(e.target.value), coordinates[1]])}
          ></input>
          {errors.latitude && (
            <span className="text-red-500">{errors.latitude.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
        Longitude
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("longitude", { required: "This field is required" })}
            value={coordinates[1]}
            onChange={(e) => setCoordinates([coordinates[0], parseFloat(e.target.value)])}
          ></input>
          {errors.longitude && (
            <span className="text-red-500">{errors.longitude.message}</span>
          )}
        </label>
      </div>
      <MapContainer center={coordinates} zoom={13} style={{ height: "300px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} />
        <LocationMarker setCoordinates={setCoordinates} />
      </MapContainer>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
