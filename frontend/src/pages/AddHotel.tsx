import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
// import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";

const AddHotel = () => {
  // const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotel Saved!");
    },
    onError: () => {
      toast.error("Error Saving Hotel");
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
