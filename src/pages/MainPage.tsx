import { createRef } from "react";
import Tabs from "../components/Tabs";

export default function MainPage() {
  const tabs = [
    { label: "Tab 1", ref: createRef() },
    { label: "Tab 2", ref: createRef() },
    { label: "Tab 3", ref: createRef() },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}
