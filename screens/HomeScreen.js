import React from 'react';
import {
    View,
    Alert
} from 'react-native';

import { Container, Content, Item, Label, Input, Button, Text, H1 } from 'native-base';

const HomeScreen = ({ navigation }) => {

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const onPressSignIn = () => {
        Alert.alert(`Email: ${email}\nPassword: ${password}`);
    }

    const onPressSignUp = () => {
        navigation.navigate('Register');
    }

    const onPressForgotPassword = () => {
        Alert.alert('You have pressed the forgot password button.');
    }

    const onPressCharge = () => {
        navigation.navigate('Charge');
    }

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1>Account Credentials</H1>
                </View>

                <View style={{ padding: 10 }}>
                    <Item inlineLabel>
                        <Label>Email:</Label>
                        <Input onChangeText={text => onChangeEmail(text)} value={email} />
                    </Item>

                    <Item inlineLabel last>
                        <Label>Password:</Label>
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

                <View style={{ padding: 10, paddingTop: -10 }}>
                    <Button light style={{ justifyContent: 'center' }} onPress={onPressCharge}><Text>Charge</Text></Button>
                </View>
            </Content>
        </Container>
    );
}

HomeScreen.navigationOptions = {
    title: 'Sign In'
};

export default HomeScreen