import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.css";

interface IAirport {
  name: string;
  code: string;
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
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<ICity[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        "http://localhost:3001/cities?queryparams={%22searchString%22:%22a%22,%22mode%22:%22Flights%22}"
      );
      const cities = await response.json();
      console.log(cities);

      if (active) {
        setOptions(
          cities?.map(
            ({ Display: display, nearbyAirports }: IResponse) =>
              ({
                name: display,
                airports: nearbyAirports?.map(
                  ap =>
                    ({
                      name: ap.name,
                      code: ap.code
                    } as IAirport)
                )
              } as ICity)
          )
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

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
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
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
