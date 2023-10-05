import InfoButton from "./InfoButton";
import styled from "styled-components";
import MonthPicker from "./MonthPicker";
import GeneralBalance from "./GeneralBalance";
import { useState } from "react";
// import BalanceCharts from "./GeneralBalance/BalanceCharts";

const Body = styled.div`
  margin: 1rem;
  background-color: #fff;

  border-radius: 9px;
  padding: 8px 8px 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const MockData = [
//   {
//     date: new Date(Date.UTC(2021, 8, 1)),
//     value: 1000,
//   },
// ];

export default function BalanceHero() {
  

  return (
    <Body>
      <InfoButton />

      <MonthPicker />

      <GeneralBalance />
    </Body>
  );
}
