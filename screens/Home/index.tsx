import React, { useEffect, useState } from "react"

import { StatusBar, ScrollView, TouchableOpacity } from "react-native"

import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { COLOURS, Items } from "../../database/Database"

import { ProductCard } from "../../components"

import {
  Logo,
  Container,
  Header,
  LogoTitle,
  LogoDescription,
  ProductSection,
  ProductSectionHeader,
  ProductSectionTitleHeader,
  ProductSectionTitle,
  ProductSectionTotal,
  ProductSectionTitleSeeAll,
  ProductPreview,
} from "./styles"


export const Home = ({ navigation }: any) => {
  const [products, setProducts] = useState<any>([])
  const [accessories, setAccessories] = useState<any>([])

  useEffect(() => {
    const unsubsribe = navigation.addListener("focus", () => {
      getDataFromDB()
    })

    return unsubsribe
  }, [navigation])

  const getDataFromDB = async () => {
    const productList = []
    const accessoryList = []

    for (let i = 0; i < Items.length; i++) {
      if (Items[i].category === "product") {
        productList.push(Items[i])
      } else if (Items[i].category === "accessory") {
        accessoryList.push(Items[i])
      }
    }

    setProducts(productList)
    setAccessories(accessoryList)
  }

  return (
    <Container>
      <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <TouchableOpacity>
            <Entypo
              name='shopping-bag'
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
            <MaterialCommunityIcons
              name='cart'
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
        <Logo>
          <LogoTitle>ProjecT Store</LogoTitle>
          <LogoDescription>
            A melhor e maior loja de eletronicos da américa!
          </LogoDescription>
        </Logo>
        <ProductSection>
          <ProductSectionHeader>
            <ProductSectionTitleHeader>
              <ProductSectionTitle>Produtos</ProductSectionTitle>
              <ProductSectionTotal>{products.length}</ProductSectionTotal>
            </ProductSectionTitleHeader>
            <ProductSectionTitleSeeAll>Ver todos</ProductSectionTitleSeeAll>
          </ProductSectionHeader>
          <ProductPreview>
            {products.map((data: any) => {
              return (
                <ProductCard
                  data={data}
                  navigation={navigation}
                  key={data.id}
                />
              )
            })}
          </ProductPreview>
        </ProductSection>
        <ProductSection>
          <ProductSectionHeader>
            <ProductSectionTitleHeader>
              <ProductSectionTitle>Acessórios</ProductSectionTitle>
              <ProductSectionTotal>{accessories.length}</ProductSectionTotal>
            </ProductSectionTitleHeader>
            <ProductSectionTitleSeeAll>Ver todos</ProductSectionTitleSeeAll>
          </ProductSectionHeader>
          <ProductPreview>
            {accessories.map((data: any) => {
              return (
                <ProductCard
                  data={data}
                  navigation={navigation}
                  key={data.id}
                />
              )
            })}
          </ProductPreview>
        </ProductSection>
      </ScrollView>
    </Container>
  )
}
