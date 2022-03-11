import {
  Grid,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  TextField,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { NavBar } from "../NavBar/NavBar";
import { useState } from "react";
import * as storage from "../../service/storage";
import * as api from "../../service/api";
import { STORAGE } from "../../constants/storage.constants";
export function Profile(props) {
  const [user, setUser] = useState(
    JSON.parse(storage.getStorage(STORAGE.USER))
  );
  const [isLoading, setIsLoading] = useState(true);
  
  const handleChange = () => {};
  return (
    <Grid>
      <NavBar isLoading={isLoading} />
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user?.image_url}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user?.username}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions>
      </Card>
      <Card>
        <CardHeader
          subheader="These valuable informations are protected"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="*username"
                label="Username"
                name="firstName"
                onChange={handleChange}
                value={user.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled={user.email ? true : false}
                defaultValue={user?.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                disabled={user?.mobile}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" disabled>
            Save details
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
