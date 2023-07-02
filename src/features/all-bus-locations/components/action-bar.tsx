import Select from "react-select";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Button } from "../../../utils/button/button";
import { buses } from "../types";

import { Wifi } from "react-bootstrap-icons";
import { Broadcast } from "react-bootstrap-icons";
import { Tools } from "react-bootstrap-icons";
import { ArrowsAngleContract } from "react-bootstrap-icons";
import { ArrowsAngleExpand } from "react-bootstrap-icons";
import { Reception4 } from "react-bootstrap-icons";
import { Reception1 } from "react-bootstrap-icons";
import { ArrowDown } from "react-bootstrap-icons";
import { ArrowUp } from "react-bootstrap-icons";
import styles from "./all-bus-locations.module.scss";
import { Exclamation } from "react-bootstrap-icons";
import { ToggleButton } from "../../../utils/toggle-button/toggle-button";
import { useEffect } from "react";
import { setBuses } from "../slice/all-bus-location-slice";

export const ActionBar = () => {
  const buses = useAppSelector((state) => state.all_bus_locations.buses);
  const dispatch = useAppDispatch();
  const { register, watch } = useForm({
    defaultValues: {
      connected: true,
      suspended: true,
      repair: true,
      inline: true,
      outline: true,
      active: true,
      deactive: true,
      inbound: true,
      outbound: true,
      unknown: true,
    },
  });

  const watchConnected = watch("connected");
  const watchRepair = watch("repair");
  const watchSuspended = watch("suspended");

  const options =
    buses?.map((bus: buses) => {
      return {
        value: bus.busOperatorCode,
        label: bus.busOperatorCode,
      };
    }) || [];

  return (
    <div className={styles.action_bar_container}>
      <Select
        options={options}
        isLoading={options?.length === 0 ? true : false}
        classNamePrefix={"react-select"}
        placeholder={"یک اتوبوس انتخاب کنید"}
      />
      <Button className="w-100 my-2">نمایش</Button>
      <div className={styles.details_box}>
        <div className="d-flex justify-content-between my-2">
          <span>{buses.length}</span>
          <span>تعداد همه اتوبوس ها</span>
        </div>

        <div className="d-flex justify-content-between my-2">
          <span>{buses.length}</span>
          <span>تعداد کل نیم راه ها</span>
        </div>
        <hr />
        <div className="d-flex flex-column gap-1">
          <ToggleButton
            icon={<Wifi color="white" size={22} />}
            title=" : متصل"
            sub_title={buses.filter((bus) => bus.connected).length.toString()}
            registration={register("connected")}
          />
          <ToggleButton
            icon={<Tools color="white" size={18} />}
            title=" :   در تعمیرگاه"
            sub_title={buses.filter((bus) => bus.connected).length.toString()}
            registration={register("repair")}
          />
          <ToggleButton
            icon={<Broadcast color="white" size={22} />}
            title=" : تعلیق شده ها"
            sub_title={buses.filter((bus) => bus.connected).length.toString()}
            registration={register("suspended")}
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1">
          <ToggleButton
            icon={<Exclamation color="white" size={24} />}
            title=" : مسیر نامشخص"
            sub_title={buses
              .filter((bus) => bus.direction === "U")
              .length.toString()}
            registration={register("unknown")}
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
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1">
          <ToggleButton
            icon={<ArrowsAngleContract color="white" size={16} />}
            title=" : فعال در خط"
            sub_title={buses.filter((bus) => bus.connected).length.toString()}
            registration={register("inline")}
          />
          <ToggleButton
            icon={<ArrowsAngleExpand color="white" size={16} />}
            title=" : خارج از خط"
            sub_title={buses.filter((bus) => bus.connected).length.toString()}
            registration={register("outline")}
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1">
          <ToggleButton
            icon={<Reception4 color="white" size={16} />}
            title=" : شاغل امروز "
            sub_title={buses.filter((bus) => bus.connected).length.toString()}
            registration={register("active")}
          />
          <ToggleButton
            icon={<Reception1 color="white" size={16} />}
            title=" : غیرشاغل امروز"
            sub_title={buses.filter((bus) => bus.connected).length.toString()}
            registration={register("deactive")}
          />
        </div>
      </div>
    </div>
  );
};
