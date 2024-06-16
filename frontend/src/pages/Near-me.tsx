import Header from "../components/Header";
import Map from "../components/map";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";

const Nearme = ()=>{
    const { data: hotels } = useQuery("HotelNearMe", () =>
        apiClient.HotelNearMe()
      );
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex-1 mt-20 m-2">
                <Map hotels={hotels} center={"User"} />
            </div>

            
        </div>
    )
}


export default Nearme;