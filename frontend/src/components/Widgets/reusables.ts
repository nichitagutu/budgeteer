import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.bg_color};

  padding: 0.5rem;

  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalContainer = styled(Container)`
  height: 100%;
  border-radius: 0;
  align-items: center;
`;

export const Button = styled.button`
  font-size: 1rem;
  font-weight: 500;
  width: 8.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
  border: none;
  background-color: ${(props) => props.theme.button_color};
  color: ${(props) => props.theme.button_text_color};
  cursor: pointer;
`;

export const Header = styled.h3``;
