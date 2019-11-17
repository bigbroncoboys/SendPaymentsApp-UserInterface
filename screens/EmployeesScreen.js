import React from 'react';
import { View } from 'react-native';
import { Container, Button, Content, Text, H1, List, ListItem } from 'native-base';
import Dialog from 'react-native-dialog';

const EmployeesScreen = ({ navigation }) => {
    const [employeeName, setEmployeeName] = React.useState('');
    const [employees, setEmployees] = React.useState([]);
    const [addEmployeeDialogVisible, setAddEmployeeDialogVisible] = React.useState(false);

    const saveEmployees = () => {
        // Going to use fetch API here
        navigation.goBack();
    }

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

    React.useEffect(() => {
        const getInitialEmployees = () => {
            // Going to use fetch API here
            // Sample data
            setEmployees(['Henry Smith']);
        }

        getInitialEmployees();
    }, []);

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1>Employees</H1>
                    <Text style={{ fontSize: 12 }}> Add or remove employees.</Text>
                </View>

                <View style={{ padding: 10, paddingTop: 30 }}>
                    <List>
                        {listEmployees()}
                    </List>
                </View>

                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Button block bordered onPress={showAddEmployeeDialog}>
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

                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Button block bordered onPress={saveEmployees}>
                        <Text>Save</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

EmployeesScreen.navigationOptions = {
    title: 'Employees'
};

export default EmployeesScreen