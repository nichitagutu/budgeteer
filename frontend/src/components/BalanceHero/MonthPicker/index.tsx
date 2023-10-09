import styled from "styled-components";
import MonthPick from "../../../assets/month-pick-icon.svg";
import { useState, useEffect } from "react";

import Wheel from "./Wheel";

const Overlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 777;
`;

const Container = styled.div`
  position: relative;
`;

const Body = styled.div`
  z-index: 2;
  background-color: rgba(116, 116, 128, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  padding: 5px 10px;
  font-size: 12px;
  max-width: 200px;
  gap: 2px;
`;

const MonthPickIcon = styled.img`
  margin-top: 2px;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 2rem;
  left: -4rem;

  display: flex;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  max-width: 600px;
  z-index: 888;
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;

  ${(props) =>
    props.isOpen &&
    `
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  `}

  &::-webkit-scrollbar {
    display: none;
  }

  overflow: hidden;
`;

const WheelBody = styled.div`
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.secondary_bg_color};
`;

const WheelContainer = styled.div<{ width?: string; perspective?: string }>`
  height: 180px;
  width: ${(props) => props.width || "120px"};
  perspective: ${(props) =>
    props.perspective === "right"
      ? "140px"
      : props.perspective === "left"
      ? "70px"
      : "none"};
`;

export default function MonthPicker() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [tempSelectedMonth, setTempSelectedMonth] = useState(selectedMonth);
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear);

  useEffect(() => {
    setTempSelectedMonth(selectedMonth);
    setTempSelectedYear(selectedYear);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDropdownOpen]);

  const handleMonthChange = (value: string) => {
    setTempSelectedMonth(value);
  };
  const handleYearChange = (value: string) => {
    setTempSelectedYear(value);
  };

  return (
    <Container>
      <Overlay
        show={isDropdownOpen}
        onClick={() => {
          setDropdownOpen(false);
          setSelectedMonth(tempSelectedMonth);
          setSelectedYear(tempSelectedYear);
        }}
      />
      <Body onClick={() => setDropdownOpen(!isDropdownOpen)}>
        {selectedMonth} {selectedYear}
        <MonthPickIcon src={MonthPick} alt="Month Picker" />
      </Body>
      <Dropdown isOpen={isDropdownOpen}>
        <DatetimePicker
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          currentMonth={new Date().getMonth()}
          currentYear={new Date().getFullYear()}
        />
      </Dropdown>
    </Container>
  );
}

function DatetimePicker({
  onMonthChange,
  onYearChange,
  currentMonth,
  currentYear,
}: {
  onMonthChange?: (value: string) => void;
  onYearChange?: (value: string) => void;

  currentMonth: number;
  currentYear: number;
}) {
  function formatMonth(monthIndex: number) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  }

  function formatYear(_absolute: number, relativeYear: number): string {
    return (currentYear - 100 + relativeYear).toString();
  }

  return (
    <WheelBody>
      <WheelContainer width="120px">
        <Wheel
          length={12}
          width={140}
          perspective="right"
          setValue={formatMonth}
          initIdx={currentMonth}
          onValueChange={onMonthChange}
        />
      </WheelContainer>
      <WheelContainer width="120px">
        <Wheel
          length={200}
          width={70}
          perspective="left"
          setValue={formatYear}
          initIdx={100}
          onValueChange={onYearChange}
        />
      </WheelContainer>
    </WheelBody>
  );
}
