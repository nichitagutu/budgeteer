import React, { createRef, useEffect, useLayoutEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import SegmentedControlBody from "./SegmentedControlBody";
import SegmentedControlTab from "./SegmentedControlTab";

const ActiveTabIndicator = styled(animated.div)`
  position: absolute;
  height: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04),
    0px 3px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  top: 2px;
  left: 2px;
  bottom: 2px;
  right: 2px;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari, Chrome, Opera, Samsung */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Edge, IE */
  user-select: none; /* Modern browsers */
`;

interface TabType {
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface SegmentedControlProps {
  tabNames: string[];
  onTabChange: (index: number) => void;
}

export default function SegmentedControl({
  tabNames,
  onTabChange,
}: SegmentedControlProps) {
  const tabs: TabType[] = tabNames.map((tabName) => ({
    label: tabName,
    ref: createRef(),
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [{ left, width }, set] = useSpring(() => ({
    left: 2,
    width: 0,
    config: { tension: 1750, friction: 100 },
  }));

  useLayoutEffect(() => {
    const currentTab = tabs[activeIndex].ref.current;
    if (currentTab === null) return;

    const { offsetLeft, offsetWidth } = currentTab;
    set({ left: offsetLeft + 2, width: offsetWidth - 4, immediate: true });
  }, []);

  const handleTabClick = (
    index: number,
    tabRef: React.RefObject<HTMLDivElement>
  ) => {
    setActiveIndex(index);
    onTabChange(index);

    const currentTab = tabRef.current;

    if (currentTab === null) return;

    const { offsetLeft, offsetWidth } = currentTab;
    set({ left: offsetLeft + 2, width: offsetWidth - 4 });
  };

  useEffect(() => {
    const currentTab = tabs[activeIndex].ref.current;
    if (currentTab === null) return;

    const { offsetLeft, offsetWidth } = currentTab;
    set({ left: offsetLeft + 2, width: offsetWidth - 4 });
  }, [tabs, activeIndex, set]);

  return (
    <SegmentedControlBody>
      {tabs.map((tab, index) => (
        <SegmentedControlTab
          key={tab.label}
          onClick={() => handleTabClick(index, tab.ref)}
          tabLabel={tab.label}
          tabRef={tab.ref}
          isActive={index === activeIndex}
        />
      ))}
      <ActiveTabIndicator style={{ left, width }} />
    </SegmentedControlBody>
  );
}
