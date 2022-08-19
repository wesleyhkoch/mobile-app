import styled from "styled-components/native"
import { COLOURS } from "../../database/Database"

export const Container = styled.View`
  position: absolute;
  bottom: 10px;
  height: 8%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const ButtonContainer = styled.TouchableOpacity`
  width: 86%;
  height: 90%;
  background-color: ${COLOURS.blue};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  color: ${COLOURS.white};
  text-transform: uppercase;
`
