import styled from 'styled-components';

export const SideBoxStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  border: solid black 5px;
  border-radius: 5%;
  background: linear-gradient(to bottom, lightblue, white);
  overflow: hidden; /* header box doesn't stick out at the edges (it doesn't have border-radius) */
  padding: 2%;
  height: 90%;
  width: 30%;
  text-shadow: 0;
`;

const Button = styled.button`
  font-size: 150%;
  color: red;
  height: 100%;
  width: 80;
  font-size: '150%';
  &:hover {
    box-shadow: 10px 10px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
`;

const Image = styled.img`
  width: 50px;
  border: solid black 3px;
  &:hover {
    cursor: pointer;
  }
`;

export default function SideBox(props) {
  return (
    <>
      <div>
        <h2 style={{ textDecoration: 'solid underline black 5px' }}>
          Your Meme History:
        </h2>
      </div>
      <div style={{ backgroundColor: 'black' }}>
        {props.sidePicArray.map((sidePic, index) => (
          <Image
            src={sidePic}
            key={sidePic}
            name={props.topTextArray[index]} // use this for top text (only "real" attributes seem to work with event.currentTarget....)
            id={props.bottomTextArray[index]} // use this for bottom text
            alt={`A previously generated Meme`}
            onClick={(event) => props.handleImageClick(event)}
          />
        ))}
      </div>
      <div style={{ marginTop: 'auto' }}>
        {/* marginTop: 'auto' brings the element to the bottom ("justify-self" does not exist in Flex!)*/}
        <Button id="delete" onClick={(event) => props.handleClick(event)}>
          Delete Meme History
        </Button>
      </div>
    </>
  );
}
