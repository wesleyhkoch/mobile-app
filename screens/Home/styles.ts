import styled from 'styled-components/native'
import { COLOURS } from '../../database/Database'

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${COLOURS.white};
`

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`

export const Logo = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 10px;
  padding: 16px;
`

export const LogoTitle = styled.Text`
  font-size: 26px;
  color: ${COLOURS.black};
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 10px;
  text-align: center;
`

export const LogoDescription = styled.Text`
  font-size: 16px;
  color: ${COLOURS.black};
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 10px;
  line-height: 24px;
  text-align: center;
`

export const ProductSection = styled.View`
  padding: 16px;
`

export const ProductSectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ProductSectionTitleHeader = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ProductSectionTitle = styled.Text`
  font-size: 22px;
  color: ${COLOURS.black};
  font-weight: 500;
  letter-spacing: 1px;
`

export const ProductSectionTotal = styled.Text`
  font-size: 14px;
  color: ${COLOURS.black};
  font-weight: 400;
  opacity: 0.5;
  margin-left: 10px;
`

export const ProductSectionTitleSeeAll = styled.Text`
  font-size: 14px;
  color: ${COLOURS.blue};
  font-weight: 400;
`

export const ProductPreview = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`
