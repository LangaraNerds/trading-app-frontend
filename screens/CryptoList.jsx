import React, { useState, useEffect} from "react";
import {
    Box,
    VStack,
    Center,
    Text,
    HStack,
    Divider,
    Icon,
    ScrollView,
    NativeBaseProvider,
    Heading,
    Stack,
    View,
    Row,
} from "native-base";
import { StyleSheet} from "react-native";

const CryptoList = () => {
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  //coins supported by our app
  const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "SOLUSDT",
    "DOGEUSDT",
    "TRXUSDT",
  ];

    //create string to use on fetch with the coins we will use on our project
    const symbolsString = `symbols=[${symbols.map(symbol => `"${symbol}"`)}]`;

  useEffect(() => {
    fetch(`https://api.binance.com/api/v3/ticker/24hr?${symbolsString}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return(
    <>
      <ScrollView style={styles.background}>
        
        {data.map((coin) =>
        <HStack style={styles.column}>
        <Text style={styles.text}>{coin.symbol} </Text>
        <Text style={styles.text}>{coin.lastPrice} </Text>
        <Text style={[styles.text, styles.percentage, coin.priceChangePercent>=0 ? styles.percentagePositive : styles.percentageNegative]}>{Number.parseFloat(coin.priceChangePercent).toFixed(2)} %</Text>
        </HStack>        
        )}
      
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#221A32',
  },  

  column: {
    backgroundColor: 'rgba(204, 204, 204, .1)',
    
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    padding: 15,
    borderRadius: 5
  },

  text:{
    color: '#fff'
  },

  percentage: {
    borderRadius: 3,
    overflow: "hidden",
    paddingLeft: 4,
    paddingRight: 4
  },

  percentagePositive: {
    backgoundColor: '#31c451',
  },

  percentageNegative: {
    backgroundColor: '#ff6666',
  }
});


export default CryptoList
