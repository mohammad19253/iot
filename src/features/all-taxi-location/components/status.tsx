
import { WifiOff } from "react-bootstrap-icons";
import { Wifi } from "react-bootstrap-icons";
import { ToggleButton } from "../../../utils/toggle-button/toggle-button";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { setStatus } from "../slice/all-taxi-location-slice";

export const StatusTab = () => {
  const dispatch = useAppDispatch();
  const taxis = useAppSelector((state) => state.all_taxi_locations.taxis);
  const { register, watch } = useForm({
    defaultValues: {
      disconnected: true,
      connected: true,
    },
  });
  const status = watch();
  useEffect(() => {
    dispatch(setStatus(status));
  }, [dispatch, status]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-1">
      <ToggleButton
        icon={<Wifi color="white" size={20} />}
        title=" : متصل"
        sub_title={taxis.filter((taxi) => taxi.isConnected).length.toString()}
        registration={register("connected")}
        type="dark"
      />
      <ToggleButton
        icon={<WifiOff color="white" size={20} />}
        title=" : قطع"
        sub_title={taxis.filter((taxi) => !taxi.isConnected).length.toString()}
        registration={register("disconnected")}
        type="dark"
      />
    </div>
  );
};
