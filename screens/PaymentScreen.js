import React from 'react';
import { View, Alert, StatusBar } from 'react-native';
import { Container, Content, Text, H1, Spinner } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { Linking } from 'expo';

const PaymentScreen = ({ navigation }) => {
    const [sessionID, setSessionID] = React.useState('');

    React.useEffect(() => {
        const createSessionID = async () => {
            const checkoutItems = [];

            for (const item of navigation.state.params.items) {
                if (item.quantity > 0) {
                    checkoutItems.push({ name: item.name, amount: item.price * 100, currency: 'usd', quantity: item.quantity });
                }
            }

            const res = await fetch('https://sendmoney.dev/api/charge/createCheckout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ checkoutItems })
            });

            const data = await res.json();

            setSessionID(data.session_id);
        }

        createSessionID();
    }, []);

    React.useEffect(() => {
        const checkForPayment = setInterval(async () => {
            const res = await fetch(`https://sendmoney.dev/api/charge/checkPayment?session_id=${sessionID}`);
            const data = await res.json();

            if (data.processed) {
                clearInterval(checkForPayment);

                Alert.alert(
                    'Success',
                    'Payment has been received!',
                    [
                        {
                            text: 'OK', onPress: () => {
                                navigation.navigate('Home');
                            }
                        }
                    ],
                    { cancelable: false },
                );
            }
        }, 2000)

        return () => {
            clearInterval(checkForPayment);
        }

    }, [sessionID])

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <StatusBar backgroundColor = '#ffffff' barStyle = 'dark-content' />
                <View style={{ alignItems: 'center' }}>
                    <H1 style={{ fontWeight: 'bold' }}>Payment</H1>
                    <Spinner color='#0a8508' />
                    <Text style={{ fontSize: 15 }}>Waiting for payment to be received...</Text>
                </View>
                {
                    sessionID !== '' &&
                    (
                        <View style={{ paddingTop: 20, alignItems: 'center' }}>
                            <QRCode
                                value={`https://sendmoney.dev/payment?session_id=${sessionID}`}
                                size={300}
                            />

                            <Text style={{ padding: 10, fontSize: 11, color: 'grey' }} onPress={() => Linking.openURL(`https://sendmoney.dev/payment?session_id=${sessionID}`)}>Click here to open payment page.</Text>
                        </View>
                    )
                }
            </Content>
        </Container>
    );
}

PaymentScreen.navigationOptions = {
    title: 'Payment',
    headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0
    },
    headerTintColor: '#000000',
};

export default PaymentScreen
