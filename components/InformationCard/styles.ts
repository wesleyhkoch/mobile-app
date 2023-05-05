import styled from 'styled-components/native'
import { COLOURS } from '../../database/Database'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ContentSection = styled.View`
  flex-direction: row;
  width: 80%;
  align-items: center;
`

export const IconSection = styled.View`
  background-color: ${COLOURS.backgroundLight};
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 10px;
  margin-right: 18px;
`

export const TextIcon = styled.Text`
  font-size: 10px;
  font-weight: 900;
  color: ${COLOURS.blue};
  letter-spacing: 1px;
`

export const Title = styled.Text`
  font-size: 14px;
  color: ${COLOURS.black};
  font-weight: 500;
`

export const SubTitle = styled.Text`
  font-size: 12px;
  color: ${COLOURS.black};
  font-weight: 400;
  line-height: 20px;
  opacity: 0.5;
`
