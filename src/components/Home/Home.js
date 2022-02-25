import { NavBar } from "../NavBar/NavBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import * as api from "../../service/api";
export function Home() {
	let [trees, setTrees] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(2),
		textAlign: "center",
		borderColor: "black",
		color: theme.palette.text.secondary,
	}));

	useEffect(() => {
		const fetchData = async () => {
			// api.getAllTrees(1).then((data) => {
			// 	console.log(data);
			// 	setTrees(data.rows);
			// 	setIsLoading(false);
			// });
			let data =await api.getAllTrees(1);
			console.log(data);
			setTrees(data.rows);
			const trees_count = data.count;
			setIsLoading(false);
		};
		fetchData();
	}, []);
	useEffect(() => {
		console.log(trees);
	}, [trees]);
	return (
		<div className="">
			<NavBar isLoading={isLoading}></NavBar>
			<Box sx={{ flexGrow: 1 }}>
				<Card spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
					{trees?.map((tree) => {
						return (
							<Grid
								item
								xs={12}
								sm={4}
								md={4}
								key={tree.id}
								style={{ border: "2px" }}
							>
								<Item>{tree.tree_name}</Item>
							</Grid>
						);
					})}
				</Card>
			</Box>
		</div>
	);
}
