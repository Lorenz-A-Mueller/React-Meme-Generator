import styled from 'styled-components';
import { Input } from './Input.js';

export const InputButtonBoxStyles = styled.div`
  display: flex;
  background-color: blue;
  width: 100%;
  height: 10%;
`;

const Button = styled.button`
  font-size: 0.5em;
  width: 50%;
  height: 10%;
  color: red;
`;

export default function InputButtonBox(props) {
  return (
    <>
      <Input
        placeholder="Template"
        value={props.templateText}
        onChange={(event) => props.handleTemplateTextChange(event)}
      ></Input>
      <Button
        style={{ height: '100%', width: '50%' }}
        onClick={(event) => props.handleClick(event)}
      >
        Generate Meme!
      </Button>
    </>
  );
}
