import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity`
  width: 90%;
  min-height: 40px;
  background-color: ${(props) =>
    props.type === "primary"
      ? props.theme.colors.primaryButton
      : props.theme.colors.secondaryButton};
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.marginVertical}px auto;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryText};
`;
