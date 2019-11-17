import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';

const SettingScreen = ({ navigation }) => {
    const [businessName, setBusinessName] = React.useState('');
    const [businessAddress, setBusinessAddress] = React.useState('');
    const [businessType, setBusinessType] = React.useState('');

    const saveSettings = async () => {
        const accountID = await AsyncStorage.getItem('accountID');

        await fetch(`http://149.28.76.219:3000/info/${accountID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ businessName, businessAddress, businessType })
        });

        Alert.alert(
            'Success',
            'Your settings have been saved!',
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

    React.useEffect(() => {
        const getInitialAccountInfo = async () => {
            const accountID = await AsyncStorage.getItem('accountID');

            const res = await fetch(`http://149.28.76.219:3000/info/${accountID}`);
            const data = await res.json();

            setBusinessName(data.businessName);
            setBusinessAddress(data.businessAddress);
            setBusinessType(data.businessType);
        }

        getInitialAccountInfo();
    }, []);

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1>Settings</H1>
                    <Text style={{ fontSize: 12 }}> Change your account settings here.</Text>
                </View>

                <View style={{ padding: 10, paddingTop: 30 }}>
                    <Item inlineLabel>
                        <Label>Business Name:</Label>
                        <Input onChangeText={text => setBusinessName(text)} value={businessName} />
                    </Item>

                    <Item inlineLabel>
                        <Label>Business Address:</Label>
                        <Input onChangeText={text => setBusinessAddress(text)} value={businessAddress} />
                    </Item>

                    <Item inlineLabel picker>
                        <Label>Type of Business:</Label>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name='arrow-down' />}
                            placeholder='Select Type'
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor='#007aff'
                            onValueChange={val => setBusinessType(val)}
                            selectedValue={businessType}
                        >
                            <Picker.Item label='Restaurant' value='Restaurant' />
                            <Picker.Item label='Salon' value='Salon' />
                            <Picker.Item label='Repair Shop' value='Repair Shop' />
                            <Picker.Item label='Convenience Store' value='Convenience Store' />
                        </Picker>
                    </Item>
                </View>

                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Button block bordered onPress={saveSettings}>
                        <Text>Save</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

SettingScreen.navigationOptions = {
    title: 'Settings'
};

export default SettingScreen