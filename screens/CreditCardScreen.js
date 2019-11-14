import React from 'react';
import { View, Alert } from 'react-native';

import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';

const CreditCardScreen = () => {

    var cardToken;

    var stripe = require("stripe-client")("sk_test_XfSN5Jg519ofs2eCCZny9bUg000Vt1SumR");

    const [CreditCard, onChangeCreditCard] = React.useState('');
    const [ExpMonth, onChangeExpMonth] = React.useState('');
    const [ExpYear, onChangeExpYear] = React.useState('');
    const [CVC, onChangeCVC] = React.useState('');
    const [Name, onChangeName] = React.useState('');

    var information = {
        number: CreditCard,
        exp_month: ExpMonth,
        exp_year: ExpYear,
        cvc: CVC,
        name: Name
    }

    var customer = {
        person: {
            name:Name,
            relationship: {owner: true},
        },
    }

    async function onPressConfirm() {
        const response = await fetch('http://localhost:3000');
        const myJson = await response.json();
        console.log(JSON.stringify(myJson));
        //var card = await stripe.createToken(information);
        //var token = card.id;
        //call Backend
        //const response = await fetch ('http://localhost:3000/app.js');
        /*
        const formData = new FormData();
        formData.append('Card Information', information);

        try {
            const response = await fetch('https://localhost:3000/', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            console.log('Success:', JSON.stringify(result));
        } catch (error) {
            console.error('Error:', error);
        }

         */
    }

    return (
        <Container>
            <Content contentContainerStyle = {{ justifyContent: 'center', flex: 1 }}>
                <View style = {{ paddingTop: 0, alignItems: 'center' }}>
                    <H1 style = {{ fontWeight: 'bold' }}>Credit Card Information</H1>
                </View>

                <View style = {{ padding: 10, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>Name on Card:</Label>
                        <Input
                            keyboardAppearance = 'dark'
                            onChangeText = {text => onChangeName(text)}
                            value = {Name}
                        />
                    </Item>
                </View>

                <View style = {{ padding: 10, alignItems: 'center' }}>
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

                <View style = {{ padding: 10, alignItems: 'center' }}>
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

                <View style = {{ padding: 10, paddingTop: 0 }}>
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
    title: 'CreditCard'
};

export default CreditCardScreen
