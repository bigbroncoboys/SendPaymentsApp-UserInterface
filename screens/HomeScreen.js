import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Content, Button, Text, H1 } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

const HomeScreen = ({ navigation }) => {
    const [businessName, setBusinessName] = React.useState('');

    const navigateOrder = () => {
        navigation.navigate('Order');
    }

    const navigateItems = () => {
        navigation.navigate('Items');
    }

    const navigateSettings = () => {
        navigation.navigate('Settings');
    }

    const navigateEmployees = () => {
        navigation.navigate('Employees');
    }

    const logout = () => {
        navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        }));
    }

    React.useEffect(() => {
        const getAccountInfo = async () => {
            const accountID = await AsyncStorage.getItem('accountID');

            const res = await fetch(`http://149.28.76.219:3000/info/${accountID}`);
            const data = await res.json();

            setBusinessName(data.businessName);
        }

        getAccountInfo();

        navigation.addListener(
            'willFocus',
            () => {
                getAccountInfo();
            }
        );
    }, []);

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1>{businessName}</H1>
                    <Text style={{ fontSize: 12 }}> What would you like to do?</Text>
                </View>

                <View style={{ padding: 10, paddingTop: 30 }}>
                    <Button bordered onPress={navigateOrder} style={{ justifyContent: 'center' }}>
                        <Text>Order</Text>
                    </Button>
                </View>

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <Button bordered onPress={navigateEmployees} style={{ justifyContent: 'center' }}>
                            <Text>Employees</Text>
                        </Button>
                    </View>

                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <Button bordered onPress={navigateItems} style={{ justifyContent: 'center' }}>
                            <Text>Items</Text>
                        </Button>
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <Button bordered onPress={navigateSettings} style={{ justifyContent: 'center' }}>
                        <Text>Settings</Text>
                    </Button>
                </View>

                <View style={{ padding: 10 }}>
                    <Button onPress={logout} style={{ justifyContent: 'center' }}>
                        <Text>Logout</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

HomeScreen.navigationOptions = {
    title: 'Home'
};

export default HomeScreen