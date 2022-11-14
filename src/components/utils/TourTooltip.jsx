import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, HStack } from "native-base";

const TourTooltip = ({
	isFirstStep,
	isLastStep,
	handleNext,
	handlePrev,
	handleStop,
	currentStep,
	labels,
}) => (
	<>
		<View>
			<View>
				<Text testID="stepDescription" style={styles.description}>{currentStep.text}</Text>
			</View>
			<View>
                <HStack justifyContent="space-between">
				{!isLastStep ? (
                        <Button onPress={handleStop}>
                            <Text style={styles.navigator}>
                                {labels.skip || "Skip"}
                            </Text>
                        </Button>
				) : null}
				{!isFirstStep ? (

                        <Button onPress={handlePrev}>
                            <Text style={styles.navigator}>
                                {labels.previous || "Previous"}
                            </Text>
                        </Button>

				) : null}
				{!isLastStep ? (
                        <Button onPress={handleNext}>
                            <Text style={styles.navigator}>
                                {labels.next || "Next"}
                            </Text>
                        </Button>
				) : (
                        <Button onPress={handleStop}>
                            <Text style={styles.navigator}>
                                {labels.finish || "Finish"}
                            </Text>
                        </Button>
				)}
                </HStack>
			</View>
		</View>
	</>
);

export default TourTooltip;

const styles = StyleSheet.create({
    description: {
        color: "#fff",
    },
    navigator: {
        color: "#fff",
        textDecorationLine: "underline",
    },
});
