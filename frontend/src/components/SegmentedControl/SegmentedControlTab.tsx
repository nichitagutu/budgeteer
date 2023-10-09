import { RefObject } from "react";
import styled from "styled-components";

const Tab = styled.div<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? "500" : "300")};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-size: 1rem;
  z-index: 100;
`;

interface SegmentedControlTabProps {
  tabLabel: string;
  tabRef: RefObject<HTMLDivElement>;
  isActive: boolean;
  onClick: () => void;
}

export default function SegmentedControlTab({
  tabLabel,
  tabRef,
  isActive,
  onClick,
}: SegmentedControlTabProps) {
  return (
    <>
      <Tab isActive={isActive} key={tabLabel} onClick={onClick} ref={tabRef}>
        {tabLabel}
      </Tab>
    </>
  );
}
