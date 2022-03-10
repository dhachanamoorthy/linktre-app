import {
  Grid,
  Link,
  Button,
  ButtonGroup,
  Divider,
  Modal,
  Card,
  CardHeader,
  TextField,
  FormControl,
  Stack,
  CardContent,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as api from "../../service/api";
import { useState,forwardRef } from "react";
import { async } from "@firebase/util";
export function LinkList(props) {
  let [visibility, setVisibility] = useState(props.visibility);
  let [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const [linkName, setLinkName] = useState(props.name);
  const [linkUrl, setLinkUrl] = useState(props.url);
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

  const updateLink = async (id) => {
    let payload = {
      link_name:linkName,
      link_url:linkUrl
    }
    let result = await api.updateLink(id,payload);
  };
  return (
    <Grid item m={1} xs={2} sm={4} md={4}>
      <Modal open={modalOpen} onClose={handleClose}>
      <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
  >
    <Card
      sx={{
        minWidth: 385,
        bgcolor: "background.default",
      }}
    >
      <CardHeader sx={{}} title="Edit Link" />
      <CardContent>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Link Name"
            variant="outlined"
            sx={{ marginTop: "10px" }}
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="URL"
            variant="outlined"
            sx={{ marginTop: "10px" }}
            value ={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </FormControl>

        <Stack spacing={1} sx={{ mt: 1 }} direction="row">
          <Button variant="outlined" onClick={()=>{updateLink(props.id)}}>
            Update Link
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </CardContent>
    </Card>
  </Grid>
      </Modal>
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
          <Button startIcon={<EditIcon />} onClick={handleOpen} handleClose = {handleClose}>
            Edit
          </Button>
        </ButtonGroup>
      </Grid>
      <Divider variant="middle" component="li" />
    </Grid>
  );
}
