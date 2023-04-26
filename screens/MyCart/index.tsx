import React, { useEffect, useState } from 'react'

import { View, Text, ScrollView, TouchableOpacity, Image, ToastAndroid, Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useStripe } from '@stripe/stripe-react-native'

import { COLOURS, Items } from '../../database/Database'

import { Button, InformationCard, ModalComponent } from '../../components'

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
} from './styles'

import { Product } from '../../types/index'

export const MyCart = ({ navigation }: any) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const [cart, setCart] = useState<Product[]>([])
  const [total, setTotal] = useState<number>(0)
  const [informations, setInformations] = useState({
    country: 'Brasil',
    state: 'RS',
    city: 'Porto Alegre',
    neighborhood: 'Humaitá',
    address: 'Av. Padre Leopoldo Brentano',
    complement: '110 - Portão 2',
  })

  const getDataFromDB = async () => {
    let items = (await AsyncStorage.getItem('cartItems')) as any
    items = JSON.parse(items)
    let productData: any = []

    if (items !== null) {
      Items.forEach((data: any) => {
        if (items.includes(data.id)) {
          productData.push(data)
          return
        }
      })

      setCart(productData)
      getTotal(productData)
    } else {
      setCart([])
      getTotal([])
    }
  }

  const getTotal = (productData: Product[]) => {
    let total = 0
    for (let i = 0; i < productData.length; i++) {
      let productPrice = productData[i].productPrice * productData[i].quantity
      total = total + productPrice
    }

    setTotal(total)
  }

  const updateCartItemQuantity = (productData: Product, newQuantity: number) => {
    const cartIndex = cart.findIndex((product: Product) => product.id === productData.id)
    const updatedCart = [...cart]

    if (cartIndex !== -1 && newQuantity > 0) {
      updatedCart[cartIndex] = { ...updatedCart[cartIndex], quantity: newQuantity }
    }

    setCart(updatedCart)
    getTotal(updatedCart)
  }

  const removeItemFromCart = async (id: number) => {
    let itemArray = (await AsyncStorage.getItem('cartItems')) as any
    itemArray = JSON.parse(itemArray)
    if (itemArray !== null) {
      let array = itemArray
      for (let i = 0; i < array.length; i++) {
        if (array[i] == id) {
          array.splice(i, 1)
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array))
        getDataFromDB()
      }
    }
  }

  const checkOut = async () => {
    try {
      let items: any = await AsyncStorage.getItem('shoppingItems')
      items = JSON.parse(items)

      let array = []

      if (items !== null) {
        array.push(items)
        array.push(cart)
        await AsyncStorage.setItem('shoppingItems', JSON.stringify(array.flat()))
      } else {
        await AsyncStorage.setItem('shoppingItems', JSON.stringify(cart))
      }

      console.log(array)
      await AsyncStorage.removeItem('cartItems')
    } catch (error) {
      return error
    }

    ToastAndroid.show('Seus itens chegarão em breve!', ToastAndroid.SHORT)

    navigation.navigate('Home')
  }

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://10.0.0.164:4242/payment-sheet`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: Number((total + total / 10).toFixed(2).toString().split('.').join('')),
      }),
    })

    const { paymentIntent, ephemeralKey, customer } = await response.json()

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    }
  }

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()

    await initPaymentSheet({
      merchantDisplayName: 'ProjecT Store',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'ProjecT Store Customer',
      },
      appearance: {
        colors: {
          primary: COLOURS.blue,
        },
      },
    })
  }

  const openPaymentSheet = async () => {
    if (total > 0) {
      await initializePaymentSheet()

      const { error } = await presentPaymentSheet()

      if (!error) {
        checkOut()
      }
    } else {
      navigation.goBack()
    }
  }

  useEffect(() => {
    const unsubsribe = navigation.addListener('focus', () => {
      getDataFromDB()
    })

    return unsubsribe
  }, [navigation])

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
          {cart
            ? cart.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('ProductInfo', { productID: data.id })
                  }}
                  style={{
                    width: '100%',
                    height: 100,
                    marginVertical: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: '30%',
                      height: 100,
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
                          R&#x24; {data.productPrice.toFixed(2)}
                        </Text>
                        <Text>
                          (~ R&#x24; {(data.productPrice + data.productPrice / 20).toFixed(2)})
                        </Text>
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
                            onPress={() => updateCartItemQuantity(data, data.quantity - 1)}
                            name="minus"
                            style={{
                              fontSize: 16,
                              color: COLOURS.backgroundDark,
                            }}
                          />
                        </View>
                        <Text>{data.quantity}</Text>
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
                            onPress={() => updateCartItemQuantity(data, data.quantity + 1)}
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
              ))
            : null}
        </View>
        <View>
          <TopicSection>
            <TopicTitle>Local de entrega</TopicTitle>
            <ModalComponent
              deliveryInformations={setInformations}
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
              <TaxValue>R&#x24;{total.toFixed(2)}</TaxValue>
            </TaxSection>
            <TaxSection>
              <TaxTitle>Frete</TaxTitle>
              <TaxValue>R&#x24;{(total / 10).toFixed(2)}</TaxValue>
            </TaxSection>
            <TotalSection>
              <TotalTitle>Total</TotalTitle>
              <TotalValue>R&#x24;{(total + total / 10).toFixed(2)}</TotalValue>
            </TotalSection>
          </PriceInformation>
        </View>
      </ScrollView>
      <Button
        title={`Finalizar - R$ ${(total + total / 10).toFixed(2)}`}
        onPress={openPaymentSheet}
      />
    </Container>
  )
}
