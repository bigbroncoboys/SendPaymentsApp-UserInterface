import React from 'react';
import { View, Alert } from 'react-native';

import { Container, Button, Content, Text, H1, H3, Item, Input, Label } from 'native-base';


//import QRCode from 'react-native-qrcode-svg';
import { QRCode } from 'react-native-custom-qr-codes-expo';

const QRCodeScreen = ({ navigation }) => {

        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        <QRCode content='https://reactnative.com'
                            size = {50}
                            padding = {1}
                            color = "black"/>
                    </View>
                </Content>
            </Container>
        );
};

QRCodeScreen.navigationOptions = {
    title: 'QRCode',
    headerStyle: {
        backgroundColor: '#0a8508'
    },
    headerTintColor: '#ffffff',
};

export default QRCodeScreen