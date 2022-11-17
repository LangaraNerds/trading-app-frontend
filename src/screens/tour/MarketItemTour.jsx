import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Text, HStack, Pressable, Image } from "native-base";
import { StyleSheet } from "react-native";
import { cryptoImages } from "../../components/utils/assets";
import TourTooltip from "../../components/utils/TourTooltip";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
const WalkthroughableView = walkthroughable(View);

const MarketItemTour = ({ coin, navigation, start, copilotEvents, setMarketTour }) => {
	useEffect(() => {
		const tourTimeout = setTimeout(() => {
			start();
		}, 300);

		copilotEvents.on("stepChange", (step) => {
			// if (step.name === "marketstep3") {
			// 	setStep4Active(true);
			// } else {
			// 	setStep4Active(false);
			// }
			console.log(`Step is ${step.name}`);
		});

		copilotEvents.on("stop", () => {
			setMarketTour(false);
			// navigation.navigate("Market", "CryptoList");
		});

		return () => {
			clearTimeout(tourTimeout);
			copilotEvents.off("stepChange");
			copilotEvents.off("stop");
		};
	}, []);

	const assetImage = cryptoImages.find(
		(imgItem) => imgItem.ticker === coin.symbol
	).image;

	return (
		// Passing params to the nested screens ....
		<Pressable
			onPress={() =>
				navigation.navigate("CryptoDetail", {
					screen: "Chart",
					params: { ticker: coin.symbol },
				})
			}
		>
			<HStack
				onPress
				style={[styles.column, styles.tableLine]}
				alignItems={"center"}
			>
				<CopilotStep
					text="BTC is the abbreviation coin name for Bitcoin."
					order={1}
					name="marketstep1"
				>
					<WalkthroughableView>
						<HStack space={4} alignItems={"center"}>
							<Image
								source={assetImage}
								alt={coin.symbol}
								style={{ width: 30, height: 30 }}
							/>

							<Text style={styles.text}>
								{coin.symbol.slice(0, -4)}{" "}
							</Text>
						</HStack>
					</WalkthroughableView>
				</CopilotStep>
				<HStack justifyContent={"space-between"} w={"60%"}>

				<CopilotStep
							text="This refers to the current price of 1 BTC coin in USDT."
							order={2}
							name="marketstep2"
						>
						<WalkthroughableView>
							<View>
							<CopilotStep
								text="Select the coin to view all information to help you buy."
								order={4}
								name="marketstep4"
							>
								<WalkthroughableText>
									<Text style={styles.text}>
										{parseFloat(coin.lastPrice).toFixed(4)}{" "}
									</Text>
								</WalkthroughableText>
							</CopilotStep>
						</View>
						</WalkthroughableView>
				</CopilotStep>


					<CopilotStep
						text="This refers to the change in price over the last 24 hours."
						order={3}
						name="marketstep3"
					>
						<WalkthroughableText>
							<Text
								style={[
									styles.text,
									styles.percentage,
									coin.priceChangePercent >= 0
										? styles.percentagePositive
										: styles.percentageNegative,
								]}
							>
								{Number.parseFloat(
									coin.priceChangePercent
								).toFixed(2)}{" "}
								%
							</Text>
						</WalkthroughableText>
					</CopilotStep>
				</HStack>
			</HStack>
		</Pressable>
	);
};

const styles = StyleSheet.create({
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

	percentage: {
		borderRadius: 3,
		overflow: "hidden",
		paddingLeft: 4,
		paddingRight: 4,
		height: 22,
	},

	percentagePositive: {
		backgroundColor: "#31c451",
	},

	percentageNegative: {
		backgroundColor: "#ff6666",
	},
});

MarketItemTour.propTypes = {
	start: PropTypes.func.isRequired,
	copilotEvents: PropTypes.shape({
		on: PropTypes.func.isRequired,
	}).isRequired,
};

const style = {
	backgroundColor: "#386AF5",
	color: "#fff",
};

export default copilot({
	// verticalOffset: 25,
	tooltipComponent: TourTooltip,
	arrowColor: "#386AF5",
	tooltipStyle: style,
	backdropColor: "rgba(23, 17, 34, 0.95)",
	animated: true, // Can be true or false
	overlay: "svg", // Can be either view or svg
	stepNumberComponent: () => <></>,
})(MarketItemTour);