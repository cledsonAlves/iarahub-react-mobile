import styled from 'styled-components/native';

export const ActionButton = styled.TouchableOpacity`
  background-color: ${(props: { variant: string; }) => props.variant === 'primary' ? '#F78C38' : '#333'};
  padding: 8px 16px;
  border-radius: 20px;
  align-self: flex-start;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;