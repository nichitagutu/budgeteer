import { useEffect, useLayoutEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

const TabsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 5vh;
  background-color: rgba(116, 116, 128, 0.08);
  border-radius: 8.91px;
`;

const Tab = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
`;

const ActiveTabIndicator = styled(animated.div)`
  position: absolute;
  height: 88%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04),
    0px 3px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 6.93px;
`;

export default function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [{ left, width }, set] = useSpring(() => ({
    left: 0,
    width: 0,
    config: { tension: 1000, friction: 100 },
  }));

  useLayoutEffect(() => {
    const { offsetLeft, offsetWidth } = tabs[activeIndex].ref.current;
    set({ left: offsetLeft, width: offsetWidth, immediate: true });
  }, []);

  const handleTabClick = (index, tabRef) => {
    setActiveIndex(index);
    const { offsetLeft, offsetWidth } = tabRef.current;
    set({ left: offsetLeft, width: offsetWidth });
  };

  useEffect(() => {
    const { offsetLeft, offsetWidth } = tabs[activeIndex].ref.current;
    set({ left: offsetLeft, width: offsetWidth });
  }, [tabs, activeIndex, set]);

  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={tab.label}
          onClick={() => handleTabClick(index, tab.ref)}
          ref={tab.ref}
        >
          <p
            style={{
              zIndex: 100,
            }}
          >
            {tab.label}
          </p>
        </Tab>
      ))}
      <ActiveTabIndicator style={{ left, width }} />
    </TabsContainer>
  );
}
