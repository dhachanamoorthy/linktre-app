import { NavBar } from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import * as api from "../../service/api";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
export function Home() {
	let [trees, setTrees] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	let history = useHistory();
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
					<IconButton aria-label="delete"
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
				console.log(params);
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
	};
	useEffect(() => {
		const fetchData = async () => {
			let data = await api.getAllTrees(1);
			setTrees(data.rows);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	return (
		<div className="">
			<NavBar isLoading={isLoading}></NavBar>
			<Box sx={{ flexGrow: 1 }}>
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
					/>
				</Grid>
			</Box>
		</div>
	);
}
