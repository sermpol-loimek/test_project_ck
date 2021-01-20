import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Table from "../components/Table";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "70%",
    margin: "auto",
  },
}));
const DashboardContainer = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [blockingUi, setBlockingUi] = useState(true);
  // console.log(selectedDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateChangeTime = (date) => {
    setSelectedTime(date);
  };

  useEffect(() => {
    getData();
  }, []);

  const [detail, setDetail] = useState("");
  const [searchInput, setSearchInput] = useState(null);
  // console.log(searchDetail);
  const getData = async () => {
    await axios
      .get("http://localhost:3000/books")
      .then(({ data }) => {
        setDetail(data);
        setBlockingUi(false);
        // console.log(data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const onChangeSearchInput = (newValue) => {
    setSearchInput(newValue);
  };

  var filterDetail =
    searchInput !== null && selectedDate === null && selectedTime === null
      ? detail && detail.filter((item) => item.name.includes(searchInput))
      : searchInput === null && selectedDate !== null && selectedTime === null
      ? detail &&
        detail.filter((item) =>
          moment(item.datetime)
            .format("DD-MM-YYYY")
            .includes(moment(selectedDate).format("DD-MM-YYYY"))
        )
      : searchInput === null && selectedDate === null && selectedTime !== null
      ? detail &&
        detail.filter((item) =>
          moment(item.datetime)
            .format("hh:mm A")
            .includes(moment(selectedTime).format("hh:mm A"))
        )
      : searchInput === null && selectedDate !== null && selectedTime !== null
      ? detail &&
        detail.filter(
          (item) =>
            moment(item.datetime)
              .format("DD-MM-YYYY")
              .includes(moment(selectedDate).format("DD-MM-YYYY")) &&
            moment(item.datetime)
              .format("hh:mm A")
              .includes(moment(selectedTime).format("hh:mm A"))
        )
      : searchInput !== null && selectedDate === null && selectedTime !== null
      ? detail &&
        detail.filter(
          (item) =>
            item.name.includes(searchInput) &&
            moment(item.datetime)
              .format("hh:mm A")
              .includes(moment(selectedTime).format("hh:mm A"))
        )
      : searchInput !== null && selectedDate !== null && selectedTime === null
      ? detail &&
        detail.filter(
          (item) =>
            item.name.includes(searchInput) &&
            moment(item.datetime)
              .format("DD-MM-YYYY")
              .includes(moment(selectedDate).format("DD-MM-YYYY"))
        )
      : searchInput !== null && selectedDate !== null && selectedTime !== null
      ? detail &&
        detail.filter(
          (item) =>
            item.name.includes(searchInput) &&
            moment(item.datetime)
              .format("DD-MM-YYYY")
              .includes(moment(selectedDate).format("DD-MM-YYYY")) &&
            moment(item.datetime)
              .format("hh:mm A")
              .includes(moment(selectedTime).format("hh:mm A"))
        )
      : detail;

  console.log(searchInput);
  console.log(moment(selectedDate).format("DD-MM-YYYY"));
  console.log(moment(selectedTime).format("hh:mm A"));
  console.log(selectedTime);

  return (
    <div>
      <BlockUi tag="div" blocking={blockingUi}>
        <Grid container className={classes.container}>
          <Dashboard
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            selectedTime={selectedTime}
            handleDateChangeTime={handleDateChangeTime}
          />
          <Table
            detail={detail}
            searchDetail={filterDetail}
            onChangeSearchInput={onChangeSearchInput}
          />
        </Grid>
      </BlockUi>
    </div>
  );
};

export default DashboardContainer;
