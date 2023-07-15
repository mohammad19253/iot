import { useState } from "react";
import Select from "react-select";

import { useAppDispatch, useAppSelector } from "../../../store/store";
import { taxi } from "../types";
import styles from "./all-taxi-locations.module.scss";
import { StatusTab } from "./status";
import moment from "jalali-moment";
import {
  ArrowBarLeft,
  ArrowBarRight,
  TaxiFrontFill,
} from "react-bootstrap-icons";
import classNames from "classnames";
import { setSelectedTaxi } from "../slice/all-taxi-location-slice";

export const ActionBar = () => {
  const dispatch = useAppDispatch();
  const [toggler, setToggler] = useState(false);
  const taxis = useAppSelector((state) => state.all_taxi_locations.taxis);
  const selectedTaxiCode = useAppSelector(
    (state) => state.all_taxi_locations.selectedTaxi
  );
  const selectedTaxi = taxis.find(
    (taxi) => taxi.taxiOperatorCode === selectedTaxiCode
  );
  const options =
    taxis?.map((taxi: taxi) => {
      return {
        value: taxi.taxiOperatorCode,
        label: taxi.taxiOperatorCode,
      };
    }) || [];

  const className = classNames(styles.action_bar_container, {
    [styles.toggler_off]: !toggler,

    [styles.toggler_on]: toggler,
  });
  const toggler_className = classNames(styles.toggler_button, {
    [styles.toggler_button_off]: !toggler,
  });
  return (
    <div className={className}>
      <Select
        isClearable
        options={options}
        isLoading={options?.length === 0 ? true : false}
        classNamePrefix={"react-select"}
        placeholder={"یک تاکسی انتخاب کنید"}
        onChange={(e) => {
          dispatch(setSelectedTaxi(e?.value));
        }}
      />
      <br />
      <div className={styles.details_box}>
        <div className="d-flex justify-content-between my-2">
          <span>{taxis.length}</span>
          <span>تعداد همه تاکسی ها</span>
        </div>
        <StatusTab />
      </div>
      <br />
      {selectedTaxi && (
        <>
          <div className={styles.bus_details_box}>
            <div className={styles.taxi_code}>
              <span>{selectedTaxi.taxiOperatorCode}&nbsp;:&nbsp;کد تاکسی</span>
              <span className="d-flex justify-content-between gap-2">
                <span>{selectedTaxi.taxiPlate}</span>
                <TaxiFrontFill size={20} />
              </span>
            </div>
            <div className={styles.detials}>
              <div>سرعت لحظه ای :&nbsp;&nbsp;{selectedTaxi?.groundSpeed}</div>
              <div>
                متصل/قطع:&nbsp;&nbsp;
                {selectedTaxi?.isConnected === true ? "وصل" : "قطع"}
              </div>
              <div>
                {moment(selectedTaxi?.clientDate, "YYYYMMDDHHmmss").format(
                  "jYYYY/jM/jD HH:mm:ss"
                )}
                &nbsp; : تاریخ
              </div>
              <div>
                {" "}
                راننده :&nbsp;&nbsp;{selectedTaxi?.driverFirstName}&nbsp;
                {selectedTaxi?.driverLastName}
              </div>
            </div>
          </div>
        </>
      )}

      <button
        className={toggler_className}
        onClick={() => setToggler((pre) => !pre)}
      >
        {toggler ? (
          <ArrowBarRight size={20} color="white" />
        ) : (
          <ArrowBarLeft size={20} color="white" />
        )}
      </button>
    </div>
  );
};
