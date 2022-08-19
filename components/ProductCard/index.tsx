import React from "react"
import { Text } from "react-native"

import {
  AvailableContainer,
  AvailableTextGreen,
  AvailableTextRed,
  Container,
  ImageContainer,
  OffContainer,
  OffText,
  ProductImage,
  ProductName,
} from "./styles"

import { COLOURS } from "../../database/Database"

import FontAwesome from "react-native-vector-icons/FontAwesome"

export const ProductCard = ({ data, navigation }: any) => {
  return (
    <Container
      onPress={() => {
        navigation.navigate("ProductInfo", { productID: data.id })
      }}
    >
      <ImageContainer>
        {data.isOff ? (
          <OffContainer>
            <OffText>{data.offPercentage}%</OffText>
          </OffContainer>
        ) : null}
        <ProductImage source={data.productImage} resizeMode={"contain"} />
      </ImageContainer>
      <ProductName>{data.productName}</ProductName>
      {data.isAvailable ? (
        <AvailableContainer>
          <FontAwesome
            name='circle'
            style={{
              fontSize: 12,
              marginRight: 6,
              color: COLOURS.green,
            }}
          />
          <AvailableTextGreen>Disponível</AvailableTextGreen>
        </AvailableContainer>
      ) : (
        <AvailableContainer>
          <FontAwesome
            name='circle'
            style={{
              fontSize: 12,
              marginRight: 6,
              color: COLOURS.red,
            }}
          />
          <AvailableTextRed>Indisponível</AvailableTextRed>
        </AvailableContainer>
      )}
      <Text>R&#x24; {data.productPrice}.00</Text>
    </Container>
  )
}
