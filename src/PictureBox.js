import styled from 'styled-components';
import loadingGif from './loading.gif';

export const PictureBoxStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`;

export default function PictureBox(props) {
  return (
    <>
      <img
        src={props.url ? props.url : loadingGif}
        style={{ height: '100%' }}
        alt="Your meme!"
        onError={props.handleError}
      ></img>
    </>
  );
}
