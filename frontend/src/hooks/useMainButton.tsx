import { useEffect, useRef } from "react";

export default function useMainButton(
  callback: () => void,
  deps: unknown[],
  text: string
) {
  const callbackRef = useRef(callback);
  const { MainButton } = window.Telegram.WebApp;

  useEffect(() => {
    MainButton.setText(text);
  }, [text]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleMainButtonClick() {
      if (callbackRef.current) {
        callbackRef.current();
      }
    }

    MainButton.offClick(handleMainButtonClick);
    if (deps.every((dep) => dep !== "" && dep !== "-")) {
      MainButton.onClick(handleMainButtonClick);
      MainButton.show();
    } else {
      MainButton.hide();
    }

    return () => {
      MainButton.offClick(handleMainButtonClick);
      MainButton.hide();
    };
  }, [callbackRef.current, ...deps]);
}
