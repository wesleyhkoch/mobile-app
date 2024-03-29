import React, { useEffect, useState } from 'react'

import { StatusBar, ScrollView, TouchableOpacity } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLOURS, Items } from '../../database/Database'

import { ProductCard } from '../../components'

import {
  Container,
  Header,
  ProductSection,
  ProductSectionHeader,
  ProductSectionTitleHeader,
  ProductSectionTitle,
  ProductSectionTotal,
  ProductPreview,
} from './styles'

export const Products = ({ navigation }: any) => {
  const [products, setProducts] = useState<any>([])

  const getDataFromDB = async () => {
    const productList = []

    for (let i = 0; i < Items.length; i++) {
      if (Items[i].category === 'product') {
        productList.push(Items[i])
      }
    }

    setProducts(productList)
  }

  useEffect(() => {
    const unsubsribe = navigation.addListener('focus', () => {
      getDataFromDB()
    })

    return unsubsribe
  }, [navigation])

  return (
    <Container>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </Header>
        <ProductSection>
          <ProductSectionHeader>
            <ProductSectionTitleHeader>
              <ProductSectionTitle>Produtos</ProductSectionTitle>
              <ProductSectionTotal>{products.length}</ProductSectionTotal>
            </ProductSectionTitleHeader>
          </ProductSectionHeader>
          <ProductPreview>
            {products.map((data: any) => {
              return <ProductCard data={data} navigation={navigation} key={data.id} />
            })}
          </ProductPreview>
        </ProductSection>
      </ScrollView>
    </Container>
  )
}
