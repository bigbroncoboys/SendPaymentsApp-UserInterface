import React from 'react';
import { View, Alert } from 'react-native';
import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';
import Divider from 'react-native-divider';

const ChargeScreen = ({ navigation }) => {



    const [amount, onChangeAmount] = React.useState('');

    const onPressCharge = () => {
        Alert.alert(
            `Send $${amount}?`,
            '',
            [
                {text: 'Confirm', onPress: () => navigation.navigate('CreditCard')},
                {text: 'Cancel', onPress: () => console.log('Transaction Cancelled')},
            ],
        );
    }

    const onPressConfirm = () => {
        navigation.navigate('CreditCard');
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