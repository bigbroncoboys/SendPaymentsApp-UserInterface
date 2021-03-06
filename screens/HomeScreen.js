import React from 'react';
import { View, AsyncStorage, StatusBar } from 'react-native';
import { Container, Content, Button, Icon, Text, Thumbnail, H1 } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

const HomeScreen = ({ navigation }) => {
    const [businessName, setBusinessName] = React.useState('');

    const navigateCharge = () => {
        navigation.navigate('Charge');
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

            const res = await fetch(`https://sendmoney.dev/api/info/${accountID}`);
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
                <StatusBar backgroundColor = '#ffffff' barStyle = 'dark-content' />
                <View style={{ alignItems: 'center' }}>
                    <Thumbnail circle large source = {require('../assets/images/defaultuser.jpg')}/>
                    <H1 style={{ fontWeight: 'bold' }}>{businessName}</H1>
                    <Text style={{ fontSize: 15 }}>What would you like to do?</Text>
                </View>

                <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
                    <Button light style={{ justifyContent: 'center' }}
                        onPress={navigateCharge}>
                        <Icon name='md-cart' />
                        <Text>Charge</Text>
                    </Button>
                </View>

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <Button light style={{ justifyContent: 'center' }}
                            onPress={navigateEmployees}>
                            <Icon name='md-people' />
                            <Text>Employees</Text>
                        </Button>
                    </View>

                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <Button light style={{ justifyContent: 'center' }}
                            onPress={navigateItems}>
                            <Icon name='md-archive' />
                            <Text>Items</Text>
                        </Button>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                    <Button light style={{ justifyContent: 'center' }}
                        onPress={navigateSettings}>
                        <Icon name='cog' />
                        <Text>Settings</Text>
                    </Button>
                </View>

                <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                    <Button style={{ justifyContent: 'center', backgroundColor: '#0a8508' }}
                        onPress={logout}>
                        <Text style={{ fontWeight: 'bold' }}>Logout</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

HomeScreen.navigationOptions = {
    title: 'Home',
    headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0
    },
    headerTintColor: '#000000',
};

export default HomeScreen