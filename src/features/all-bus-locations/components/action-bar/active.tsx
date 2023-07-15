import { useForm } from "react-hook-form";

import { ArrowsAngleContract } from "react-bootstrap-icons";
import { ArrowsAngleExpand } from "react-bootstrap-icons";
import { ArrowDown } from "react-bootstrap-icons";
import { ArrowUp } from "react-bootstrap-icons";
import { Exclamation } from "react-bootstrap-icons";
import { ToggleButton } from "../../../../utils/toggle-button/toggle-button";
import { useAppSelector, useAppDispatch } from "../../../../store/store";
import { useEffect } from "react";
import { setActive } from "../../slice/all-bus-location-slice";

export const ActiveTab = () => {
  const dispatch = useAppDispatch();

  const { register, watch } = useForm({
    defaultValues: {
      inline: true,
      outline: true,
      inbound: true,
      outbound: true,
      unknown: true,
    },
  });
  const active = watch();
  const buses = useAppSelector((state) => state.all_bus_locations.buses);
  useEffect(() => {
    dispatch(setActive(active));
  }, [dispatch, active]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-1">
      <ToggleButton
        icon={<ArrowsAngleContract color="white" size={16} />}
        title=" : فعال در خط"
        sub_title={buses.filter((bus) => bus.activeInLine).length.toString()}
        registration={register("inline")}
        type={"dark"}
      />
      <ToggleButton
        icon={<ArrowsAngleExpand color="white" size={16} />}
        title=" : خارج از خط"
        sub_title={buses.filter((bus) => !bus.activeInLine).length.toString()}
        registration={register("outline")}
        type={"dark"}
      />

      <ToggleButton
        icon={<Exclamation color="white" size={24} />}
        title=" : مسیر نامشخص"
        sub_title={buses
          .filter((bus) => bus.direction === "U")
          .length.toString()}
        registration={register("unknown")}
        type={"success"}
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
        type={"danger"}
      />
    </div>
  );
};
