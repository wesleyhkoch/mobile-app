import React from 'react'

import { Container, ButtonContainer, ButtonText } from './styles'

interface ButtonProps {
  title: string
  onPress: () => void
}

export const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <Container>
      <ButtonContainer onPress={onPress}>
        <ButtonText>{title}</ButtonText>
      </ButtonContainer>
    </Container>
  )
}
