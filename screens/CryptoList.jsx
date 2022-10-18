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
    Button,
    NativeBaseProvider,
    Heading,
    Stack,
    View,
    Row,
} from "native-base";
import { StyleSheet} from "react-native";

const axios = require("axios");

const CryptoList = () => {
  // const [isLoading, setLoading] = useState(true);

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

  useEffect(function loadCoins() {
    const reload = () =>{
      axios.get(`https://api.binance.com/api/v3/ticker/24hr?${symbolsString}`)
      .then(result => {
        setData(result.data)
      })
      .catch((error) => console.error(error))
    }

    let reloadTimer = setInterval(reload, 5000)
    reload()

    return function stopReloading(){
      clearInterval(reloadTimer)
    }
  }, []);

  const handleAlphabeticalOrder = () => {
    data.sort((a, b) => {
      return a.symbol.localeCompare(b.symbol)
      // const symbolA = a.symbol;
      // const symbolB = b.symbol;


      // if(symbolA<symbolB){
      //   return -1;
      // }

      // if (symbolA>symbolB){
      //   return 1;
      // }

      // return 0;
    });
    console.log(data)
  }

  const handle24Sort = () => {
    data.sort((a, b) => a.priceChangePercent - b.priceChangePercent);
    console.log(data)
  }

  return(
    <>
      <ScrollView style={styles.background}>
        
        <HStack style={styles.column}>
          <Button style={styles.background} onPress={handleAlphabeticalOrder}>
            <Text style={styles.text}>Pair</Text>
            <Text style={styles.text}>USDT</Text>
          </Button>

          <Button style={styles.background}>
            <Text style={styles.text}>Last</Text>
            <Text style={styles.text}>price</Text>
          </Button>

          <Button style={styles.background} onPress={handle24Sort}>
            <Text style={styles.text}>24H</Text>
            <Text style={styles.text}>Change</Text>
          </Button>
        </HStack>
        
        <Divider />
        
        {data.map((coin, index) =>
          <HStack style={[styles.column, styles.tableLine]} key={index}>
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
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center'
  },

  tableLine: {
    backgroundColor: 'rgba(204, 204, 204, .1)',
    padding: 15,
    borderRadius: 5
  },

  text:{
    color: '#fff'
  },

  button: {
    justifyContent: 'center'
  },

  percentage: {
    borderRadius: 3,
    overflow: "hidden",
    paddingLeft: 4,
    paddingRight: 4
  },

  percentagePositive: {
    backgroundColor: '#31c451',
  },

  percentageNegative: {
    backgroundColor: '#ff6666',
  }
});


export default CryptoList
