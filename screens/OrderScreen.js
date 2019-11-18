import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Button, Content, Text, H1, List, ListItem } from 'native-base';

const OrderScreen = ({ navigation }) => {
    const [items, setItems] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const increaseQuantity = (key) => {
        const temp = [...items];
        temp[key].quantity += 1;

        setItems(temp);
        updateTotal();
    }

    const decreaseQuantity = (key) => {
        const temp = [...items];
        temp[key].quantity -= 1;

        setItems(temp);
        updateTotal();
    }

    const updateTotal = () => {
        let total = 0;
        items.forEach(item => {
            total += item.price * item.quantity;
        });

        return setTotal(total.toFixed(2));
    }

    const listItems = () => {
        return items.map((item, key) => {
            return (
                <ListItem key = {key}>
                    <Text>{item.name} - ${item.price}</Text>
                    <View style = {{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                        <Button light small onPress = {() => { decreaseQuantity(key) }}><Text>&lt;</Text></Button>
                        <Text> {item.quantity} </Text>
                        <Button light small onPress = {() => { increaseQuantity(key) }}><Text>&gt;</Text></Button>
                    </View>
                </ListItem>
            )
        })
    }

    React.useEffect(() => {
        const getItems = async () => {
            const accountID = await AsyncStorage.getItem('accountID');

            const res = await fetch(`http://149.28.76.219:3000/items/${accountID}`);
            const data = await res.json();

            const initializedItems = [];
            data.forEach(item => {
                initializedItems.push({ name: item.name, price: item.price, quantity: 0 })
            });

            setItems(initializedItems);
        }

        getItems();
    }, []);

    return (
        <Container>
            <Content contentContainerStyle = {{ justifyContent: 'center', flex: 1 }}>
                <View style = {{ padding: 10, alignItems: 'center' }}>
                    <H1 style = {{ fontWeight: 'bold' }}>Order</H1>
                    <Text style = {{ fontSize: 15 }}> Add items to checkout.</Text>
                </View>

                <View style = {{ padding: 10 }}>
                    <List>
                        {listItems()}
                    </List>
                </View>

                <View style = {{ padding: 10, paddingTop: 0, alignItems: 'center' }}>
                    <Text style = {{ fontSize: 20 }}> Total: ${total}</Text>
                </View>

                <View style = {{ padding: 10, paddingTop: 0 }}>
                    <Button style = {{ justifyContent: 'center', backgroundColor: '#0a8508' }}>
                        <Text style = {{ fontWeight: 'bold' }}>Checkout</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

OrderScreen.navigationOptions = {
    title: 'Order',
    headerStyle: {
        backgroundColor: '#0a8508'
    },
    headerTintColor: '#ffffff',
};

export default OrderScreen