import { NavBar } from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import * as api from "../../service/api";
export function Home() {
	let [trees, setTrees] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	let columns = [
		{ field: "id", headerName: "ID", width: 10 },
		{ field: "tree_name", headerName: "Tree Name", width: 200 },
		{ field: "created_at", headerName: "Created At", width: 200 },
		{ field: "deleted_at", headerName: "Deleted At", width: 200 },
		{ field: "edit", headerName: "Edit", width: 200 },
	];

	useEffect(() => {
		const fetchData = async () => {
			let data = await api.getAllTrees(1);
			setTrees(data.rows);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	trees?.forEach((tree) => {});
	return (
		<div className="">
			<NavBar isLoading={isLoading}></NavBar>
			<Box style={{}}>
				<DataGrid
					rows={trees}
					columns={columns}
					columnBufer={2}
					autoHeight
					fcolumnThreshold={2}
				/>
			</Box>
		</div>
	);
}
