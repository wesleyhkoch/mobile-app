import styled from 'styled-components/native';
import { COLOURS } from '../../database/Database';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${COLOURS.backgroundLayer};
  width: 100%;
  height: 100%;
`;

export const ModalTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: ${COLOURS.white};
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const ModalTextInput = styled.TextInput`
  width: 100%;
  height: 40px;
  margin: 10px 0;
  border-width: 0.5px;
  padding: 10px;
`;

export const FormView = styled.View`
  display: flex;
  width: 100%;
  height: 450px;
`;
