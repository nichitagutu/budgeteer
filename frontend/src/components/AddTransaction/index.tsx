import styled, { useTheme } from "styled-components";
import { Button, Header, ModalContainer } from "../Widgets/reusables";
import { useEffect, useState } from "react";
import LeftChevron from "../../assets/left-chevron.svg";
import MonthPick from "../../assets/double-chevrons.svg";
import EmojiPicker from "emoji-picker-react";

import axios from "axios";
import { blurColor, invertColor } from "../../utils";
import { API_URL } from "../../constants";
import useMainButton from "../../hooks/useMainButton";

export default function AddTransaction({
  type: transactionType,
  exited
}: {
  type: "Income" | "Spend";
  exited: boolean;
}) {
  const [type, setType] = useState(transactionType);
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("Tag");
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [description, setDescription] = useState("Description");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [emoji, setEmoji] = useState("😀");

  const initData = window.Telegram.WebApp.initData;
  const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

  useEffect(() => {
    setType(transactionType);
  }, [transactionType]);

  useEffect(() => {
    if (exited) {
      setInputValue("");
      setCategory("Tag");
      setIsEditingCategory(false);
      setDescription("Description");
      setIsEditingDescription(false);
      setEmoji("😀");
    }
  }, [exited]);

  async function fetchTransactions() {
    const response = await axios.get(
      `${API_URL}/transactions/user/${initDataUnsafe?.user?.id}`,
      {
        params: {
          initData,
        },
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "lmao",
        },
      }
    );

    const transactions = response.data;
    return transactions;
  }

  const user = initDataUnsafe.user;

  async function saveTransaction() {
    const response = await axios.post(
      `${API_URL}/transactions`,
      {
        user_id: user.id,
        value: type === "Income" ? +inputValue : -inputValue,
        description,
        category,
        emoji,
      },
      {
        params: {
          initData,
        },
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "lmao",
        },
      }
    );

    const transactions = response.data;
    return transactions;
  }

  useMainButton(
    () => {
      console.log(
        "handleMainButtonClick",
        inputValue,
        description,
        category,
        emoji
      );
    },
    [inputValue, description, category, emoji],
    "Save"
  );

  return (
    <ModalContainer>
      <Wrapper>
        <UpperPart>
          <HeaderWrapper>
            <Header>Add {type}</Header>
            <Button onClick={saveTransaction}>Save</Button>
          </HeaderWrapper>
          <DropdownButton type={type} setType={setType} />
          <TagsWrapper>
            <LeftSide>
              <EmojiButton emoji={emoji} setEmoji={setEmoji} />
              <TagsTextWrapper>
                {isEditingDescription ? (
                  <TagInput
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setIsEditingDescription(false)}
                    autoFocus
                  />
                ) : isEditingCategory ? (
                  <TagWrapper
                    onClick={() => setIsEditingDescription(true)}
                    style={{ cursor: "pointer" }}
                  >
                    {description}
                  </TagWrapper>
                ) : (
                  <Tag
                    onClick={() => setIsEditingDescription(true)}
                    style={{ cursor: "pointer" }}
                  >
                    {description}
                  </Tag>
                )}
                {isEditingCategory ? (
                  <TagInput
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={() => setIsEditingCategory(false)}
                    autoFocus
                  />
                ) : (
                  <TagWrapper
                    onClick={() => setIsEditingCategory(true)}
                    style={{ cursor: "pointer" }}
                  >
                    {category}
                  </TagWrapper>
                )}
              </TagsTextWrapper>
            </LeftSide>
            <RightSide>
              <img src={LeftChevron} />
            </RightSide>
          </TagsWrapper>
          <InputWrapper>
            <InputSign>{type === "Income" ? "+" : "-"}$</InputSign>
            <Input
              style={{
                width: computeWidth(inputValue),
              }}
              placeholder="0.00"
              value={inputValue}
              onChange={(e) => {
                setInputValue(parseInputValue(e.target.value));
              }}
              type="text"
              inputMode="decimal"
              lang="en-UK"
            />
          </InputWrapper>
        </UpperPart>
      </Wrapper>
    </ModalContainer>
  );
}

