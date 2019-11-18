import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { Container, Button, Content, Text, H1, List, ListItem } from 'native-base';
import Dialog from 'react-native-dialog';

const ItemsScreen = ({ navigation }) => {
    const [itemName, setItemName] = React.useState('');
    const [itemPrice, setItemPrice] = React.useState('');
    const [items, setItems] = React.useState([]);
    const [addItemDialogVisible, setAddItemDialogVisible] = React.useState(false);

    const saveItems = async () => {
        const accountID = await AsyncStorage.getItem('accountID');

        await fetch(`http://sendmoney.dev/items/${accountID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        });

        Alert.alert(
            'Success',
            'Your items have been saved!',
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

    const addItem = () => {
        setItems([...items, { name: itemName, price: itemPrice }]);
        setItemName('');
        setItemPrice('');
    }

    const removeItem = (key) => {
        setItems(items.filter((_, i) => i !== key));
    }

    const listItems = () => {
        return items.map((item, key) => {
            return (
                <ListItem key={key}>
                    <Text>{item.name} - ${item.price}</Text>
                    <Button onPress={() => { removeItem(key) }} light small style={{ position: 'absolute', right: 0 }}><Text>X</Text></Button>
                </ListItem>
            )
        })
    }

    const showAddItemDialog = () => {
        setAddItemDialogVisible(true);
    }

    const hideAddItemDialog = () => {
        setAddItemDialogVisible(false);
    }

    React.useEffect(() => {
        const getInitialItems = async () => {
            const accountID = await AsyncStorage.getItem('accountID');

            const res = await fetch(`http://sendmoney.dev/items/${accountID}`);
            const data = await res.json();

            setItems(data);
        }

        getInitialItems();
    }, []);

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <H1 style={{ fontWeight: 'bold' }}>Items</H1>
                    <Text style={{ fontSize: 15 }}>Add or remove items.</Text>
                </View>

                <View style={{ padding: 10 }}>
                    <List>
                        {listItems()}
                    </List>
                </View>

                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Button light onPress={showAddItemDialog}>
                        <Text>Add New Item</Text>
                    </Button>

                    <Dialog.Container visible={addItemDialogVisible}>
                        <Dialog.Title>Add an Item</Dialog.Title>
                        <Dialog.Input label='Item Name' onChangeText={text => setItemName(text)} value={itemName} />
                        <Dialog.Input label='Item Price (Ex: 6.99)' onChangeText={text => setItemPrice(text)} value={itemPrice} />
                        <Dialog.Button label='Add' onPress={addItem} />
                        <Dialog.Button label='Cancel' onPress={hideAddItemDialog} />
                    </Dialog.Container>
                </View>

                <View style={{ padding: 10 }}>
                    <Button primary style={{ justifyContent: 'center', backgroundColor: '#0a8508' }}
                        onPress={saveItems}>
                        <Text style={{ fontWeight: 'bold' }}>Save</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

ItemsScreen.navigationOptions = {
    title: 'Items',
    headerStyle: {
        backgroundColor: '#0a8508'
    },
    headerTintColor: '#ffffff',
};

export default ItemsScreen