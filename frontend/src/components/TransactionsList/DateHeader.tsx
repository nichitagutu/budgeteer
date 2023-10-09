import styled from "styled-components";

const DateTextStyled = styled.div`
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 10px;
  color: #8e8e93;
`;

interface DateHeaderProps {
  date: string;
}

const DateHeader: React.FC<DateHeaderProps> = ({ date }) => {
  return <DateTextStyled>{date}</DateTextStyled>;
};

export default DateHeader;
