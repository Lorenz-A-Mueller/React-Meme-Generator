import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header, { HeaderStyles } from './Header.js';
import InputBox, { InputBoxStyles } from './InputBox.js';
import InputButtonBox, { InputButtonBoxStyles } from './InputButtonBox.js';
import PictureBox, { PictureBoxStyles } from './PictureBox.js';
import SideBox, { SideBoxStyles } from './SideBox.js';

const urlBase = 'https://api.memegen.link/images/';
let newUrl = '';

const ContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-self: flex-end;
  margin-left: 10%;
  height: 90vh;
  width: 50vw;
  //border: solid black 5px;
  //border-radius: 5%;
  //background: linear-gradient(to bottom, lightblue, white);
  overflow: hidden; /* header box doesn't stick out at the edges (it doesn't have border-radius) */
  padding: 2%;
`;

const OuterContainerStyles = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
`;

export default function App() {
  const [url, setUrl] = useState('https://api.memegen.link/images/bender');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [templateText, setTemplateText] = useState('');
  const [templateIds, setTemplateIds] = useState([]);
  const [templateNames, setTemplateNames] = useState([]);
  const [sidePicArray, setSidePicArray] = useState(() => {
    // default values of the three state variables: take the local storage or an empty array
    const saved = localStorage.getItem('sidePicArray');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [topTextArray, setTopTextArray] = useState(() => {
    const saved = localStorage.getItem('topTextArray');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [bottomTextArray, setBottomTextArray] = useState(() => {
    const saved = localStorage.getItem('bottomTextArray');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    // update the localstorage on change (concat) of the arrays
    localStorage.setItem('sidePicArray', JSON.stringify(sidePicArray));
  }, [sidePicArray]);
  useEffect(() => {
    localStorage.setItem('topTextArray', JSON.stringify(topTextArray));
  }, [topTextArray]);
  useEffect(() => {
    localStorage.setItem('bottomTextArray', JSON.stringify(bottomTextArray));
  }, [bottomTextArray]);

  useEffect(() => {
    setSidePicArray(JSON.parse(localStorage.getItem('sidePicArray')));
    // download all the templates after first mounting (empty dependency array)
    fetch('https://api.memegen.link/templates')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setTemplateIds(data.map((element) => element.id)); // get all ids and all names as arrays
        setTemplateNames(data.map((element) => element.name));
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }, []);

  function handleClick(event) {
    if (event.currentTarget.id === 'delete') {
      //delete-button
      setSidePicArray([]);
      setTopTextArray([]);
      setBottomTextArray([]);
    } else if (event.currentTarget.id === 'download') {
      // download-button
      saveAs(url, url.slice(32) + '.png'); // save the image, file will not contain first 32 letters (start with the template)
    } else if (event.currentTarget.id === 'generate') {
      let refinedTopText = topText // replace special characters with their escape equivalents
        .replace(/ /g, '-')
        .replace(/\//g, '~s')
        .replace(/#/g, '~h')
        .replace(/\?/g, '~q');
      const refinedBottomText = bottomText
        .replace(/ /g, '-')
        .replace(/\//g, '~s')
        .replace(/#/g, '~h')
        .replace(/\?/g, '~q');

      newUrl =
        urlBase +
        (templateText
          ? templateText
          : templateIds[Math.floor(Math.random() * templateIds.length)]) + // if no template, choose random
        (topText ? '/' + refinedTopText : '') +
        (topText && bottomText ? '/' + refinedBottomText + '/' : '');

      setUrl(''); //image will show the loading gif
      fetch(newUrl).then(() => {
        setUrl(newUrl); // set url to the custom on value after the time it takes for the fetching (used for timing), image will then show the meme
      });
      setSidePicArray((oldArray) => oldArray.concat(newUrl)); // used in SideBox.js to create image list that have attributes with top and bottomText
      setTopTextArray((oldArray) => oldArray.concat(topText)); // note: don't use push! use concat or spread operator (concat returns the new array)
      setBottomTextArray((oldArray) => oldArray.concat(bottomText));
    }
  }
  function handleTopTextChange(event) {
    setTopText(event.currentTarget.value);
  }

  function handleBottomTextChange(event) {
    setBottomText(event.currentTarget.value);
    if (!topText && bottomText) setTopText('-'); // so bottom Text can be shown without top
  }

  function handleTemplateTextChange(event) {
    setTemplateText(event.currentTarget.value);
  }

  function handleError() {
    setUrl('');
  }

  function handleImageClick(event) {
    const { name, id, src } = event.currentTarget;
    setTopText(name); // reset topText and bottomText, so they will be shown together with the picture if a meme from the history is clicked on.
    setBottomText(id);
    setUrl(src);
  }

  return (
    <OuterContainerStyles>
      <SideBoxStyles>
        <SideBox
          sidePicArray={sidePicArray}
          topTextArray={topTextArray}
          bottomTextArray={bottomTextArray}
          handleClick={handleClick}
          handleImageClick={handleImageClick}
        />
      </SideBoxStyles>
      <ContainerStyles>
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
            templateIds={templateIds}
            templateNames={templateNames}
          />
        </InputButtonBoxStyles>
        <PictureBoxStyles>
          <PictureBox url={url} handleError={handleError} />
        </PictureBoxStyles>
      </ContainerStyles>
    </OuterContainerStyles>
  );
}
