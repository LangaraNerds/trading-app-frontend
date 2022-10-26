import React from 'react'
import { View, Text, HStack, Pressable, Image, VStack, Box } from 'native-base'
import { StyleSheet } from 'react-native';
import { cryptoImages } from '../utils/assets';


const AssetItem = ({ asset }) => {
    const assetImage = cryptoImages.find(imgItem => imgItem.ticker === asset.ticker).image;
    // const imageCoin = require(`../../assets/images/coins/${asset.ticker}.png`);
    
  return (
    <HStack onPress style={[styles.column, styles.tableLine]}>
        <HStack space={4} alignItems={'center'}>
            <Image source={assetImage} alt={asset.name} style={{ width: 30, height: 30 }} />
            <VStack>
                <Text style={styles.text}>{asset.ticker.replace('USDT', '')} </Text>
                <Text style={styles.textSecondary} color={'secondary.darkGray'}>{asset.name} </Text>
            </VStack>
        </HStack>

        <HStack justifyContent={'space-between'} w={'55%'} alignItems={'center'}>
            <VStack>
                <Text style={styles.text}>{asset.quantity}</Text>
                <Text style={styles.textSecondary} color={'secondary.darkGray'}>$0</Text>
                {/* <Text style={[styles.text, styles.percentage, asset.priceChangePercent >= 0 ? styles.percentagePositive : styles.percentageNegative]}>
                    {Number.parseFloat(asset.priceChangePercent).toFixed(2)} %
                </Text> */}
            </VStack>
            
            <VStack>
                <Text style={styles.text}>2.54%</Text>
                <Text style={styles.textSecondary} color={'secondary.darkGray'}>=2.54$</Text>
            </VStack>
        </HStack>

        {/* <Text style={styles.text}>{parseFloat(asset.lastPrice).toFixed(4)}</Text> */}
       
    </HStack>
  )
}

const styles = StyleSheet.create({
    column: {
      justifyContent: 'space-between',
      alignItems: 'center',
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
    textSecondary: {
        // color: 'secondary.darkGray',
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

export default AssetItem