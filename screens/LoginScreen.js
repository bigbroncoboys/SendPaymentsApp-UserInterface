import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { Container, Content, Item, Label, Input, Button, Text, H1 } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

const LoginScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const signIn = async () => {
        const res = await fetch('http://149.28.76.219:3000/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success === true) {
            await AsyncStorage.setItem('accountID', data.accountID.toString());

            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                ],
            }));
        } else {
            Alert.alert(
                'Error',
                'Your email or password is incorrect!',
                [
                    {
                        text: 'OK'
                    }
                ],
                { cancelable: false },
            );
        }
    }

    const navigateRegister = () => {
        navigation.navigate('Register');
    }

    const navigateCharge = () => {
        navigation.navigate('Charge');
    }

    const onPressForgotPassword = () => {
        Alert.alert('You have pressed the forgot password button.');
    }

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1 style={{ fontWeight: 'bold' }}>Account Credentials</H1>
                </View>

                <View style={{ padding: 10 }}>
                    <Item inlineLabel>
                        <Label>Email:</Label>
                        <Input
                            keyboardAppearance='dark'
                            onChangeText={text => onChangeEmail(text)}
                            value={email}
                        />
                    </Item>

                    <Item inlineLabel last>
                        <Label>Password:</Label>
                        <Input
                            secureTextEntry={true}
                            textContentType='password'
                            keyboardAppearance='dark'
                            onChangeText={text => onChangePassword(text)}
                            value={password}
                        />
                    </Item>
                </View>

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <Button primary style={{ justifyContent: 'center', backgroundColor: '#0a8508' }}
                            onPress={signIn}>
                            <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
                        </Button>
                    </View>

                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <Button info style={{ justifyContent: 'center', backgroundColor: '#4c614c' }}
                            onPress={navigateRegister}>
                            <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
                        </Button>
                    </View>
                </View>

                <View style={{ padding: 10, paddingTop: -5 }}>
                    <Button light style={{ justifyContent: 'center' }}
                        onPress={onPressForgotPassword}>
                        <Text>Forgot Password</Text>
                    </Button>
                </View>

                <View style={{ padding: 10, paddingTop: -10 }}>
                    <Button light style={{ justifyContent: 'center' }}
                        onPress={navigateCharge}>
                        <Text>[PH]Charge Page</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

LoginScreen.navigationOptions = {
    title: 'Sign In'
};

export default LoginScreen