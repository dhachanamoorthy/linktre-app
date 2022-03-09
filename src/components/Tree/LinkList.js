import { Grid, Link, Button, ButtonGroup, Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as api from "../../service/api";
import { useState } from "react";
export function LinkList(props) {
  let [visibility, setVisibility] = useState(props.visibility);
  const deleteLink = async (id) => {
    let res = await api.deleteLink(id);
    // props.onChangeData();
    console.log(res);
  };

  const updateLinkVisibility = async (id, disabled) => {
    setVisibility(visibility ? false : true);
    let result = await api.updateLinkVisibility(id, disabled);
    console.log(result);
  };
  console.log(`Hello ${JSON.stringify(props)}`);
  return (
    <Grid item m={1} xs={2} sm={4} md={4}>
      <Grid m={1}>{props.name}</Grid>
      <Grid m={1} sx={{ maxHeight: 100, maxWidth: 300, overflow: "auto" }}>
        <Link variant="scrollable" href={props.url}>
          {props.url}
        </Link>
      </Grid>
      <Grid m={1}>
        <ButtonGroup mt={1}>
          <Button
            startIcon={visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
            onClick={() => {
              updateLinkVisibility(props.id, visibility);
            }}
          >
            Hide
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            id={props.id}
            onClick={() => deleteLink(props.id)}
          >
            Delete
          </Button>
          <Button startIcon={<EditIcon />}>Edit</Button>
        </ButtonGroup>
      </Grid>
      <Divider variant="middle" component="li" />
    </Grid>
  );
}
