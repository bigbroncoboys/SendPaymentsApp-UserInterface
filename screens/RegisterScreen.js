import React from 'react';
import {
    View,
} from 'react-native';

import { Container, Content, Text } from 'native-base';

const RegisterScreen = () => {
    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>This is a register page.</Text>
                </View>
            </Content>
        </Container >
    );
}

RegisterScreen.navigationOptions = {
    title: 'Register'
};

export default RegisterScreen