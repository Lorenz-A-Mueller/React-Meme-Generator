import styled from 'styled-components';

export const PictureBoxStyles = styled.div`
  background-color: yellow;
  height: 50%;
  width: 100%;
`;

export default function PictureBox(props) {
  return (
    <>
      <p>place for the picture</p>
      <img
        style={{ width: '70%', height: '70%' }}
        src={props.url}
        alt="Your meme!"
      ></img>
    </>
  );
}
