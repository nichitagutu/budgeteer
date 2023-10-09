import { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useTheme } from "styled-components";

export default function ModalWindow({
  isOpen,
  children,
  initialRender,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  initialRender: React.MutableRefObject<boolean>;
}) {
  const animation = useSpring({
    from: {
      transform: "translateY(100%)",
      opacity: 0.5,
    },
    to: { transform: "translateY(0%)", opacity: 1 },
    reverse: !isOpen,
    immediate: initialRender.current,
  });

  useEffect(() => {
    initialRender.current = false;
  }, []);

  const theme = useTheme();

  return (
    <animated.div
      style={{
        ...animation,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: theme.secondary_bg_color,
        zIndex: 9999,
      }}
    >
      {children}
    </animated.div>
  );
}
