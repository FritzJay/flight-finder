import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.css";

interface IAirport {
  name: string;
  code: string;
  city: string;
}

interface ICity {
  name: string;
  airports: IAirport[];
}

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

function App() {
  const [filter, setFilter] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<IAirport[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (filter === "") return;

      const response = await fetch(
        `http://localhost:3001/cities?queryparams={"searchString":"${filter}","mode":"Flights"}`
      );
      const cities: IResponse[] = await response.json();

      if (active) {
        const list: IAirport[] = [];

        cities.forEach(({ Display, nearbyAirports }) => {
          nearbyAirports?.forEach(({ code, name }) =>
            list.push({
              code,
              name,
              city: Display
            })
          );

          setOptions([...list]);
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, filter]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="airports"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        if (filter !== "") setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option =>
        `${option.code.toLocaleUpperCase()} - ${option.name}`
      }
      freeSolo
      options={options}
      loading={loading}
      groupBy={option => option.city}
      renderInput={params => (
        <TextField
          {...params}
          label="Airport"
          variant="outlined"
          onChange={e => {
            setFilter(e.target.value);

            if (e.target.value === "") {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
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
}

export default App;
