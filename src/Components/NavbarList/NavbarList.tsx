import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BusinessIcon from "@material-ui/icons/Business";
import FlightsIcon from "@material-ui/icons/Flight";
import LodgingIcon from "@material-ui/icons/Hotel";
import VehiclesIcon from "@material-ui/icons/DriveEta";
import { Links } from "../../types";
import { RootState } from "../../Redux/index";
import { setSelectedLink } from "../../Redux/system";

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
  return useSelector((state: RootState) => ({
    selectedLink: state.system.selectedLink,
    activeLinks: state.system.activeLinks,
    handleSelectLink: (link: Links) => dispatch(setSelectedLink(link)),
  }));
};

const NavbarList = () => {
  const { selectedLink, activeLinks, handleSelectLink } = useNavbarList();

  return (
    <List>
      <ListItem
        button
        divider
        selected={selectedLink === Links.CreateEstimate}
        onClick={() => handleSelectLink(Links.CreateEstimate)}
      >
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Create Estimate" />
      </ListItem>

      {listItems.map(({ label, Icon, link }) => (
        <ListItem
          key={label}
          button
          disabled={!activeLinks.includes(link)}
          onClick={() => handleSelectLink(link)}
        >
          <Grid container>
            <Grid item container alignItems="center" xs={12}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: undefined === link ? "block" : "none",
              }}
            >
              <LinearProgress variant="query" color="primary" />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default NavbarList;
