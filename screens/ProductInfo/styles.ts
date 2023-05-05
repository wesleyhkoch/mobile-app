import styled from 'styled-components/native'
import { COLOURS } from '../../database/Database'

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${COLOURS.white};
  position: relative;
`

export const ImageContainer = styled.View`
  width: 100%;
  background-color: ${COLOURS.backgroundLight};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
`

export const ButtonBack = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
  padding-left: 16px;
`

export const ImagesList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  margin-top: 32px;
`

export const InformationsContainer = styled.View`
  padding: 0 16px;
  margin-top: 6px;
`

export const InformationsHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 14px 0;
`

export const InformationsTitle = styled.Text`
  font-size: 12px;
  color: ${COLOURS.black};
`

export const ProductNameSection = styled.View`
  flex-direction: row;
  margin: 4px 0;
  align-items: center;
  justify-content: space-between;
`

export const ProductNameTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 4px 0;
  color: ${COLOURS.black};
  max-width: 84%;
`

export const ProductDescription = styled.Text`
  font-size: 12px;
  color: ${COLOURS.black};
  font-weight: 400;
  letter-spacing: 1px;
  opacity: 0.5;
  line-height: 20px;
  max-width: 85%;
  max-height: 100px;
  margin-bottom: 18px;
`

export const ProductPriceSection = styled.View`
  padding: 0 16px 80px;
`

export const ProductPriceTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  max-width: 85%;
  color: ${COLOURS.black};
  margin-bottom: 4px;
`
