import InfoButton from "./InfoButton";
import styled from "styled-components";
import MonthPicker from "./MonthPicker";
import GeneralBalance from "./GeneralBalance";

const Body = styled.div`
  background-color: #fff;

  border-radius: 9px;
  padding: 8px 8px 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function BalanceHero() {
  return (
    <Body>
      <InfoButton />

      <MonthPicker />

      <GeneralBalance />
    </Body>
  );
}
