import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { RootState } from "../../Redux";
import { setFirstName, setLastName, setSO } from "../../Redux/information";

const useInformationPage = () => {
  const dispatch = useDispatch();
  const { fName, lName, so } = useSelector((state: RootState) => ({
    fName: state.information.fName,
    lName: state.information.lName,
    so: state.information.so
  }));

  return {
    fName,
    lName,
    so,
    handleFirstNameChange: (event: any) =>
      dispatch(
        setFirstName(event.target.value === "" ? null : event.target.value)
      ),
    handleLastNameChange: (event: any) =>
      dispatch(
        setLastName(event.target.value === "" ? null : event.target.value)
      ),
    handleSOChange: (event: any) =>
      dispatch(setSO(event.target.value === "" ? null : event.target.value))
  };
};

const Information = () => {
  const {
    fName,
    lName,
    so,
    handleFirstNameChange,
    handleLastNameChange,
    handleSOChange
  } = useInformationPage();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Your Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={fName || ""}
            onChange={handleFirstNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            value={lName || ""}
            onChange={handleLastNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="so"
            name="so"
            label="SO"
            fullWidth
            autoComplete="so"
            value={so || ""}
            onChange={handleSOChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Information;
