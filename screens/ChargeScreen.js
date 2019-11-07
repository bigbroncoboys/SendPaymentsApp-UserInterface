import React from 'react';
import {
    View,
    Alert
} from 'react-native';

import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';
import Divider from 'react-native-divider';
import { PaymentsStripe } from 'expo-payments-stripe';

const ChargeScreen = () => {
<<<<<<< HEAD

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

=======
    const [amount, onChangeAmount] = React.useState('');
>>>>>>> 5fe1630a24a73d112eba487906b90d5ed5dbfae3

    const onPressCharge = () => {
        Alert.alert(
            `Send $${amount}?`,
            '',
            [
                {text: 'Confirm', onPress: () => console.log('Sent!')},
                {text: 'Cancel', onPress: () => console.log('Transaction Cancelled')},
            ],
        );
    }

    return (
        <Container>
            <Content>
                <View style = {{ paddingTop: 200, alignItems: 'center' }}>
                    <H1 style = {{ fontWeight: 'bold' }}>Start sending cash!</H1>
                </View>

                <View style = {{ padding: 50, paddingTop: 25, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>Amount: $</Label>
                        <Input
                            keyboardType = 'decimal-pad'
                            keyboardAppearance = 'dark'
                            placeholder = '00.00'
                            maxLength = {6}
                            onChangeText = {text => onChangeAmount(text)}
                            value = {amount}
                        />
                    </Item>
                </View>

                <View style = {{ padding: 50, paddingTop: 0 }}>
                    <Button primary style = {{justifyContent: 'center', backgroundColor: '#0a8508' }}
                        onPress = {onPressCharge}>
                        <Text style = {{ fontWeight: 'bold' }}>Charge</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

ChargeScreen.navigationOptions = {
    title: 'Charge'
};

export default ChargeScreen