import React from 'react';
import { View } from 'react-native';
import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';

const SettingScreen = ({ navigation }) => {
    const [businessName, setBusinessName] = React.useState('');
    const [businessAddress, setBusinessAddress] = React.useState('');
    const [businessType, setBusinessType] = React.useState('');

    const saveSettings = () => {
        // Going to use fetch API here
        navigation.goBack();
    }

    React.useEffect(() => {
        const getInitialAccountInfo = () => {
            // Going to use fetch API here
            // Sample data
            setBusinessName("Joe's Restaurant");
            setBusinessAddress('123 Street');
            setBusinessType('key0');
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
                            <Picker.Item label='Restaurant' value='key0' />
                            <Picker.Item label='Salon' value='key1' />
                            <Picker.Item label='Repair Shop' value='key2' />
                            <Picker.Item label='Convenience Store' value='key3' />
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
    title: 'Home'
};

export default SettingScreen