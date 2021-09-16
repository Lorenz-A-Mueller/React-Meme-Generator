import styled from 'styled-components';
import { Option, Select } from './Select.js';

export const InputButtonBoxStyles = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
`;

const Button = styled.button`
  font-size: 100%;
  width: 48%;
  height: 10%;
  color: black;
  &:hover {
    box-shadow: 10px 10px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
`;

export default function InputButtonBox(props) {
  return (
    <>
      <Select
        value={props.templateText}
        onChange={(event) => props.handleTemplateTextChange(event)}
      >
        <Option value="" key="random">
          Random Template!
        </Option>
        {props.templateNames.map((templateName, index) => (
          <Option value={props.templateIds[index]} key={templateName}>
            {templateName}
          </Option>
        ))}
      </Select>
      <Button
        id="generate"
        style={{ height: '100%', width: '25%', fontSize: '150%' }}
        onClick={(event) => props.handleClick(event)}
      >
        Generate Meme!
      </Button>
      <Button
        id="download"
        style={{ height: '100%', width: '20%', fontSize: '150%' }}
        onClick={(event) => props.handleClick(event)}
      >
        Download!
      </Button>
    </>
  );
}
