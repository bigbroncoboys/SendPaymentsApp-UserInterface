import React from 'react';
import {
    View,
    Alert
} from 'react-native';

import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';
import Divider from 'react-native-divider';
import { PaymentsStripe } from 'expo-payments-stripe';

const ChargeScreen = () => {

    const { Stripe } = PaymentsStripe;

    Stripe.setOptionsAsync({
        publishableKey: 'pk_test_xInOIuq3RafRlvHBKB51I2gi00pgXQ2TKj', // Your key
        androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
        merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });

    const params = {
        // mandatory
        number: '4242424242424242',
        expMonth: 11,
        expYear: 17,
        cvc: '223',
        // optional
        name: 'Test User',
        currency: 'usd',
        addressLine1: '123 Test Street',
        addressLine2: 'Apt. 5',
        addressCity: 'Test City',
        addressState: 'Test State',
        addressCountry: 'Test Country',
        addressZip: '55555',
    };

    const token = stripe.createTokenWithCardAsync(params);

    const options = {
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
            billingAddress: {
                name: 'Gunilla Haugeh',
                line1: 'Canary Place',
                line2: '3',
                city: 'Macon',
                state: 'Georgia',
                country: 'US',
                postalCode: '31217',
            },
        },
    };

    const token2 = stripe.paymentRequestWithCardFormAsync(options);


    return (
        <Container>
            <Content>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1>Start sending cash!</H1>
                </View>

                <View style={{ padding: 10 }}>
                    <Button primary style={{ justifyContent: 'center' }}><Text>Charge</Text></Button>
                </View>
            </Content>
        </Container >
    );
}

ChargeScreen.navigationOptions = {
    title: 'Charge'
};

export default ChargeScreen