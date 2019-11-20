import React from 'react';
import { View, Alert } from 'react-native';
import { Container, Button, Content, Text, H1, H3, Item, Input, Label, Spinner } from 'native-base';
import QRCode from 'react-native-qrcode-svg';

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

            const res = await fetch('http://sendmoney.dev/api/charge/createCheckout', {
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
            const res = await fetch(`http://sendmoney.dev/api/charge/checkPayment?session_id=${sessionID}`);
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
                <View style={{ alignItems: 'center' }}>
                    <H1 style={{ fontWeight: 'bold' }}>Payment</H1>
                    <Spinner color='#0a8508' />
                    <Text style={{ fontSize: 15 }}>Waiting for payment to be received...</Text>
                </View>

                <View style={{ paddingHorizontal: 10, paddingTop: 20, alignItems: 'center' }}>
                    {
                        sessionID !== '' &&
                        <QRCode
                            value={`http://sendmoney.dev/payment?session_id=${sessionID}`}
                            size={300}
                        />
                    }
                </View>
            </Content>
        </Container>
    );
}

PaymentScreen.navigationOptions = {
    title: 'Payment',
    headerStyle: {
        backgroundColor: '#0a8508'
    },
    headerTintColor: '#ffffff',
};

export default PaymentScreen
