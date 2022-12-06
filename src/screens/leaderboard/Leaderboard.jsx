import React, { useState, useEffect } from "react";
import {
	Text,
	HStack,
	Divider,
	FlatList,
	Button,
	View,
	Image,
	VStack,
	Box,
} from "native-base";
import Profile from "../../assets/images/icons/profile.png";
import { StyleSheet, ScrollView } from "react-native";
import Loader from "../../components/utils/Loader";
import { getTopTraders } from "../../utils/requests";
import { useSelector } from "react-redux";
import { ordinalFormatter } from "../../components/utils/numberFormats";

const Leaderboard = ({ navigation }) => {
	const data = [
		{ name: "Bruce", percentage: "5%", rank: 1 },
		{
			name: "Martha",
			percentage: "2%",
			rank: 2,
		},
		{
			name: "Alfred",
			percentage: "0.25%",
			rank: 3,
		},
	];
	const datapt2 = [
		{
			name: "Gordon",
			percentage: "5%",
			rank: 4,
		},
		{
			name: "Bane",
			percentage: "0.25%",
			rank: 5,
		},
		{
			name: "Joker",
			percentage: "2%",
			rank: 6,
		},
		{
			name: "Harley",
			percentage: "0.35%",
			rank: 7,
		},
		{
			name: "Ivy",
			percentage: "0.75%",
			rank: 8,
		},
		{
			name: "Harvey",
			percentage: "0.15%",
			rank: 9,
		},
		{
			name: "Jonathan",
			percentage: "0.85%",
			rank: 10,
		},
	];

	const { user } = useSelector((state) => state.auth);
	const [top3, setTop3] = useState([]);
	const [topTraders, setTopTraders] = useState([]);
	const [userRank, setUserRank] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		loadTopTraders();
	}, []);

	useEffect(() => {
		const checkedFocus = navigation.addListener("focus", async () => {
			await loadTopTraders();
			// console.log("Leaderboard focused");
		});

		return checkedFocus;
	}, [navigation]);


	const swapElements = (arr) => {
		var temp = arr[1]
		arr[1] = arr[0]
		arr[0] = temp

		return arr
	}

	const loadTopTraders = async () => {
		try {
			const data = await getTopTraders(
				"/leaderboard",
				user.location.city
			);

			setUserRank(data.rank);

			var first3 = data.traders.slice(0, 3)
			first3 = swapElements(first3)
			setTop3(first3)

			const traders = data.traders.slice(3, data.traders.length)
			setTopTraders(traders);


		} catch (error) {
			console.log(error);
		}
	};

	// console.log("top3", top3);

	return (
		<>
			{/* <Box style={[styles.trapezoid]}> */}
			<HStack style={styles.leaders}>

				{top3.map((item, index) => {
					if(index === 0) {
						return (
							<>
								<VStack style={styles.laterals}>
									<View>
										<Image
											source={Profile}
											alt={"user-image"}
											style={styles.imageLaterals}
										/>
										<View
											style={styles.viewContainerLateral}
											backgroundColor={"#A7A7AD"}
										>
											<Text style={styles.leads}>2</Text>
										</View>
									</View>
									<Text>{item.username}</Text>
									<Text>{item.performance.toFixed(2)}%</Text>
								</VStack>
							</>
						)
					} else if(index === 1) {
						return (
							<>
								<VStack style={styles.central}>
									<View>
										<Image
											source={Profile}
											alt={"user-image"}
											style={styles.imageCentral}
										/>
										<View style={styles.viewContainerCentral}>
											<Text style={styles.leads}>1</Text>
										</View>
									</View>
									<Text>{item.username}</Text>
									<Text>{item.performance.toFixed(2)}%</Text>
								</VStack>
							</>
						)
					} else {
						return (
							<>
								<VStack style={styles.laterals}>
									<View>
										<Image
											source={Profile}
											alt={"user-image"}
											style={styles.imageLaterals}
										/>
										<View
											style={styles.viewContainerLateral}
											backgroundColor={"#A77044"}
										>
											<Text style={styles.leads}>3</Text>
										</View>
									</View>
									<Text>{item.username}</Text>
									<Text>{item.performance.toFixed(2)}%</Text>
								</VStack>
							</>
						)
					}
				})}



			</HStack>
			{/* </Box> */}
			<ScrollView>
				<View ml={3} mr={3}>
					<HStack style={styles.column}>
						<Text>Your Rank: {userRank !== 0 ? ordinalFormatter(userRank) : "Not Ranked"}</Text>
					</HStack>

					{topTraders.map((item, index) => (
						<HStack
							style={[styles.column, styles.tableLine]}
							alignItems={"center"}
							key={index}
						>
							<HStack space={4} alignItems={"center"}>
								<Text style={styles.text}>{item.rank} </Text>
								<Image
									source={Profile}
									alt={"user-image"}
									style={styles.imageList}
								/>
								<Text style={styles.text}>{item.username} </Text>
							</HStack>
							<HStack justifyContent={"flex-end"} w={"50%"}>
								<Text style={styles.percentage}>
									{item.performance.toFixed(2)}%
								</Text>
							</HStack>
						</HStack>
					))}
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#171122",
	},

	column: {
		justifyContent: "space-between",
		marginBottom: 5,
		marginTop: 3,
		textAlign: "center",
	},

	tableLine: {
		backgroundColor: "rgba(204, 204, 204, .1)",
		padding: 10,
		borderRadius: 5,
	},

	text: {
		color: "#fff",
		paddingLeft: 8,
	},

	button: {
		justifyContent: "center",
	},

	percentage: {
		borderRadius: 3,
		overflow: "hidden",
		paddingLeft: 4,
		marginRight: 4,
	},

	percentagePositive: {
		backgroundColor: "#31c451",
	},

	percentageNegative: {
		backgroundColor: "#ff6666",
	},
	laterals: {
		flexGrow: 1,
		alignItems: "center",
		h: 40,
		justifyContent: "flex-end",
		pb: 3,
	},
	central: {
		flexGrow: 2,
		alignItems: "center",
		h: 40,
		justifyContent: "center",
		paddingBottom: 15,
	},
	trapezoid: {
		width: "90%",
		height: 0,
		borderTopWidth: 40,
		borderTopColor: "rgba(128, 128, 128, 0.4)",
		borderLeftWidth: 50,
		borderLeftColor: "transparent",
		borderRightWidth: 50,
		borderRightColor: "transparent",
		borderStyle: "solid",
		backgroundColor: "red",
	},
	imageList: {
		height: 35,
		width: 35,
		borderRadius: 50,
	},
	imageLaterals: {
		height: 80,
		width: 80,
		borderRadius: 50,
	},
	imageCentral: {
		height: 120,
		width: 120,
		borderRadius: 50,
	},
	leaders: {
		justifyContent: "space-between",
		marginLeft: 3,
		marginRigh: 3,
		maargBottom: 3,
		marginTop: 4,
	},
	viewContainerLateral: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		top: 0,
		alignSelf: "center",
		padding: 0,
		borderRadius: 50,
		width: 23,
		height: 23,
	},

	viewContainerCentral: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		top: 10,
		alignSelf: "center",
		padding: 0,
		borderRadius: 50,
		width: 23,
		height: 23,
		backgroundColor: "#D6AF36",
	},
	leads: {
		color: "black",
		width: "100%",
		fontWeight: "bold",
		textAlign: "center",
		padding: 0,
		margin: 0,
	},
});

export default Leaderboard;
