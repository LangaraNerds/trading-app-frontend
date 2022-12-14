import React, { useState, useEffect } from "react";
import { FlatList, Heading, ScrollView, Text, View, Divider } from "native-base";
import { StyleSheet } from "react-native";
import CryptoItem from "../listItems/CryptoItem";
import { getTrendingCoinsData } from "../../utils/requests";
import { useNavigation } from "@react-navigation/native";
import CoinListHeader from "../layout/CoinListHeader";
import TopTradersContainer from "../containers/home/TopTradersContainer";
import Carousel from "../../screens/resources/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getTopTraders } from "../../utils/requests";

const TrendingCoinsList = ({ navigation }) => {
	// const navigation = useNavigation();

	const dispatch = useDispatch();
	const { user, token, isAuthenticated } = useSelector((state) => state.auth);

	const [data, setData] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [type, setType] = useState("standard");
	const [topTraders, setTopTraders] = useState([]);

	useEffect(() => {
		loadTopTraders();
	}, []);

	const loadTopTraders = async () => {
		try {
			const traderdata = await getTopTraders("/leaderboard", user.location.city);
			setTopTraders(traderdata);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// console.log("useeffect triggered")
		// const checkedFocus = navigation.addListener("focus", async () => {
		loadTrendingCoins();
		// 	console.log("TrendingCoinsList focused");
		// });

		// return checkedFocus;
	}, [type, toggle]);

	const loadTrendingCoins = async () => {
		try {
			const data = await getTrendingCoinsData("/crypto/trending");

			let sortedData = [];

			switch (type) {
				case "24":
					sortedData = data.listSortedCoins.sort((a, b) => {
						return toggle
							? a.priceChangePercent - b.priceChangePercent
							: b.priceChangePercent - a.priceChangePercent;
					});

					break;
				case "alphabetical":
					sortedData = data.listSortedCoins.sort((a, b) => {
						return toggle
							? a.symbol.localeCompare(b.symbol)
							: b.symbol.localeCompare(a.symbol);
					});
					break;
				default:
					sortedData = data.listSortedCoins;
			}

			setData([...sortedData]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTypeChange = (selectedType) => {
		setType(selectedType);
		setToggle(!toggle);
	};

	return (
		<>
			<FlatList
				ListHeaderComponent={() => (
					<>
						<Carousel />
						<Heading mt={3} ml={2}>Trending Coins</Heading>
						<CoinListHeader handleTypeChange={handleTypeChange} />
					</>
				)}
				data={data.slice(0, 5)}
				style={{ paddingHorizontal: 5 }}
				renderItem={({ item }) => {
					return <CryptoItem navigation={navigation} coin={item} />;
				}}
				keyExtractor={(item) => item.symbol}
				ListFooterComponent={() => (
					<>
						<Divider my={6} />
						<TopTradersContainer navigation={navigation} topTraders={topTraders} />
					</>
				)}
			/>
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
		marginTop: 5,
		textAlign: "center",
	},

	tableLine: {
		backgroundColor: "rgba(204, 204, 204, .1)",
		padding: 15,
		borderRadius: 5,
	},

	text: {
		color: "#fff",
	},

	button: {
		justifyContent: "center",
	},

	percentage: {
		borderRadius: 3,
		overflow: "hidden",
		paddingLeft: 4,
		paddingRight: 4,
	},

	percentagePositive: {
		backgroundColor: "#31c451",
	},

	percentageNegative: {
		backgroundColor: "#ff6666",
	},
});

export default TrendingCoinsList;
