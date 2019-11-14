import React from 'react';
import { View } from 'react-native';
import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';
import Divider from 'react-native-divider';


const RegisterScreen = () => {
    const [businessType, onChangeBusinessType] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    return (
        <Container>
            <Content>
                <View style = {{ alignItems: 'center', paddingTop: 30 }}>
                    <H1>Welcome to the POS!</H1>
                    <Text style = {{ fontSize: 12 }}>Please describe your business.</Text>
                </View>

                <View style = {{ padding: 10, paddingTop: 30 }}>
                    <Divider><H3 style = {{ fontWeight: 'bold' }}>Credentials</H3></Divider>

                    <Item inlineLabel>
                        <Label>Email:</Label>
                        <Input onChangeText = {text => onChangeEmail(text)} value = {email} />
                    </Item>

                    <Item inlineLabel last>
                        <Label>Password:</Label>
                        <Input onChangeText = {text => onChangePassword(text)} value = {password} />
                    </Item>
                </View>

                <View style = {{ padding: 10, paddingTop: 20 }}>
                    <Divider><H3 style = {{ fontWeight: 'bold' }}>About Your Business</H3></Divider>

                    <Item inlineLabel>
                        <Label>Business Name:</Label>
                        <Input />
                    </Item>

                    <Item inlineLabel>
                        <Label>Business Address:</Label>
                        <Input />
                    </Item>

                    <Item inlineLabel picker>
                        <Label>Type of Business:</Label>
                        <Picker
                            mode = 'dropdown'
                            iosIcon = {<Icon name = 'arrow-down' />}
                            placeholder = 'Select Type'
                            placeholderStyle = {{ color: '#bfc6ea' }}
                            placeholderIconColor = '#007aff'
                            onValueChange = {val => onChangeBusinessType(val)}
                            selectedValue = {businessType}
                        >
                            <Picker.Item label = 'Restaurant' value = 'key0' />
                            <Picker.Item label = 'Salon' value = 'key1' />
                            <Picker.Item label = 'Repair Shop' value = 'key2' />
                            <Picker.Item label = 'Convenience Store' value = 'key3' />
                        </Picker>
                    </Item>
                </View>

                <View style = {{ padding: 10, paddingTop: 20 }}>
                    <Divider><H3 style = {{ fontWeight: 'bold' }}>Employees</H3></Divider>
                    <List>
                        <ListItem>
                            <Text>Simon Mignolet</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Nathaniel Clyne</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                    </List>
                </View>

                <View style = {{ flexDirection: 'row', padding: 10, justifyContent: 'flex-end' }}>
                    <Button info style = {{ backgroundColor: '#4c614c' }}>
                        <Text>Add New Employee</Text>
                    </Button>
                </View>

                <View style = {{ padding: 10 }}>
                    <Button primary style = {{ justifyContent: 'center', backgroundColor: '#0a8508' }}>
                        <Text>Continue</Text>
                    </Button>
                </View>
            </Content>
        </Container >
    );
}

RegisterScreen.navigationOptions = {
    title: 'Register'
};

export default RegisterScreen