import { useState } from "react";
import type { ViewType } from "../types";

export function useAppState() {
  const [view, setView] = useState<ViewType>("game");

  function toggleView() {
    setView((prev) => (prev === "game" ? "blog" : "game"));
  }

  return {
    view,
    toggleView,
  };
}
