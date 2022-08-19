import React from "react"
import { Text, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLOURS } from "../../database/Database"

import {
  Container,
  ContentSection,
  IconSection,
  SubTitle,
  TextIcon,
  Title,
} from "./styles"

interface CardProps {
  iconText?: string
  iconName?: string
  title: string
  subtitle?: string
}

export const InformationCard = ({
  iconText = "OFF",
  iconName,
  title,
  subtitle,
}: CardProps) => {
  return (
    <Container>
      <ContentSection>
        <IconSection>
          {iconName ? (
            <MaterialCommunityIcons
              name={iconName}
              style={{
                fontSize: 18,
                color: COLOURS.blue,
              }}
            />
          ) : (
            <TextIcon>{iconText}</TextIcon>
          )}
        </IconSection>
        <View>
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </View>
      </ContentSection>
      <MaterialCommunityIcons
        name='chevron-right'
        style={{ fontSize: 22, color: COLOURS.black }}
      />
    </Container>
  )
}
