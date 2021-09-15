import styled from 'styled-components';
import { Input } from './Input.js';

export const InputBoxStyles = styled.div`
  display: flex;
  background-color: blue;
  width: 100%;
  height: 10%;
`;

export default function InputBox(props) {
  return (
    <>
      <Input
        value={props.topText}
        placeholder="Top Text"
        onChange={(event) => props.handleTopTextChange(event)}
      ></Input>
      <Input
        value={props.bottomText}
        placeholder="Bottom Text"
        onChange={(event) => props.handleBottomTextChange(event)}
      ></Input>
    </>
  );
}
