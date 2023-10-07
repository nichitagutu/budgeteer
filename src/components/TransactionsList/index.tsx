import React from "react";
import styled from "styled-components";
import DateHeader from "./DateHeader"; // Adjust path if required
import TransactionListItem from "./TransactionListItem"; // Adjust path if required

interface Transaction {
  id: number;
  value: number;
  createdAt: string;
  category: string;
  description: string;
}

const SublistContainer = styled.div``;

const TransactionListItemContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const SublistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

interface TransactionsListProps {
  transactions: Transaction[];
}

export default function TransactionsList({
  transactions,
}: TransactionsListProps) {
  const groupedData = transactions.reduce<Record<string, Transaction[]>>(
    (acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {}
  );

  return (
    <SublistsContainer>
      {Object.entries(groupedData).map(([date, transactions]) => (
        <SublistContainer key={date}>
          <DateHeader date={date} />

          <TransactionListItemContainer>
            {transactions.map((transaction) => (
              <TransactionListItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </TransactionListItemContainer>
        </SublistContainer>
      ))}
    </SublistsContainer>
  );
}
