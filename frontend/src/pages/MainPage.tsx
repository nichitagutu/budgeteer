import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import ExpensesData from "../components/Widgets/ExpensesData";
import { mockPieChartData } from "../mock";
import BalanceHero from "../components/BalanceHero";
import SpendingFrequency from "../components/Widgets/SpendingFrequency";
import FinancialHealth from "../components/Widgets/FinancialHealth";
import SegmentedControl from "../components/SegmentedControl";
import BillsAndSubs from "../components/Widgets/Bills&Subs";
import { BillsAndSubsData } from "../types";
import TransasctionsList from "../components/TransactionsList";
import useParsedInitData from "../hooks/useParsedInitData";
import axios from "axios";
import ModalWindow from "../components/ModalWindow";
import AddTransaction from "../components/AddTransaction";
import useTransactions from "../hooks/useTransactions";
import { INIT_DATA } from "../constants";

const billsAndSubsData: BillsAndSubsData[] = [
  {
    due: new Date(2021, 2, 1),
    amount: 500,
    name: "Netflix",
    tags: ["Entertainment", "Subscriptions"],
  },
  {
    due: new Date(2021, 2, 2),
    amount: 1000,
    name: "Rent",
    tags: ["Housing", "Bills"],
  },
  {
    due: new Date(2021, 2, 3),
    amount: 200,
    name: "Spotify",
    tags: ["Entertainment", "Subscriptions"],
  },
  {
    due: new Date(2021, 2, 4),
    amount: 100,
    name: "Phone",
    tags: ["Bills", "Subscriptions"],
  },
];

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.bg_color};
  color: ${(props) => props.theme.text_color};
  margin: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const AnimatedContainer = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`);

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"Income" | "Spend">(
    "Income"
  );
  const Tabs = ["Analytics", "Transactions"];
  const [activeTab, setActiveTab] = useState<string>(Tabs[0]);
  const [prevTabIndex, setPrevTabIndex] = useState<number>(0);
  const initialRender = useRef(true);
  const { transactions, loading, error } = useTransactions(
    INIT_DATA,
    "428313379"
  );

  function onTabChange(index: number) {
    setActiveTab(Tabs[index]);
    setPrevTabIndex(activeTab === Tabs[0] ? 0 : 1);
    initialRender.current = false;
  }

  const isMovingRight = prevTabIndex < (activeTab === Tabs[0] ? 0 : 1);

  const transitions = useTransition(activeTab, {
    from: {
      transform: initialRender.current
        ? "translateX(0%)"
        : isMovingRight
        ? "translateX(120%)"
        : "translateX(-120%)",
    },
    enter: {
      transform: "translateX(0%)",
    },
    leave: {
      transform: isMovingRight ? "translateX(-120%)" : "translateX(120%)",
    },
    config: { tension: 1750, friction: 100 },
  });

  const initData = useParsedInitData();

  if (initData) {
    console.log(initData);
  }

  useEffect(() => {
    async function requestTransactions() {
      const response = await axios.get(
        "https://db0a-78-128-179-166.ngrok-free.app/transactions/user/428313379",
        {
          params: {
            initData:
              "query_id=AAEji4cZAAAAACOLhxk7NlGT&user=%7B%22id%22%3A428313379%2C%22first_name%22%3A%22Nichita%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22vsmisl3%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1696850240&hash=522c7cad973382450f8f064c6fdebcbc262df05719bcd14548ad2853a9100a15",
          },
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(response.data);
      const transactions = response.data;

      return transactions;
    }

    const reuslt = requestTransactions();
    console.log(reuslt);
  });

  function setOpenAddTransaction(type: "Income" | "Spend") {
    setTransactionType(type);
    setIsOpen(true);
  }

  function setCloseAddTransaction() {
    setIsOpen(false);
    setExitModal(true);
  }

  useEffect(() => {
    if (isOpen) {
      window.Telegram.WebApp.BackButton.onClick(setCloseAddTransaction);
      window.Telegram.WebApp.BackButton.show();
    } else {
      setExitModal(false);
      window.Telegram.WebApp.BackButton.offClick(setCloseAddTransaction);
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [isOpen]);

  const [exitModal, setExitModal] = useState(false);

  return (
    <MainWrapper>
      {loading || !transactions ? (
        <BalanceHero
          setOpenAddTransaction={setOpenAddTransaction}
          transactionData={{}}
        />
      ) : (
        <BalanceHero
          transactionData={transactions}
          setOpenAddTransaction={setOpenAddTransaction}
        />
      )}
      <SegmentedControl onTabChange={onTabChange} tabNames={Tabs} />
      <ContentContainer>
        {transitions((style, item) =>
          item === "Analytics" ? (
            <AnimatedContainer style={style}>
              {loading || !transactions ? (
                <>
                  <ExpensesData
                    expensesData={mockPieChartData}
                    setOpenAddTransaction={setOpenAddTransaction}
                  />
                  <FinancialHealth />
                  <SpendingFrequency />
                  <BillsAndSubs data={billsAndSubsData} />
                </>
              ) : (
                <>
                  <ExpensesData
                    setOpenAddTransaction={setOpenAddTransaction}
                    expensesData={transactions.pieChartData}
                  />
                  <FinancialHealth
                    percentage={
                      transactions.totalExpenses
                        ? (transactions.totalIncome /
                            transactions.totalExpenses) *
                          100
                        : 0
                    }
                  />
                  <SpendingFrequency />
                  <BillsAndSubs data={billsAndSubsData} />
                </>
              )}
            </AnimatedContainer>
          ) : (
            <AnimatedContainer style={style}>
              {loading || !transactions ? (
                <p>Loading...</p>
              ) : (
                <TransasctionsList transactions={transactions.transactions} />
              )}
            </AnimatedContainer>
          )
        )}
      </ContentContainer>

      <ModalWindow isOpen={isOpen} initialRender={initialRender}>
        <AddTransaction exited={exitModal} type={transactionType} />
      </ModalWindow>
    </MainWrapper>
  );
}
