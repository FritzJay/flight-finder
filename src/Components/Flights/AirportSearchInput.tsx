import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IAirport } from "../../interfaces";

interface IResponse {
  AirRank: number;
  CarRank: number;
  Display: string;
  HotelRank: number;
  KeyType: string;
  LocID: string;
  Word: string;
  isCode: boolean;
  isFirst: boolean;
  nearbyAirports: [
    {
      code: string;
      name: string;
      isRail: boolean;
    }
  ];
}

interface ICity {
  name: string;
  airports: IAirport[];
}

const AirportSearchInput = ({
  setSelected,
  label
}: {
  setSelected: (value: IAirport | undefined) => void;
  label: string;
}) => {
  const [options, setOptions] = React.useState<IAirport[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const queryForOptions = async (e: any) => {
    if (e.target.value === "") return;

    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/airports?queryparams={"searchString":"${e.target.value}"}`
    );
    const cities: IResponse[] = await response.json();

    const list: IAirport[] = [];

    cities.forEach(({ Display, nearbyAirports, LocID }) => {
      nearbyAirports?.forEach(({ code, name }) =>
        list.push({
          code,
          name,
          locID: LocID,
          city: Display
        })
      );

      setOptions([...list]);
      setLoading(false);
    });
  };

  return (
    <Autocomplete
      id={label.toLowerCase().replace(" ", "-")}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option =>
        `${option.code.toLocaleUpperCase()} - ${option.name}`
      }
      freeSolo
      clearOnEscape
      onChange={(event: any, newValue: IAirport | null) => {
        setSelected(newValue === null ? undefined : newValue);
      }}
      options={options}
      loading={loading}
      groupBy={option => option.city}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
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
            )
          }}
        />
      )}
    />
  );
};

export default AirportSearchInput;
