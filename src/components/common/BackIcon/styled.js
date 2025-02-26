import styled from "styled-components/native";
import { TouchableOpacity, Image } from "react-native";

export const BackContainer = styled(TouchableOpacity)`
  padding: 10px;
`;

export const Back = styled(Image).attrs({
  resizeMode: "contain",
})`
  width: 40px;
  margin-left: ${(props) => props.marginLeft || 0}px;
`;
