import styled from "styled-components";
import MonthPick from "../../../assets/month-pick-icon.svg";

const Body = styled.div`
  background-color: rgba(116, 116, 128, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  padding: 5px 10px;
  font-size: 12px;
  overflow: hidden;
  max-width: 200px;
  gap: 2px;
`;

const MonthPickIcon = styled.img`
  margin-top: 2px;
`;

const Month = styled.div`
  font-weight: 500;
`;

export default function MonthPicker() {
  return (
    <div>
      <Body>
        <Month>September</Month>
        <MonthPickIcon src={MonthPick} alt="Month Picker" />
      </Body>
    </div>
  );
}
