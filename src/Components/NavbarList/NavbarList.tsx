import React from "react";
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

export enum Links {
  CreateEstimate,
  Flights,
  Lodging,
  Vehicles,
}

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

const NavbarList = ({
  selectedLink,
  loadingLink,
  activeLinks,
}: {
  selectedLink: Links;
  loadingLink: Links | null;
  activeLinks: Links[];
}) => (
  <List>
    <ListItem button divider selected={selectedLink === Links.CreateEstimate}>
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Create Estimate" />
    </ListItem>

    {listItems.map(({ label, Icon, link }) => (
      <ListItem key={label} button disabled={!activeLinks.includes(link)}>
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
              display: loadingLink === link ? "block" : "none",
            }}
          >
            <LinearProgress variant="query" color="primary" />
          </Grid>
        </Grid>
      </ListItem>
    ))}
  </List>
);

export default NavbarList;
