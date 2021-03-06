import React from 'react';
import { View, Alert, AsyncStorage, StatusBar } from 'react-native';
import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';

const SettingScreen = ({ navigation }) => {
    const [businessName, setBusinessName] = React.useState('');
    const [businessAddress, setBusinessAddress] = React.useState('');
    const [businessType, setBusinessType] = React.useState('');

    const saveSettings = async () => {
        const accountID = await AsyncStorage.getItem('accountID');

        await fetch(`https://sendmoney.dev/api/info/${accountID}`, {
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

            const res = await fetch(`https://sendmoney.dev/api/info/${accountID}`);
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
                <StatusBar backgroundColor = '#ffffff' barStyle = 'dark-content' />
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1 style={{ fontWeight: 'bold' }}>Settings</H1>
                    <Text style={{ fontSize: 15 }}> Change your account settings here.</Text>
                </View>

                <View style={{ padding: 10 }}>
                    <Item inlineLabel>
                        <Label>Business Name:</Label>
                        <Input
                            onChangeText={text => setBusinessName(text)}
                            value={businessName}
                        />
                    </Item>

                    <Item inlineLabel>
                        <Label>Business Address:</Label>
                        <Input
                            onChangeText={text => setBusinessAddress(text)}
                            value={businessAddress}
                        />
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

                <View style={{ padding: 10 }}>
                    <Button primary style={{ justifyContent: 'center', backgroundColor: '#0a8508' }}
                        onPress={saveSettings}>
                        <Text style={{ fontWeight: 'bold' }}>Save</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

SettingScreen.navigationOptions = {
    title: 'Settings',
    headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0
    },
    headerTintColor: '#000000',
};

export default SettingScreen