import React from 'react';
import { View, Alert } from 'react-native';

import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';
import { amount } from '../screens/ChargeScreen';

const CreditCardScreen = () => {

    var stripe = require("stripe-client")("pk_test_xInOIuq3RafRlvHBKB51I2gi00pgXQ2TKj");

    const [CreditCard, onChangeCreditCard] = React.useState('');
    const [ExpMonth, onChangeExpMonth] = React.useState('');
    const [ExpYear, onChangeExpYear] = React.useState('');
    const [CVC, onChangeCVC] = React.useState('');
    const [Name, onChangeName] = React.useState('');

    var information = {
        card: {
            number: CreditCard,
            exp_month: ExpMonth,
            exp_year: ExpYear,
            cvc: CVC,
            name: Name
        }

    }

    var testInfo = {
        card: {
            number: '4242424242424242',
            exp_month: '10',
            exp_year: '25',
            cvc: '123',
            name: 'John Doe'
        }
    }

    async function onPressConfirm() {
        var card = await stripe.createToken(testInfo);
        var token = card.id;

        console.log(card);
        //call Backend

        const formData = {
            tok: token,
            amt: amount,
        };

        try {
            const response = await fetch('http://fe89c387.ngrok.io' +
                '', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response;
            console.log('Success:');
        } catch (error) {
            console.error('Error:', error);
        }


    }

    return (
        <Container>
            <Content contentContainerStyle = {{ justifyContent: 'center', flex: 1 }}>
                <View style = {{ alignItems: 'center' }}>
                    <H1 style = {{ fontWeight: 'bold' }}>Credit Card Information</H1>
                </View>

                <View style = {{ paddingHorizontal: 10, paddingTop: 20, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>Name on Card:</Label>
                        <Input
                            keyboardAppearance = 'dark'
                            onChangeText = {text => onChangeName(text)}
                            value = {Name}
                        />
                    </Item>
                </View>

                <View style = {{ paddingHorizontal: 10, paddingTop: 10, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>Number:</Label>
                        <Input
                            keyboardType = 'number-pad'
                            keyboardAppearance = 'dark'
                            maxLength = {16}
                            onChangeText = {text => onChangeCreditCard(text)}
                            value = {CreditCard}
                        />
                    </Item>
                </View>

                <View style = {{ flexDirection: 'row', padding: 10 }}>
                    <View style = {{ flex: 1, paddingRight: 5, alignItems: 'center' }}>
                        <Item inlineLabel>
                            <Label>Month:</Label>
                            <Input
                                keyboardType = 'number-pad'
                                keyboardAppearance = 'dark'
                                maxLength = {2}
                                onChangeText = {text => onChangeExpMonth(text)}
                                value = {ExpMonth}
                            />
                        </Item>
                    </View>

                    <View style = {{ flex: 1, paddingLeft: 5, alignItems: 'center' }}>
                        <Item inlineLabel>
                            <Label>Year:</Label>
                            <Input
                                keyboardType = 'number-pad'
                                keyboardAppearance = 'dark'
                                maxLength = {2}
                                onChangeText = {text => onChangeExpYear(text)}
                                value = {ExpYear}
                            />
                        </Item>
                    </View>
                </View>

                <View style = {{ paddingHorizontal: 10, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>CVC:</Label>
                        <Input
                            keyboardType = 'number-pad'
                            keyboardAppearance = 'dark'
                            maxLength = {3}
                            onChangeText = {text => onChangeCVC(text)}
                            value = {CVC}
                        />
                    </Item>
                </View>

                <View style = {{ padding: 10, paddingTop: 20 }}>
                    <Button primary style = {{justifyContent: 'center', backgroundColor: '#0a8508' }}
                            onPress = {onPressConfirm}>
                        <Text style = {{ fontWeight: 'bold' }}>Confirm</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );


}

CreditCardScreen.navigationOptions = {
    title: 'Credit Card',
    headerStyle: {
        backgroundColor: '#0a8508'
    },
    headerTintColor: '#ffffff',
};

export default CreditCardScreen
