import React, { useEffect, useState } from 'react'

import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLOURS, Items } from '../../database/Database'

import { Container, Header, HeaderText, Title } from './styles'

import { Product } from '../../types/index'

export const Shopping = ({ navigation }: any) => {
  const [shopping, setShopping] = useState<Product[]>([])

  const getDataFromDB = async () => {
    let items = (await AsyncStorage.getItem('shoppingItems')) as any
    items = JSON.parse(items)
    let productData: any = []

    if (items !== null) {
      Items.forEach((data: any) => {
        if (items.includes(data.id)) {
          productData.push(data)
          return
        }
      })

      setShopping(items)
    } else {
      setShopping([])
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
          <HeaderText>Últimas compras</HeaderText>
        </Header>
        <Title>Produtos</Title>
        <View style={{ paddingHorizontal: 16 }}>
          {shopping
            ? shopping.map((data, index) => (
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
                        <Text>( {data.quantity}x )</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </View>
      </ScrollView>
    </Container>
  )
}