function EmojiButton({ emoji, setEmoji }) {
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setEmoji(emojiObject.emoji);
    setEmojiPickerOpen(false);
  };

  return (
    <div>
      <EmojiButtonWrapper
        onClick={() => setEmojiPickerOpen(!isEmojiPickerOpen)}
      >
        {emoji}
      </EmojiButtonWrapper>
      {isEmojiPickerOpen && (
        <EmojiPickerWrapper>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            width={"100%"}
            height={"350px"}
            autoFocusSearch={false}
          />
        </EmojiPickerWrapper>
      )}
    </div>
  );
}

const EmojiButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
`;

function DropdownButton({
  type,
  setType,
}: {
  type: string;
  setType: (type: string) => void;
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const theme = useTheme();

  const backgroundColor = theme.bg_color.startsWith("#")
    ? theme.bg_color
    : window.Telegram.WebApp.themeParams.bg_color;
  const invertedBackgroundColor = invertColor(backgroundColor);
  const borderColor = blurColor(
    invertedBackgroundColor,
    invertedBackgroundColor,
    0.085
  );

  return (
    <Container>
      <Overlay
        show={isDropdownOpen}
        onClick={() => {
          setDropdownOpen(false);
        }}
      />
      <DropdownButtonWrapper onClick={() => setDropdownOpen(!isDropdownOpen)}>
        {type}
        <MonthPickIcon src={MonthPick} alt="Month Picker" />
      </DropdownButtonWrapper>
      <Dropdown bgColor={backgroundColor} isOpen={isDropdownOpen}>
        <DropdownItem
          onClick={() => {
            setType("Income");
            setDropdownOpen(false);
          }}
          isUpper
          borderColor={borderColor}
        >
          Income
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            setType("Spend");
            setDropdownOpen(false);
          }}
          isUpper={false}
          borderColor={borderColor}
        >
          Spend
        </DropdownItem>
      </Dropdown>
    </Container>
  );
}

const DropdownButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.link_color};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const UpperPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

const Tag = styled.p`
  font-size: 1rem;
`;

const TagInput = styled.input`
  font-size: 1rem;
  border: none;
  outline: none;
`;

const TagWrapper = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.hint_color};
`;

const EmojiWrapper = styled.div`
  height: 40px;
  width: 40px;
  font-size: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TagsTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function parseInputValue(inputValue: string) {
  const localizedInput = inputValue.replace(",", ".");
  const parsedValue = Number.parseFloat(localizedInput);
  if (isNaN(parsedValue)) return "";
  if (localizedInput.endsWith(".")) {
    if (localizedInput.split(".").length > 2) {
      return localizedInput.slice(0, -1);
    } else {
      return localizedInput;
    }
  }

  return parsedValue.toString();
}

function computeWidth(inputValue: string) {
  return `${(inputValue.length < 5 ? 5 : inputValue.length) * 1.2}rem`;
}

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  justify-self: flex-end;

  padding-left: 1rem;
  padding-right: 1rem;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;

  gap: 0.4rem;

  align-items: center;
`;

const RightSide = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  color: ${(props) => props.theme.text_color};
  font-size: 1.75rem;
  font-weight: 500;
`;

const InputSign = styled.p``;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;

  color: ${(props) => props.theme.text_color};
  font-size: 2rem;
  font-weight: 500;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  align-items: center;
`;

const Overlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 777;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MonthPickIcon = styled.img`
  margin-top: 2px;
`;

const Dropdown = styled.div<{ isOpen: boolean; bgColor: string }>`
  position: absolute;
  top: 100%;
  left: 50%;
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.bgColor};
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(25px);
  border-radius: 12px;
  max-width: 600px;
  width: 250px;
  z-index: 888;
  opacity: 0;
  transform: translate(-50%, -10px);
  visibility: hidden;
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;

  ${(props) =>
    props.isOpen &&
    `
    opacity: 1;
    transform: translate(-50%, 0); /* Adjust this line */
    visibility: visible;
  `}

  &::-webkit-scrollbar {
    display: none;
  }

  overflow: hidden;
`;

const DropdownItem = styled.div<{ isUpper: boolean; borderColor: string }>`
  padding: 0.6rem;
  border-bottom: ${(props) =>
    props.isUpper ? `1px solid ${props.borderColor}` : "none"};
`;
