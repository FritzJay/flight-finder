import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IAirport } from "../../types";
import { RootState } from "../../Redux";
import { setDestination } from "../../Redux/createEstimate";
import { queryAirports } from "../../API/queryAirports";

const useAirportAutoComplete = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<IAirport[]>([]);
  return useSelector((state: RootState) => ({
    value: state.createEstimate.destination,
    options,
    loading,
    handleChange: (_: any, newValue: IAirport | null) => {
      dispatch(setDestination(newValue));
      setLoading(false);
    },
    queryForOptions: async (event: any) => {
      if (event.target.value === "") return;
      setLoading(true);
      setOptions(await queryAirports(event.target.value));
    },
  }));
};

export const AirportAutocomplete = () => {
  const {
    value,
    loading,
    options,
    handleChange,
    queryForOptions,
  } = useAirportAutoComplete();

  return (
    <Autocomplete
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) =>
        `${option.code.toLocaleUpperCase()} - ${option.name}`
      }
      freeSolo
      clearOnEscape
      value={value}
      onChange={handleChange}
      options={options}
      loading={loading}
      groupBy={(option) => option.city}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Destination"
          required
          variant="outlined"
          onChange={queryForOptions}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AirportAutocomplete;
