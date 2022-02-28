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
	Modal
} from "@mui/material";
import { AlertBox } from "../Alert/AlertBox";
import * as storage from '../../service/storage';
import {USER} from '../../constants/storage.constants'
export function Home() {
	let [trees, setTrees] = useState([]);
	let [reload, setReload] = useState(false);
	let [isLoading, setIsLoading] = useState(true);
	const [alert, setAlert] = useState()
	let history = useHistory();
	const [treeName, setTreeName] = useState(null);
	let columns = [
		{ field: "id", headerName: "ID", width: 20, flex: 1 },
		{ field: "tree_name", headerName: "Tree Name", flex: 1 },
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
		history.push("/tree");
	};

	const deleteTree = (e, params) => {
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
		console.log(row);
	};
	const addTree = async() =>{
		const user_id = storage.getStorage(USER.id);
		const payload = {
			user_id:user_id,
			tree_name :treeName
		}
		console.log(payload);
		let result = await api.addTree(payload);
		setReload(reload?false:true);
		console.log(result);
	}
	useEffect(() => {
		const fetchData = async () => {
			const user_id = storage.getStorage(USER.id);
			let data = await api.getAllTrees(user_id);
			setTrees(data.rows);
			setIsLoading(false);
		};
		fetchData();
	}, [reload]);
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
							<CardHeader sx={{ }} title="New Tree" />
							<CardContent>
								<FormControl fullWidth sx={{}}>
									<InputLabel htmlFor="outlined-adornment-amount">
										Tree Name
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-amount"
										value = {treeName}
										// onChange={(e)=>{settreeName(e.target.value)}}
										onChange={(e) => setTreeName(e.target.value)}
										label="Amount"
									/>
								</FormControl>
								<Stack spacing={1} sx={{ mt: 1 }} direction="row">
									<Button variant="outlined" onClick={addTree}>Add Tree</Button>
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
