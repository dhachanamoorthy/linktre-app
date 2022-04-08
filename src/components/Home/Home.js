import { NavBar } from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import * as api from "../../service/api";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Stack,
  Grid,
  Fab,
  Modal,
  FormHelperText,
} from "@mui/material";
import { AlertBox } from "../Alert/AlertBox";
import * as storage from "../../service/storage";
import { STORAGE } from "../../constants/storage.constants";
export function Home() {
  let [trees, setTrees] = useState([]);
  let [reload, setReload] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [user, setUser] = useState(JSON.parse(storage.getStorage(STORAGE.USER)));
  let [alert, setAlert] = useState();
  let [isValidTreeName, setIsValidTreeName] = useState(false);
  let history = useHistory();
  const [treeName, setTreeName] = useState(null);
  let columns = [
    { field: "id", headerName: "ID", width: 20, flex: 1 },
    { field: "tree_name", headerName: "Tree Name", width: 200, flex: 1 },
    { field: "created_at", headerName: "Created At", width: 200, flex: 1 },
    {
      field: "delete",
      headerName: "Delete",
      width: 25,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              deleteTree(event, params);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 20,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              editTree(event, params);
            }}
          >
            <EditIcon />
          </IconButton>
        );
      },
      flex: 1,
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const editTree = (e, params) => {
    e.stopPropagation();
    const data = params.api;
    const row = {};
    data
      .getAllColumns()
      .filter((columns) => columns.field !== "__check__" && !!columns)
      .forEach((c) => (row[c.field] = params.getValue(params.id, c.field)));
    history.push("/trees", { id: row.id });
  };

  const deleteTree = async (e, params) => {
    e.stopPropagation();
    const data = params.api;
    const row = {};
    data
      .getAllColumns()
      .filter((columns) => columns.field !== "__check__" && !!columns)
      .forEach(
        (columns) =>
          (row[columns.field] = params.getValue(params.id, columns.field))
      );
    setIsLoading(true);
    console.log(row);
    let result = await api.deleteTree(row.id);
    fetchData();
  };
  const addTree = async () => {
    const user_id = user.id;
    const payload = {
      user_id: user_id,
      tree_name: treeName,
    };
    setIsLoading(true);
    console.log(payload);
    let result = await api.addTree(payload);
    fetchData();
  };
  const fetchData = async () => {
    const userId = user.id;
    let result = await api.getAllTrees(userId);
    let trees = result ? result.data.trees : [];
    setTrees(trees);
    setIsLoading(false);
    handleClose();
  };

  const checkTreeName = async () => {
    if (treeName) {
      let result = await api.getTreeByName(treeName);
      let data = result.data;
      if (data.length == 0) {
        setIsValidTreeName(true);
      } else {
        setIsValidTreeName(false);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [reload]);

  useEffect(() => {
    checkTreeName();
  }, [treeName]);
  return (
    <div className="">
      <NavBar isLoading={isLoading}></NavBar>
      {alert && <AlertBox message={alert} />}
      <Box sx={{ flexGrow: 1 }}>
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
                <FormControl fullWidth sx={{}}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Tree Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-treename"
                    value={treeName}
                    // onChange={(e)=>{settreeName(e.target.value)}}
                    onChange={(e) => {
                      setTreeName(e.target.value);
                    }}
                    label="Tree Name"
                  />

                  {!isValidTreeName && (
                    <FormHelperText error={!isValidTreeName}>
                      *Tree Name unavailable
                    </FormHelperText>
                  )}
                </FormControl>
                <Stack spacing={1} sx={{ mt: 1 }} direction="row">
                  <Button
                    variant="outlined"
                    onClick={addTree}
                    disabled={!isValidTreeName}
                  >
                    Add Tree
                  </Button>
                  <Button variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Modal>
        <Grid item xs={12} m={1} alignItems="center" justifyContent="center">
          <DataGrid
            rows={trees}
            columns={columns}
            columnBufer={2}
            textAlign={"center"}
            autoHeight
            loading={isLoading}
            fcolumnThreshold={2}
            sx={{
              MuiDataGrid: {
                textAlign: "center",
              },
            }}
            rowsPerPageOptions={[10]}
            initialState={{
              pagination: {
                pageSize: 8,
              },
            }}
          />
        </Grid>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          sx={{ position: "absolute", right: "20px" }}
          onClick={handleOpen}
        >
          <AddIcon sx={{ mr: 0.5, ml: 0.5 }} />
          Add Tree
        </Fab>
      </Box>
    </div>
  );
}
