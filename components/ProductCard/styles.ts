import styled from "styled-components/native"
import { COLOURS } from "../../database/Database"

export const Container = styled.TouchableOpacity`
  width: 48%;
  margin: 14px 0;
`

export const ImageContainer = styled.View`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: ${COLOURS.backgroundLight};
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`

export const OffContainer = styled.View`
  position: absolute;
  width: 20%;
  height: 24%;
  background-color: ${COLOURS.green};
  top: 0;
  left: 0;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
  justify-content: center;
`

export const OffText = styled.Text`
  font-size: 12px;
  color: ${COLOURS.white};
  font-weight: bold;
  letter-spacing: 1px;
`

export const ProductImage = styled.Image`
  width: 80%;
  height: 80%;
`

export const ProductName = styled.Text`
  font-size: 12px;
  color: ${COLOURS.black};
  font-weight: 600;
  margin-bottom: 2px;
  text-transform: capitalize;
`

export const AvailableContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const AvailableTextGreen = styled.Text`
  font-size: 12px;
  color: ${COLOURS.green};
`

export const AvailableTextRed = styled.Text`
  font-size: 12px;
  color: ${COLOURS.red};
`
