import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
`;

export const Title = styled.Text`
  font-size: ${props => props.fontSize}px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: bold;
`;

export const EmptyView = styled.View`
  width: 40px;
  height: 40px;
`;
