
import { WifiOff } from "react-bootstrap-icons";
import { Wifi } from "react-bootstrap-icons";
import { Broadcast } from "react-bootstrap-icons";
import { Tools } from "react-bootstrap-icons";

import { ArrowDown } from "react-bootstrap-icons";
import { ArrowUp } from "react-bootstrap-icons";

import { Exclamation } from "react-bootstrap-icons";
import { ToggleButton } from "../../../../../../utils/toggle-button/toggle-button";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { setStatus } from "../../../../slice/all-bus-location-slice";

export const StatusTab = () => {
  const dispatch = useAppDispatch();
  const buses = useAppSelector((state) => state.all_bus_locations.buses);
  const { register, watch } = useForm({
    defaultValues: {
      disconnected: true,
      connected: true,
      suspended: true,
      repair: true,
      inbound: true,
      outbound: true,
      unknown: true,
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
        sub_title={buses.filter((bus) => bus.connected).length.toString()}
        registration={register("connected")}
        type="dark"
      />
      <ToggleButton
        icon={<WifiOff color="white" size={20} />}
        title=" : قطع"
        sub_title={buses.filter((bus) => !bus.connected).length.toString()}
        registration={register("disconnected")}
        type="dark"
      />
      <ToggleButton
        icon={<Tools color="white" size={18} />}
        title=" :   در تعمیرگاه"
        sub_title={buses.filter((bus) => bus.inGarage).length.toString()}
        registration={register("repair")}
        type="dark"
      />
      <ToggleButton
        icon={<Broadcast color="white" size={20} />}
        title=" : تعلیق شده ها"
        sub_title={buses.filter((bus) => bus.suspended).length.toString()}
        registration={register("suspended")}
        type="dark"
      />
      <ToggleButton
        icon={<Exclamation color="white" size={20} />}
        title=" : مسیر نامشخص"
        sub_title={buses
          .filter((bus) => bus.direction === "U")
          .length.toString()}
        registration={register("unknown")}
        type="success"
      />
      <ToggleButton
        icon={<ArrowUp color="white" size={18} />}
        title=" : مسیر رفت "
        sub_title={buses
          .filter((bus) => bus.direction === "I")
          .length.toString()}
        registration={register("inbound")}

      
      />
      <ToggleButton
        icon={<ArrowDown color="white" size={18} />}
        title=" :مسیر برگشت "
        sub_title={buses
          .filter((bus) => bus.direction === "O")
          .length.toString()}
        registration={register("outbound")}
        type="danger"
      />
    </div>
  );
};
