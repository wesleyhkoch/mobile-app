import styled from 'styled-components/native';
import { COLOURS } from '../../database/Database';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${COLOURS.white};
  position: relative;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  padding-top: 16px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 14px;
  color: ${COLOURS.black};
  font-weight: 400;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${COLOURS.black};
  font-weight: 500;
  letter-spacing: 1px;
  padding-top: 20px;
  padding-left: 16px;
  margin-bottom: 10px;
`;
