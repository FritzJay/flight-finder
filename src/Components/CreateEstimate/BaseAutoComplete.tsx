import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IBase } from "../../types";
import { RootState } from "../../Redux";
import { queryBases } from "../../API/queryBases";

const useBaseAutoComplete = (onChange: (base: IBase | null) => any) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<IBase[]>([]);

  useEffect(() => {
    setLoading(true);

    queryBases()
      .then((bases) => {
        setOptions(bases);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return useSelector((state: RootState) => ({
    options,
    loading,
    handleChange: (_: any, newValue: IBase | null) => onChange(newValue),
  }));
};

export const BaseAutocomplete = ({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (base: IBase | null) => any;
  value: IBase | null;
}) => {
  const { loading, options, handleChange } = useBaseAutoComplete(onChange);

  return (
    <Autocomplete
      id="bases-combo-box"
      autoComplete={true}
      disableClearable={true}
      loading={loading}
      options={options}
      selectOnFocus={true}
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};

export default BaseAutocomplete;
