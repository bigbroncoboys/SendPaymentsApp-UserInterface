import React from 'react';
import {
    View,
    Alert
} from 'react-native';

import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';
import Divider from 'react-native-divider';

const ChargeScreen = () => {
    const [amount, onChangeAmount] = React.useState('');

    return (
        <Container>
            <Content>
                <View style={{ paddingTop: 50, alignItems: 'center' }}>
                    <H1>Start sending cash!</H1>
                </View>

                <View style={{ padding: 50, paddingTop: 150, alignItems: 'center' }}>
                    <Item inlineLabel>
                        <Label>Amount: $</Label>
                        <Input
                          keyboardType = 'number-pad'
                          onChangeText = {text => onChangeAmount(text)}
                          value = {amount}
                        />
                    </Item>
                </View>

                <View style={{ padding: 50, paddingTop: 5 }}>
                    <Button primary style={{ justifyContent: 'center' }}><Text>Charge</Text></Button>
                </View>
            </Content>
        </Container>
    );
}

ChargeScreen.navigationOptions = {
    title: 'Charge'
};

export default ChargeScreen