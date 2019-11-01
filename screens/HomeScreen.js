import React from 'react';
import {
    Image,
    View,
    Alert
} from 'react-native';

import { Container, Header, Title, Content, Item, Label, Input, Button, Left, Right, Body, Text } from 'native-base';

export default function HomeScreen() {
    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const onPressSignIn = () => {
        Alert.alert(`Username: ${username}\nPassword: ${password}`);
    }

    const onPressSignUp = () => {
        Alert.alert('You have pressed the sign up button.');
    }

    const onPressForgotPassword = () => {
        Alert.alert('You have pressed the forgot password button.');
    }

    return (
        <Container>
            <Header>
                <Left />
                <Body>
                    <Title>Sign In</Title>
                </Body>
                <Right />
            </Header>

            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/images/billy_bronco.png')} />
                </View>

                <View style={{ padding: 10 }}>
                    <Item inlineLabel>
                        <Label>Username</Label>
                        <Input onChangeText={text => onChangeUsername(text)} value={username} />
                    </Item>
                    <Item inlineLabel last>
                        <Label>Password</Label>
                        <Input onChangeText={text => onChangePassword(text)} value={password} />
                    </Item>
                </View>

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <Button primary style={{ justifyContent: 'center' }} onPress={onPressSignIn}><Text>Sign In</Text></Button>
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <Button info style={{ justifyContent: 'center' }} onPress={onPressSignUp}><Text>Sign Up</Text></Button>
                    </View>
                </View>

                <View style={{ padding: 10, paddingTop: -5 }}>
                    <Button light style={{ justifyContent: 'center' }} onPress={onPressForgotPassword}><Text>Forgot Password</Text></Button>
                </View>
            </Content>
        </Container >
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

