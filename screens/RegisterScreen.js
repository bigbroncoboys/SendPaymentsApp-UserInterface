import React from 'react';
import { View } from 'react-native';
import { Container, Button, Content, Text, H1, H3, Item, Input, Label, List, ListItem, Picker, Icon } from 'native-base';
import Divider from 'react-native-divider';
import Dialog from 'react-native-dialog';

const RegisterScreen = () => {
    const [businessType, setBusinessType] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [employeeName, setEmployeeName] = React.useState('');
    const [employees, setEmployees] = React.useState([]);
    const [addEmployeeDialogVisible, setAddEmployeeDialogVisible] = React.useState(false);

    const addEmployee = () => {
        setEmployees([...employees, employeeName]);
        setEmployeeName('');
    }

    const removeEmployee = (key) => {
        setEmployees(employees.filter((_, i) => i !== key));
    }

    const listEmployees = () => {
        return employees.map((employee, key) => {
            return (
                <ListItem key={key}>
                    <Text>{employee}</Text>
                    <Button onPress={() => { removeEmployee(key) }} bordered small style={{ position: 'absolute', right: 0 }}><Text>X</Text></Button>
                </ListItem>
            )
        })
    }

    const showAddEmployeeDialog = () => {
        setAddEmployeeDialogVisible(true);
    }

    const hideAddEmployeeDialog = () => {
        setAddEmployeeDialogVisible(false);
    }

    return (
        <Container>
            <Content>
                <View style={{ alignItems: 'center', paddingTop: 30 }}>
                    <H1>Welcome to the POS!</H1>
                    <Text style={{ fontSize: 12 }}>Please describe your business.</Text>
                </View>

                <View style={{ padding: 10, paddingTop: 30 }}>
                    <Divider><H3 style={{ fontWeight: 'bold' }}>Credentials</H3></Divider>

                    <Item inlineLabel>
                        <Label>Email:</Label>
                        <Input onChangeText={text => setEmail(text)} value={email} />
                    </Item>

                    <Item inlineLabel last>
                        <Label>Password:</Label>
                        <Input onChangeText={text => setPassword(text)} value={password} />
                    </Item>
                </View>

                <View style={{ padding: 10, paddingTop: 20 }}>
                    <Divider><H3 style={{ fontWeight: 'bold' }}>About Your Business</H3></Divider>

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

                <View style={{ padding: 10, paddingTop: 20 }}>
                    <Divider><H3 style={{ fontWeight: 'bold' }}>Employees</H3></Divider>
                    <List>
                        {listEmployees()}
                    </List>
                </View>

                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'flex-end' }}>
                    <Button info onPress={showAddEmployeeDialog} style={{ backgroundColor: '#4c614c' }}>
                        <Text>Add New Employee</Text>
                    </Button>

                    <Dialog.Container visible={addEmployeeDialogVisible}>
                        <Dialog.Title>Add an Employee</Dialog.Title>
                        <Dialog.Description>
                            Please enter the employee's name.
                        </Dialog.Description>
                        <Dialog.Input onChangeText={text => setEmployeeName(text)} value={employeeName} />
                        <Dialog.Button label='Add' onPress={addEmployee} />
                        <Dialog.Button label='Cancel' onPress={hideAddEmployeeDialog} />
                    </Dialog.Container>
                </View>

                <View style={{ padding: 10 }}>
                    <Button primary style={{ justifyContent: 'center', backgroundColor: '#0a8508' }}>
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