import MoonGif from "../../assets/moon.gif";
import styled from "styled-components";

const Text = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 290px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const AddTransactionButton = styled.div`
  color: #0a84ff;
`;

export default function EmptyTransactionsPagePlaceholder() {
  function onAddTransactionButtonClick() {
    console.log("onAddTransactionButtonClick");
  }

  return (
    <Body>
      <img width={"94px"} height={"94px"} src={MoonGif} alt="Moon" />

      <Text>
        To add an income or a spend click on the green or red graph above.
      </Text>

      <AddTransactionButton onClick={onAddTransactionButtonClick}>
        Add Transaction
      </AddTransactionButton>
    </Body>
  );
}
