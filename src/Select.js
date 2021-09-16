import styled from 'styled-components';

export const Select = styled.select`
  width: 48.5%;
  font-size: 200%;
  &:hover {
    background-color: red;
  }
  option {
    background-color: yellow;
  }
`;

export const Option = styled.option`
  background-color: yellow;
  &:hover {
    background-color: red;
  }
`;
