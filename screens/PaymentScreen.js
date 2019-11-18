import React from 'react';
import { View, Alert } from 'react-native';

import { Container, Button, Content, Text, H1, H3, Item, Input, Label } from 'native-base';

const PaymentScreen = ({ navigation }) => {
    const [cardNumber, setCardNumber] = React.useState('4242424242424242');
    const [cardExpMonth, setCardExpMonth] = React.useState('11');
    const [cardExpYear, setCardExpYear] = React.useState('2020');
    const [cardCVC, setCardCVC] = React.useState('314');

    const processPayment = async () => {
        const res = await fetch('http://149.28.76.219/charge/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardNumber, cardExpMonth, cardExpYear, cardCVC, amount: navigation.state.params.amount * 100 })
        });

        const data = await res.json();

        if (data.success === true) {
            Alert.alert(
                'Success',
                'Payment has been processed!',
                [
                    {
                        text: 'OK', onPress: () => {
                            navigation.navigate('Home');
                        }
                    }
                ],
                { cancelable: false },
            );
        } else {
            Alert.alert(
                'Error',
                'Payment could not be processed! Please try again.',
                [
                    {
                        text: 'OK'
                    }
                ],
                { cancelable: false },
            );
        }
    }

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <H1 style={{ fontWeight: 'bold' }}>Card Information</H1>
                </View>

                <View style={{ paddingHorizontal: 10, paddingTop: 20, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>Card Number:</Label>
                        <Input
                            keyboardType='number-pad'
                            keyboardAppearance='dark'
                            maxLength={16}
                            onChangeText={text => setCardNumber(text)}
                            value={cardNumber}
                        />
                    </Item>
                </View>

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 1, paddingRight: 5, alignItems: 'center' }}>
                        <Item inlineLabel>
                            <Label>Month:</Label>
                            <Input
                                keyboardType='number-pad'
                                keyboardAppearance='dark'
                                maxLength={2}
                                onChangeText={text => setCardExpMonth(text)}
                                value={cardExpMonth}
                            />
                        </Item>
                    </View>

                    <View style={{ flex: 1, paddingLeft: 5, alignItems: 'center' }}>
                        <Item inlineLabel>
                            <Label>Year:</Label>
                            <Input
                                keyboardType='number-pad'
                                keyboardAppearance='dark'
                                maxLength={2}
                                onChangeText={text => setCardExpYear(text)}
                                value={cardExpYear}
                            />
                        </Item>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>CVC:</Label>
                        <Input
                            keyboardType='number-pad'
                            keyboardAppearance='dark'
                            maxLength={3}
                            onChangeText={text => setCardCVC(text)}
                            value={cardCVC}
                        />
                    </Item>
                </View>

                <View style={{ paddingTop: 20, alignItems: 'center' }}>
                    <H3 style={{ alignItems: 'center' }}>You will be billed ${navigation.state.params.amount}!</H3>
                </View>

                <View style={{ padding: 10, paddingTop: 20 }}>
                    <Button primary style={{ justifyContent: 'center', backgroundColor: '#0a8508' }}
                        onPress={processPayment}>
                        <Text style={{ fontWeight: 'bold' }}>Process Payment</Text>
                    </Button>
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
