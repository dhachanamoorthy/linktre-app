import { Grid, Link, Button, ButtonGroup, Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as api from "../../service/api";
export function LinkList(props) {
  const deleteLink = async (id) => {
    await api.deleteLink(id);
  };
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
          <Button startIcon={<VisibilityIcon />}>Hide</Button>
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
