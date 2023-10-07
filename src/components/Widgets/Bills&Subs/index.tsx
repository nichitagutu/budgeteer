import styled, { useTheme } from "styled-components";
import { Container, Header } from "../Reusables";
import { CurrencyNumber } from "../../CurrencyNumber";
import { blurColor } from "../../../utils";
import { BillsAndSubsData, BillsAndSubsProps } from "../../../types";

const PaddedContainer = styled(Container)`
  padding-bottom: 1.2rem;
`;

export default function BillsAndSubs({ data }: BillsAndSubsProps) {
  const noData = data === undefined || data === null || data.length === 0;

  return (
    <PaddedContainer>
      <Header>Bills and subscriptions</Header>
      {noData ? (
        <Hint>
          All your reoccurring payments will be carefully remembered and tracked
          here.
        </Hint>
      ) : (
        <BillsAndSubsList data={data} />
      )}
    </PaddedContainer>
  );
}

function BillsAndSubsList({ data }: BillsAndSubsProps) {
  return (
    <BillsAndSubsListWrapper>
      {data.map((item) => (
        <BillsAndSubsItem item={item} />
      ))}
    </BillsAndSubsListWrapper>
  );
}

const BillsAndSubsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

function BillsAndSubsItem({ item }: { item: BillsAndSubsData }) {
  const theme = useTheme();
  const tagColor = blurColor(
    theme.text_color,
    window.Telegram.WebApp.themeParams.text_color,
    0.6
  );

  return (
    <ItemWrapper>
      <DueDate due={item.due} />
      <NameAndTagsWrapper>
        <Name>{item.name}</Name>
        <Tags>
          {item.tags.map((tag) => (
            <Tag textColor={tagColor} key={item.name + tag}>
              {tag}
            </Tag>
          ))}
        </Tags>
      </NameAndTagsWrapper>
      <NumberWrapper>
        <CurrencyNumber value={item.amount} baseSize={1} />
      </NumberWrapper>
    </ItemWrapper>
  );
}

const Name = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function DueDate({ due }: { due: Date }) {
  const month = months[due.getMonth()];
  const date = due.getDate();
  return (
    <DueDateWrapper>
      <Text>{month}</Text>
      <Text>{date}</Text>
    </DueDateWrapper>
  );
}

const NumberWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;

const NameAndTagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DueDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
`;

const Tag = styled.p<{ textColor: string }>`
  color: ${(props) => props.textColor};
  font-size: 0.85rem;
`;

const Text = styled.p`
  font-size: 1rem;
`;

const Hint = styled.p`
  font-size: 0.8rem;
`;
