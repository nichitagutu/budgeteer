import infoIcon from "../../../assets/info-circle.svg";
import styled from "styled-components";

const Image = styled.img`
  align-self: flex-end;
`;

export default function InfoButton() {
  function onIconClick() {
    open("https://telegra.ph/POZHALUJSTA-POMOGITE-10-02", "_self");
  }

  return (
    <>
      <Image
        width={"20px"}
        height={"20px"}
        onClick={onIconClick}
        src={infoIcon}
        alt="Info circle icon"
      />
    </>
  );
}
