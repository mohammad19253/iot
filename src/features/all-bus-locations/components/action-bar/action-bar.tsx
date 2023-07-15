import Select from "react-select";
import Tabs from "react-bootstrap/Tabs";

import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { buses } from "../../types";

import styles from "../all-bus-locations.module.scss";
import { setFilterState } from "../../slice/all-bus-location-slice";
import { ActiveTab } from "./active";
import { StatusTab } from "./status";
import { BusyTab } from "./busy";
import { Tab } from "react-bootstrap";
import moment from "jalali-moment";

export const ActionBar = () => {
  const dispatch = useAppDispatch();
  const buses = useAppSelector((state) => state.all_bus_locations.buses);
  const selectedBusCode = useAppSelector(
    (state) => state.all_bus_locations.selectedBus
  );
  const selectedBus = buses.find((bus) => bus.busCode === selectedBusCode);
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
      <br />
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

        <Tabs
          defaultActiveKey="status"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(eventKey) => {
            dispatch(setFilterState(eventKey));
          }}
        >
          <Tab eventKey="active" title="فعال">
            <ActiveTab />
          </Tab>
          <Tab eventKey="busy" title="شاغل امروز">
            <BusyTab />
          </Tab>

          <Tab eventKey="status" title="وضعیت">
            <StatusTab />
          </Tab>
        </Tabs>
      </div>

      {selectedBus && (
        <>
          <hr />{" "}
          <div className={styles.bus_details_box}>
            <div>
              <span> {selectedBus?.ccTripCode} خط اعزامی :</span>
              <span>سرعت لحظه ای : {selectedBus?.groundSpeed}</span>
            </div>
            <div>
              <span> {selectedBus?.connected} متصل/قطع :</span>
              <span>کد خط : {selectedBus?.tripCode}</span>
            </div>
            <div>
              <span>
                {moment(selectedBus?.clientDate, "YYYYMMDDHHmmss").format(
                  "jYYYY/jM/jD HH:mm:ss"
                )}{" "}
                تاریخ :
              </span>
              <span>تعداد تراکنش ها : {selectedBus?.dcTransactionCount}</span>
            </div>
            <div>
              <span>{selectedBus?.busy ? "شاغل امروز" : "غیرشاغل امروز"}</span>{" "}
              <span>
                {selectedBus?.activeInLine ? "فعال در خط" : "خارج از خط"}
              </span>
            </div>
            <div>
              <span>
                {selectedBus?.inboundFullBusHalfTripCount} تعداد نیم راه کامل
                رفت :
              </span>
              <span>
                تعداد نبم راه کامل برگشت :{" "}
                {selectedBus?.outboundFullBusHalfTripCount}
              </span>
            </div>
            <div>
              <span>
                {selectedBus?.inboundHalfBusHalfTripCount} تعداد نیم راه ناقص
                رفت :
              </span>
              <span>
                تعداد نبم راه ناقص برگشت :{" "}
                {selectedBus?.outboundHalfBusHalfTripCount}
              </span>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};
