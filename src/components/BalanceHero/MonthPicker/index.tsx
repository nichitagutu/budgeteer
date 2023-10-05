import styled from "styled-components";
import MonthPick from "../../../assets/month-pick-icon.svg";
import { useState, useEffect } from "react";

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
  top: 100%;
  left: -1.8rem;
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

const Section = styled.div`
  overflow-y: auto;
  max-height: 246px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MonthSection = styled(Section)`
  flex: 1.8;
`;

const YearSection = styled(Section)`
  flex: 1;
`;

const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 11px 16px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#EAEAEC" : "none")};
  &:hover {
    background-color: #f1f1f1;
  }
`;

export default function MonthPicker() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [tempSelectedMonth, setTempSelectedMonth] = useState(selectedMonth);
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear);

  useEffect(() => {
    setTempSelectedMonth(selectedMonth);
    setTempSelectedYear(selectedYear);
  }, [isDropdownOpen]);

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(new Date().getFullYear(), i).toLocaleString("en-US", {
      month: "long",
    })
  );

  const yearRange = Array.from(
    { length: 6 },
    (_, i) => new Date().getFullYear() - 3 + i
  );

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
        <MonthSection>
          {monthNames.map((month) => (
            <DropdownItem
              key={month}
              isSelected={tempSelectedMonth === month}
              onClick={() => setTempSelectedMonth(month)}
            >
              {month}
            </DropdownItem>
          ))}
        </MonthSection>
        <YearSection>
          {yearRange.map((year) => (
            <DropdownItem
              key={year}
              isSelected={tempSelectedYear === year}
              onClick={() => setTempSelectedYear(year)}
            >
              {year}
            </DropdownItem>
          ))}
        </YearSection>
      </Dropdown>
    </Container>
  );
}
