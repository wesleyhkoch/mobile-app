import styled from 'styled-components/native'
import { COLOURS } from '../../database/Database'

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${COLOURS.white};
  position: relative;
`

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  padding-top: 16px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
`

export const HeaderText = styled.Text`
  font-size: 14px;
  color: ${COLOURS.black};
  font-weight: 400;
`

export const Title = styled.Text`
  font-size: 20px;
  color: ${COLOURS.black};
  font-weight: 500;
  letter-spacing: 1px;
  padding-top: 20px;
  padding-left: 16px;
  margin-bottom: 10px;
`

export const TopicSection = styled.View`
  padding: 0 16px;
  margin: 10px 0;
`

export const TopicTitle = styled.Text`
  font-size: 16px;
  color: ${COLOURS.black};
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 20px;
`

export const PriceInformation = styled.View`
  padding: 0 16px;
  margin-top: 40px;
  margin-bottom: 80px;
`

export const TaxSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const TaxTitle = styled.Text`
  font-size: 12px;
  font-weight: 400;
  max-width: 80%;
  color: ${COLOURS.black};
  opacity: 0.5;
`

export const TaxValue = styled.Text`
  font-size: 12px;
  font-weight: 400;
  max-width: 80%;
  color: ${COLOURS.black};
  opacity: 0.8;
`

export const TotalSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`

export const TotalTitle = styled.Text`
  font-size: 12px;
  font-weight: 400;
  max-width: 80%;
  color: ${COLOURS.black};
  opacity: 0.5;
`

export const TotalValue = styled.Text`
  font-size: 22px;
  font-weight: 500;
  color: ${COLOURS.black};
`
