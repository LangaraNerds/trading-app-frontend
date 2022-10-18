import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
} from "native-base";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/action'

const Login = () => {

    const { error } = useSelector(state=>state.auth)

    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        dispatch(login(email, password))
    };

    useEffect(() => {
        if(error){
            alert(error)
            dispatch({ type: "clearError" })
        }

    }, [error, dispatch, alert])

    console.log(error)

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading
                    size="lg"
                    fontWeight="600"
                    color="coolGray.800"
                    _dark={{
                        color: "warmGray.50",
                    }}
                >
                    Welcome
                </Heading>
                <Heading
                    mt="1"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    color="coolGray.600"
                    fontWeight="medium"
                    size="xs"
                >
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            secureTextEntry
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Link
                            _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500",
                            }}
                            alignSelf="flex-end"
                            mt="1"
                        >
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button
                        mt="2"
                        colorScheme="indigo"
                        disabled={!email || !password}
                        onPress={loginHandler}
                    >
                        Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text
                            fontSize="sm"
                            color="coolGray.600"
                            _dark={{
                                color: "warmGray.200",
                            }}
                        >
                            I'm a new user.{" "}
                        </Text>
                        <Link
                            _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm",
                            }}
                            href="#"
                        >
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default Login;