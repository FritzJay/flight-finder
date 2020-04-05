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
import {
  setAveragesFlights,
  setAveragesLodging,
  setAveragesVehicles
} from "../../Redux/settings";

const useAverages = () => {
  const dispatch = useDispatch();
  return useSelector(
    ({
      settings: {
        averages: { flights, lodging, vehicles }
      }
    }: RootState) => ({
      flights,
      lodging,
      vehicles,
      handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
          case "flights":
            return dispatch(setAveragesFlights(event.target.checked));
          case "lodging":
            return dispatch(setAveragesLodging(event.target.checked));
          case "vehicles":
            return dispatch(setAveragesVehicles(event.target.checked));
          default:
            throw new Error("Invalid checkbox name.");
        }
      }
    })
  );
};

const Averages = ({ classes }: { classes: any }) => {
  const { flights, lodging, vehicles, handleChange } = useAverages();
  const error = !flights && !lodging && !vehicles;

  return (
    <FormControl
      component="fieldset"
      error={error}
      className={classes.formControl}
    >
      <Typography variant="body1">Calculate Average Prices For</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={flights}
              onChange={handleChange}
              name="flights"
            />
          }
          label="Flights"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={lodging}
              onChange={handleChange}
              name="lodging"
            />
          }
          label="Lodging"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={vehicles}
              onChange={handleChange}
              name="vehicles"
            />
          }
          label="Vehicles"
        />
      </FormGroup>
      <FormHelperText>{error && "Select at least one"}</FormHelperText>
    </FormControl>
  );
};

export default Averages;
