import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import { RootState } from "./Redux/index";
import Flights from "./Components/Flights/Flights";
import Information from "./Components/Information/Information";
import { setStep } from "./Redux/system";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const useApp = () => {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.system.step);
  return {
    step,
    handleNext: () => dispatch(setStep(step + 1)),
    handleBack: () => dispatch(setStep(step - 1))
  };
};

const steps = ["Information", "Flights", "Lodging", "Car Rentals"];

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <Information />;
    case 1:
      return <Flights />;
    case 2:
      return <div>Lodging</div>;
    case 3:
      return <div>Car Rentals</div>;
    default:
      throw new Error("Unknown step");
  }
};

const App = () => {
  const classes = useStyles();
  const { step, handleBack, handleNext } = useApp();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Flight Finder
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Book Flights
          </Typography>
          <Stepper activeStep={step} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {step === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(step)}
                <div className={classes.buttons}>
                  {step !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {step === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>

        <Typography variant="body2" color="textSecondary" align="center">
          {"Powered By "}
          <Link color="inherit" href="https://www.certify.com/">
            Certify Travel
          </Link>
        </Typography>
      </main>
    </React.Fragment>
  );
};

export default App;
