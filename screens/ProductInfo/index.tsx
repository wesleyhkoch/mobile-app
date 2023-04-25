import React, { useEffect, useState } from 'react';

import { Button } from '../../components';

import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLOURS, Items } from '../../database/Database';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ButtonBack,
  Container,
  ImageContainer,
  ImagesList,
  InformationsContainer,
  InformationsHeader,
  InformationsTitle,
  ProductDescription,
  ProductNameSection,
  ProductNameTitle,
  ProductPriceSection,
  ProductPriceTitle,
} from './styles';

export const ProductInfo = ({ route, navigation }: any) => {
  const { productID } = route.params;

  const [product, setProduct] = useState<any>([]);

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unsubsribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubsribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id == productID) {
        await setProduct(Items[i]);
        return;
      }
    }
  };

  const addToCart = async (id: number) => {
    let itemArray = (await AsyncStorage.getItem('cartItems')) as any;
    itemArray = JSON.parse(itemArray);
    if (itemArray !== null) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show('Item adicionado ao carrinho', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show('Item adicionado ao carrinho', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  const renderProduct = ({ item, index }: any) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={item}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={COLOURS.backgroundLight} />
      <ScrollView contentContainerStyle={{ height: '120%' }}>
        <ImageContainer>
          <ButtonBack>
            <TouchableOpacity>
              <Entypo
                onPress={() => navigation.goBack()}
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </ButtonBack>
          <FlatList
            data={product.productImageList || null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
          />
          <ImagesList>
            {product.productImageList
              ? product.productImageList.map((data: any, index: any) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '10%',
                        paddingLeft: 5,
                        height: 2.4,
                        backgroundColor: COLOURS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  );
                })
              : null}
          </ImagesList>
        </ImageContainer>
        <InformationsContainer>
          <InformationsHeader>
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: COLOURS.blue,
                marginRight: 6,
              }}
            />
            <InformationsTitle>Informações do produto</InformationsTitle>
          </InformationsHeader>
          <ProductNameSection>
            <ProductNameTitle>{product.productName}</ProductNameTitle>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                marginRight: 6,
                backgroundColor: COLOURS.blue + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </ProductNameSection>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPriceSection>
            <ProductPriceTitle>R&#x24; {product.productPrice.toFixed(2)}</ProductPriceTitle>
            <Text>
              Taxa de separação 1% ~ R&#x24; {(product.productPrice / 100).toFixed(2)} (R&#x24;
              {(product.productPrice + product.productPrice / 10).toFixed(2)})
            </Text>
          </ProductPriceSection>
        </InformationsContainer>
      </ScrollView>

      {product.isAvailable ? (
        <Button title="Adicionar ao carrinho" onPress={() => addToCart(product.id)} />
      ) : (
        <Button title="Não está disponível" onPress={() => null} />
      )}
    </Container>
  );
};
