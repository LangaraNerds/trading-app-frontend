import React, { useState} from "react";
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
} from "native-base";
import { StyleSheet} from "react-native";

const CoinDetail = () => {
    const coin_data = [
        {
          id: '1',
          symbol: 'BTS_BTC',
          displayName: 'BTS/BTC',
          state: "NORMAL",
          visibleStartTime: 1659018816626,
          tradableStartTime: 1659018816626,
          symbolTradeLimit:[{
            priceScale: '10',
            quantityScale: 0,
            amountScale: 8,
            minQuantity: "100",
            minAmount: "0.00001",
            highestBid: "0",
            lowestAsk: "0"
          }]
        }
      ];
    
    

    return (
        <>
        <VStack w="100%" >
            <Box >
                <Box m={2}>
                    <Text>Price Per Unit {coin_data[0].symbolTradeLimit[0].priceScale}</Text>
                    <Text>=${coin_data[0].symbolTradeLimit[0].priceScale}</Text>
                </Box>                
                <Box m={2}>
                    <Text>Chart  with  change </Text>
                </Box>
                    {/* <Box style={styles.container}> */}
                <ScrollView>
                    <VStack 
                      space="2" 
                      m="1" 
                      px="2" 
                      borderColor='black'
                      borderWidth={2}
                      borderRadius={5}
                      width="auto"
                    >
                      <Heading size="md">Overview</Heading>
                      <Stack direction="row" mb="2" mt="1" justifyContent={'space-between'} >
                        <Box  width={'49%'}>
                          <HStack justifyContent="space-between" >
                            <Text fontSize={'xs'} >High</Text>
                            <Text fontSize={'xs'} >USDT --VALUE--</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Low</Text>
                            <Text fontSize={'xs'}>USDT --VALUE--</Text>
                          </HStack>
                          <HStack justifyContent='space-between'>
                            <Text fontSize={'xs'}>Open</Text>
                            <Text fontSize={'xs'}>USDT --VALUE--</Text>
                          </HStack>
                        </Box>
                        <Box  width={'49%'}>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Mkt Cap</Text>
                            <Text fontSize={'xs'}>USDT --VALUE--</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Vol 24h</Text>
                            <Text fontSize={'xs'}>USDT --VALUE--</Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize={'xs'}>Mkt Dominance</Text>
                            <Text fontSize={'xs'}> --VALUE-- </Text>
                          </HStack>
                        </Box>
                      </Stack>    
                      <Divider/>
                    </VStack>
                  </ScrollView>
            </Box>
        </VStack>
        </>
    )

};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 'thin',
    borderRadius: 5
  },
  text:{
    fontSize: 10

  }
});

export default CoinDetail
