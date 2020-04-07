import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import NavbarList from "./Components/NavbarList/NavbarList";
import Settings from "./Components/Settings/Settings";
import CreateEstimate from "./Components/CreateEstimate/CreateEstimate";
import Flights from "./Components/Flights/Flights";
import { RootState } from "./Redux";
import { setDrawerOpen, setSettingsOpen } from "./Redux/system";
import { Links } from "./types";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
}));

const getContent = (selectedLink: Links) => {
  switch (selectedLink) {
    case Links.CreateEstimate:
      return <CreateEstimate />;
    case Links.Flights:
      return <Flights />;
    case Links.Lodging:
      return <div>Lodging</div>;
    case Links.Vehicles:
      return <div>Vehicles</div>;
    default:
      throw new Error("Invalid Link");
  }
};

const useDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return useSelector((state: RootState) => ({
    classes,
    open: state.system.isDrawerOpen,
    selectedLink: state.system.selectedLink,
    isCalculating: state.system.isCalculating,
    handleDrawerOpen: () => dispatch(setDrawerOpen(true)),
    handleDrawerClose: () => dispatch(setDrawerOpen(false)),
    handleToggleSettings: () =>
      dispatch(setSettingsOpen(!state.system.isSettingsOpen)),
  }));
};

export default function Dashboard() {
  const {
    classes,
    open,
    selectedLink,
    isCalculating,
    handleDrawerOpen,
    handleDrawerClose,
    handleToggleSettings,
  } = useDashboard();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton
            disabled={isCalculating}
            onClick={handleToggleSettings}
            color="inherit"
          >
            <Tooltip title="Adjust settings" aria-label="Adjust settings">
              <SettingsIcon />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NavbarList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Grid container spacing={3}>
            {getContent(selectedLink)}
          </Grid>
          <Box pt={4}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Created By "}
              <Link color="inherit" href="https://github.com/FritzJay">
                Fritz Jay
              </Link>
              {" 2020."}
            </Typography>
          </Box>
        </Container>
      </main>
      <Settings />
    </div>
  );
}
