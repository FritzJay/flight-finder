import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import BusinessIcon from "@material-ui/icons/Business";
import FlightsIcon from "@material-ui/icons/Flight";
import LodgingIcon from "@material-ui/icons/Hotel";
import VehiclesIcon from "@material-ui/icons/DriveEta";
import { Links } from "../../types";
import { RootState } from "../../Redux/index";
import { setSelectedLink } from "../../Redux/system";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      position: "absolute",
      justifySelf: "center",
      alignSelf: "center",
      marginLeft: "2px",
    },
    iconProgress: {
      position: "absolute",
      justifySelf: "center",
      alignSelf: "center",
    },
  })
);

interface IListItem {
  Icon: any;
  label: string;
  link: Links;
}

const listItems: IListItem[] = [
  { Icon: FlightsIcon, label: "Flights", link: Links.Flights },
  { Icon: LodgingIcon, label: "Lodging", link: Links.Lodging },
  { Icon: VehiclesIcon, label: "Vehicles", link: Links.Vehicles },
];

const useNavbarList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return useSelector((state: RootState) => ({
    classes,
    selectedLink: state.system.selectedLink,
    activeLinks: state.system.activeLinks,
    loadingLinks: state.system.loadingLinks,
    handleSelectLink: (link: Links) => dispatch(setSelectedLink(link)),
  }));
};

const NavbarList = () => {
  const {
    classes,
    selectedLink,
    activeLinks,
    loadingLinks,
    handleSelectLink,
  } = useNavbarList();

  return (
    <List>
      <ListItem
        button
        divider
        selected={selectedLink === Links.CreateEstimate}
        onClick={() => handleSelectLink(Links.CreateEstimate)}
      >
        <ListItemIcon>
          <BusinessIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Create Estimate" />
      </ListItem>

      {listItems.map(({ label, Icon, link }) => (
        <ListItem
          key={label}
          button
          selected={selectedLink === link}
          disabled={!activeLinks.includes(link)}
          onClick={() => handleSelectLink(link)}
        >
          <ListItemIcon>
            <React.Fragment>
              <Icon className={classes.icon} />
              {loadingLinks.includes(link) && (
                <CircularProgress size={28} className={classes.iconProgress} />
              )}
            </React.Fragment>
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );
};

export default NavbarList;
