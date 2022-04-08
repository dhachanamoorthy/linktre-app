import {
  Grid,
  Button,
  Fab,
  Modal,
  FormControl,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NavBar } from "../NavBar/NavBar";
import { AlertBox } from "../Alert/AlertBox";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import * as api from "../../service/api";
import { LinkList } from "./LinkList";
export function Tree() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [treeId] = useState(location.state.id);
  const [linkName, setLinkName] = useState(null);
  const [url, setURL] = useState(null);
  const [links, setLinks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [alert, setAlert] = useState(null);
  const [reload] = useState(false);
  useEffect(() => {
    fetchData();
  }, [reload]);
  const fetchData = async () => {
    let result = await api.getAllLinks(treeId);
   let data = result.data;
    let links =data ? data.links :null;
    setLinks(links);
    setIsLoading(false);
  };

  const addLink = async () => {
    let payload = {
      link_name: linkName,
      link_url: url,
      tree_id: treeId,
    };
    let result = await api.addLink(payload);
    fetchData();
    handleClose();
    handleAlert(result, "success");
  };

  const handleAlert = (result, type) => {
    setAlert(null);
    setAlert({ message: result.msg, severnity: type });
  };
  return (
    <div>
      <NavBar isLoading={isLoading} />
      {alert && <AlertBox message={alert} />}
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
            <CardHeader sx={{}} title="New Link" />
            <CardContent>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Link Name"
                  variant="outlined"
                  sx={{ marginTop: "10px" }}
                  onChange={(e) => setLinkName(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="URL"
                  variant="outlined"
                  sx={{ marginTop: "10px" }}
                  onChange={(e) => setURL(e.target.value)}
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
        {links.length > 0 ? (
          links.map((ele, index) => {
            return (
              <LinkList
                key={ele.id}
                id={ele.id}
                name={ele.link_name}
                url={ele.link_url}
                visibility={ele.disabled}
                onChangeData={fetchData}
                alertData={handleAlert}
              />
            );
          })
        ) : (
          <LinkList name="No Links Here" />
        )}
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
