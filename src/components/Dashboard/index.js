import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  container: {
    marginRight: 30,
  },
}));
const MaterialUIPickers = ({
  selectedDate,
  handleDateChange,
  selectedTime,
  handleDateChangeTime,
}) => {
  // The first commit of Material-UI

  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-end">
        <KeyboardDatePicker
          className={classes.container}
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="dd-MM-yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedTime}
          onChange={handleDateChangeTime}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
export default MaterialUIPickers;
