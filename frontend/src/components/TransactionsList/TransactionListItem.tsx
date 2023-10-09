import styled from "styled-components";
import { CurrencyNumber } from "../CurrencyNumber";

const TransactionRecordStyled = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--tg-theme-bg-color);
  padding: 10px 1rem;
`;

const Description = styled.span`
  font-size: 17px;
  font-weight: 500;
`;

const Category = styled.span`
  font-size: 14px;
  color: #8e8e93;
  font-weight: 300;
  text-transform: lowercase;
`;

const Value = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-left: auto;
  display: flex;
`;

const TransactionType = styled.div`
  font-size: 14px;
`;

const IconContainer = styled.div``;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
`;

const DescriptionCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-left: 10px;
  align-items: center;
`;

const TypeValueContainer = styled.div<{ transactionType: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  color: ${(props) =>
    props.transactionType === "Income" ? "#34C759" : "#FF3B30"};
`;

interface TransactionListItemProps {
  transaction: {
    value: number;
    category: string;
    description: string;
  };
}

export default function TransactionListItem({
  transaction,
}: TransactionListItemProps) {
  const transactionType = transaction.value < 0 ? "Spend" : "Income";
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.slice(0, maxLength - 2).trim() + "..."
      : text;
  };

  return (
    <TransactionRecordStyled>
      <IconContainer>
        <Icon />
      </IconContainer>

      <DataContainer>
        <DescriptionCategoryContainer>
          <Description>{truncateText(transaction.description, 20)}</Description>
          <Category>#{truncateText(transaction.category, 20)}</Category>
        </DescriptionCategoryContainer>

        <TypeValueContainer transactionType={transactionType}>
          <Value>
            {transactionType === "Income" ? "+" : "-"}
            <CurrencyNumber
              value={
                transactionType === "Income"
                  ? transaction.value
                  : transaction.value * -1
              }
              baseSize={1.1}
              isBold={false}
              duration={1.2}
            />
          </Value>

          <TransactionType>{transactionType}</TransactionType>
        </TypeValueContainer>
      </DataContainer>
    </TransactionRecordStyled>
  );
}
