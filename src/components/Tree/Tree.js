import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from "@mui/material";
import { NavBar } from "../NavBar/NavBar";

export function Tree() {
  return (
    <div>
      <NavBar />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>Icon</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </div>
  );
}
