import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.secondary_bg_color};

  padding: 0.5rem;

  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Header = styled.h3``;
