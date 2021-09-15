import { saveAs } from 'file-saver';
import { useState } from 'react';
import styled from 'styled-components';
import Header, { HeaderStyles } from './Header.js';
import InputBox, { InputBoxStyles } from './InputBox.js';
import InputButtonBox, { InputButtonBoxStyles } from './InputButtonBox.js';
import PictureBox, { PictureBoxStyles } from './PictureBox.js';

const urlBase = 'https://api.memegen.link/images/';

const ContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  width: 50vw;
  border: solid black 15px;
  background-color: lightgrey;
`;

export default function App() {
  const [url, setUrl] = useState('https://api.memegen.link/images/bender');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [templateText, setTemplateText] = useState('');

  function handleClick(event) {
    if (event.currentTarget.id === 'download') {
      saveAs(url, url.slice(32) + '.png');
    }

    setUrl(
      urlBase +
        templateText +
        (topText ? '/' + topText + '/' : '') +
        (bottomText ? bottomText + '/' : ''),
    );
  }
  function handleTopTextChange(event) {
    setTopText(event.currentTarget.value);
  }

  function handleBottomTextChange(event) {
    setBottomText(event.currentTarget.value);
  }

  function handleTemplateTextChange(event) {
    setTemplateText(event.currentTarget.value);
  }

  return (
    <ContainerStyles>
      {url}
      <HeaderStyles>
        <Header />
      </HeaderStyles>
      <InputBoxStyles>
        <InputBox
          topText={topText}
          bottomText={bottomText}
          handleTopTextChange={handleTopTextChange}
          handleBottomTextChange={handleBottomTextChange}
        />
      </InputBoxStyles>
      <InputButtonBoxStyles>
        <InputButtonBox
          templateText={templateText}
          handleClick={handleClick}
          handleTemplateTextChange={handleTemplateTextChange}
          url={url}
        />
      </InputButtonBoxStyles>
      <PictureBoxStyles>
        <PictureBox url={url} />
      </PictureBoxStyles>
    </ContainerStyles>
  );
}

// https://api.memegen.link/images/bender/top-text
