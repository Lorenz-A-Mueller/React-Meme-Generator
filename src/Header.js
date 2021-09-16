import styled from 'styled-components';

export default function Header() {
  return <h1>React Meme Generator</h1>;
}

export const HeaderStyles = styled.div`
  width: 100%;
  height: 20%;
  /*background-color: lightblue; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 5px 5px 10px;
  font-size: 1.5em;
`;
