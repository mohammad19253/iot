import { ToggleButton } from "../../../../../../utils/toggle-button/toggle-button";
import { Reception4 } from "react-bootstrap-icons";
import { Reception1 } from "react-bootstrap-icons";
import { ArrowDown } from "react-bootstrap-icons";
import { ArrowUp } from "react-bootstrap-icons";
import { Exclamation } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useForm } from "react-hook-form";
import { setBusy } from "../../../../slice/all-bus-location-slice";
import { useEffect } from "react";

export const BusyTab = () => {
  const dispatch = useAppDispatch();
  const buses = useAppSelector((state) => state.all_bus_locations.buses);
  const { register, watch } = useForm({
    defaultValues: {
      active: true,
      deactive: true,
      inbound: true,
      outbound: true,
      unknown: true,
    },
  });
  const busy = watch();
  useEffect(() => {
    dispatch(setBusy(busy));
  }, [dispatch, busy]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-1">
      <ToggleButton
        icon={<Reception4 color="white" size={16} />}
        title=" : شاغل امروز "
        sub_title={buses.filter((bus) => bus.busy).length.toString()}
        registration={register("active")}
        type="dark"
      />
      <ToggleButton
        icon={<Reception1 color="white" size={16} />}
        title=" : غیرشاغل امروز"
        sub_title={buses.filter((bus) => !bus.busy).length.toString()}
        registration={register("deactive")}
        type="dark"
      />
      <ToggleButton
        icon={<Exclamation color="white" size={24} />}
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
