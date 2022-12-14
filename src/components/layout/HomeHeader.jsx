import { Avatar, 
    Stack, 
    Box,
    Text, 
    HStack,
    SearchIcon, 
    InfoIcon, 
    Input,
    Image} from 'native-base'
import { Pressable, StyleSheet} from "react-native";
import NotificationIcon from '../../assets/images/icons/notif-icon.png'
import React from 'react';

const HomeHeader = ({navigation}) => {
    return (
        <Stack>
            <HStack justifyContent={'space-between'} w='100%' justifyItems={'center'} alignItems={'center'}>
                {/* <Avatar size={8} alignSelf={'flex-start'} onPress={() => navigation.navigate('Menu')}/> */}
                <Pressable onPress={() => navigation.navigate('Menu')}>
                    {/* <Avatar size={8} mt={1}/> */}
                    <Image source={require('../../assets/images/icons/menu.png')} alt="menu" />
                </Pressable>
                <Input 
                    placeholder='Looking for a coin?'
                    placeholderTextColor={'secondary.darkGray'}
                    fontSize={'md'}
                    borderRadius={8}
                    borderColor={'primary.field'}
                    focusOutlineColor={'gray.400'}
                    backgroundColor='primary.field'
                    w='70%'
                    h='80%'
                    InputRightElement={
                        <SearchIcon size={5} ml={2} color={'secondary.darkGray'} mr={2}/>
                    }/> 
                <Image alt='notification' source={NotificationIcon} />  
            </HStack>
        </Stack>
    )
// }

	// return (
	// 	<Center>
	// 		<HStack space={2} alignItems="center">
	// 			<Link
	// 				_text={{
	// 					color: "indigo.500",
	// 					fontWeight: "medium",
	// 					fontSize: "sm",
	// 				}}
	// 				onPress={() => navigation.navigate("Menu")}
	// 			>
	// 				Profile
	// 			</Link>
	// 			<Text>Header with icons and input here</Text>
	// 		</HStack>
	// 	</Center>
	// );
};

export default HomeHeader
