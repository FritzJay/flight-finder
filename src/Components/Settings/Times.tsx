import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  FormHelperText
} from "@material-ui/core";
import { RootState } from "../../Redux";
import { addTime, removeTime } from "../../Redux/settings";

const useTimes = () => {
  const dispatch = useDispatch();
  return useSelector(({ settings: { times } }: RootState) => ({
    times,
    handleAddTime: (t: number | undefined) =>
      t !== undefined && dispatch(addTime(t)),
    handleRemoveTime: (t: number | undefined) =>
      t !== undefined && dispatch(removeTime(t))
  }));
};

const Times = ({ classes }: { classes: any }) => {
  const { times, handleAddTime, handleRemoveTime } = useTimes();
  const error = times.length <= 0;

  return (
    <FormControl
      component="fieldset"
      error={error}
      className={classes.formControl}
    >
      <Typography variant="body1">Calculate Average Prices At</Typography>
      <FormGroup>
        {[0, 7, 14, 30, 60].map(t => (
          <FormControlLabel
            control={
              <Checkbox
                checked={times.includes(t)}
                onChange={() =>
                  times.includes(t) ? handleRemoveTime(t) : handleAddTime(t)
                }
                name={t.toString()}
              />
            }
            label={`${t} days`}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error && "Select at least one"}</FormHelperText>
    </FormControl>
  );
};

export default Times;
