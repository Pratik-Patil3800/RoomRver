import { useMap } from "react-leaflet";
import { useEffect } from "react";

type Props = {
  center: [number, number];
};

const SetView = ({ center }: Props) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

export default SetView;
