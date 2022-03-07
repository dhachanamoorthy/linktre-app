import {
  Divider,
  Grid,
  ButtonGroup,
  Button,
  Link,
  Fab,
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  CardHeader,
  CardContent,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { NavBar } from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import * as api from "../../service/api";
export function Tree() {
  const location = useLocation();
  const [tree_id, setTreeId] = useState(location.state.id);
  const [linkName, setLinkName] = useState(null);
  const [url, setURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [link, setLink] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      let data = await api.getAllLinks(tree_id);
      console.log(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addLink = () => {
    // let result =
  };
  return (
    <div>
      <NavBar isLoading={isLoading} />
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
            <CardHeader sx={{}} title="New Tree" />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-treename">
                  Link Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-treename"
                  value={linkName}
                  // onChange={(e)=>{settreeName(e.target.value)}}
                  onChange={(e) => setLinkName(e.target.value)}
                  label="Tree Name"
                />
                <InputLabel htmlFor="outlined-adornment-url">URL</InputLabel>
                <OutlinedInput 
                  id="outlined-adornment-url"
                  value={linkName}
                  // onChange={(e)=>{settreeName(e.target.value)}}
                  onChange={(e) => setURL(e.target.value)}
                  label="URL"
                />
              </FormControl>
              <Stack spacing={1} sx={{ mt: 1 }} direction="row">
                <Button variant="outlined" onClick={addLink}>
                  Add Link
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Modal>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        mt={2}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1 }}
      >
        <Grid item m={1} xs={2} sm={4} md={4}>
          <Grid m={1}>Link Name</Grid>
          <Grid m={1}>
            <Link
              scrollButtons="auto"
              variant="scrollable"
              href="https://stackoverflow.com/questions/70332556/call-useeffect-and-re-render-every-time-i-call-the-same-api"
            >
              https://stackoverflow.com/questions/70332556/call-useeffect-and-re-render-every-time-i-call-the-same-api
            </Link>
          </Grid>
          <Grid m={1}>
            <ButtonGroup mt={1}>
              <Button startIcon={<VisibilityIcon />}>Hide</Button>
              <Button startIcon={<DeleteIcon />}>Delete</Button>
              <Button startIcon={<EditIcon />}>Edit</Button>
            </ButtonGroup>
          </Grid>
          <Divider variant="middle" component="li" />
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", right: "20px", mr: 3 }}
        onClick={handleOpen}
      >
        <AddIcon sx={{ mr: 0.5, ml: 0.5 }} />
        Add Link
      </Fab>
    </div>
  );
}
