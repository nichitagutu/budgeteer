import React from "react";
import styled from "styled-components";

const Body = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-gap: 1px;
  height: 34px;
  background-color: rgba(118, 118, 128, 0.12);
  border-radius: 9px;
  overflow: hidden;
  user-select: none;
  width: 100%;
`;

export default function SegmentedContorolBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Body>{children}</Body>
    </>
  );
}
