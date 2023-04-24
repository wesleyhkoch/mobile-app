import React, { useEffect, useState } from 'react';

import { Button, InformationCard } from '../../components';

import { View, Text, ScrollView, TouchableOpacity, Image, ToastAndroid } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS, Items } from '../../database/Database';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Header,
  HeaderText,
  PriceInformation,
  TaxSection,
  TaxTitle,
  TaxValue,
  Title,
  TopicSection,
  TopicTitle,
  TotalSection,
  TotalTitle,
  TotalValue,
} from './styles';

import { Product } from '../../types/index';
import { ModalComponent } from '../../components/Modal';

export const MyCart = ({ navigation }: any) => {
  const [product, setProduct] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const [numberItems, setNumberItems] = useState<number>(1);
  const [informations, setInformations] = useState({
    country: '',
    state: '',
    city: '',
    neighborhood: '',
    address: '',
    complement: '',
  });

  useEffect(() => {
    const unsubsribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubsribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    let items = (await AsyncStorage.getItem('cartItems')) as any;
    items = JSON.parse(items);
    let productData: any = [];
    if (items !== null) {
      Items.forEach((data: any) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });

      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal([]);
    }
  };

  console.log(informations);

  const getTotal = (productData: Product[]) => {
    let total = 0;
    for (let i = 0; i < productData.length; i++) {
      let productPrice = productData[i].productPrice;
      total = total + productPrice;
    }

    setTotal(total);
  };

  const removeItemFromCart = async (id: number) => {
    let itemArray = (await AsyncStorage.getItem('cartItems')) as any;
    itemArray = JSON.parse(itemArray);
    if (itemArray !== null) {
      let array = itemArray;
      for (let i = 0; i < array.length; i++) {
        if (array[i] == id) {
          array.splice(i, 1);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }

    if (total !== 0) {
      ToastAndroid.show('Seus itens chegarão em breve!', ToastAndroid.SHORT);
    }

    navigation.navigate('Home');
  };

  const renderProducts = (data: Product, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate('ProductInfo', { productID: data.id });
        }}
        style={{
          width: '100%',
          height: '100%',
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '30%',
            height: '100%',
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={data.productImage as any}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{ flex: 1, height: '100%', justifyContent: 'space-around' }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}
            >
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}
              >
                R&#x24; {data.productPrice}.90
              </Text>
              <Text>(~ R&#x24; {data.productPrice + data.productPrice / 20})</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  onPress={() => setNumberItems(numberItems - 1)}
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
              <Text>{numberItems}</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  onPress={() => setNumberItems(numberItems + 1)}
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <ScrollView>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <HeaderText>Detalhes do pedido</HeaderText>
        </Header>
        <Title>Meu Carrinho</Title>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <TopicSection>
            <TopicTitle>Local de entrega</TopicTitle>
            <ModalComponent
              deliveryInformations={(e) => setInformations(e)}
              openModalButton={
                <InformationCard
                  title={`${informations.country} - ${informations.city}/${informations.state}`}
                  subtitle={`${informations.neighborhood} - ${informations.address}`}
                  iconName="truck-delivery-outline"
                />
              }
            />
          </TopicSection>
          <TopicSection>
            <TopicTitle>Método de pagamento</TopicTitle>
            <InformationCard title="VISA GOLD" subtitle="**** 1234" iconText="VISA" />
          </TopicSection>
          <PriceInformation>
            <TopicTitle>Informações do pedido</TopicTitle>
            <TaxSection>
              <TaxTitle>Subtotal</TaxTitle>
              <TaxValue>R&#x24;{total}.00</TaxValue>
            </TaxSection>
            <TaxSection>
              <TaxTitle>Frete</TaxTitle>
              <TaxValue>R&#x24;{total / 10}</TaxValue>
            </TaxSection>
            <TotalSection>
              <TotalTitle>Total</TotalTitle>
              <TotalValue>R&#x24;{total + total / 10}</TotalValue>
            </TotalSection>
          </PriceInformation>
        </View>
      </ScrollView>
      <Button title={`Finalizar - R$ ${total + total / 10}`} onPress={checkOut} />
    </Container>
  );
};
