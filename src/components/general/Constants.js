import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

export function usePrimary() {
  const { darkMode } = useContext(DarkModeContext);

  return darkMode ? "#815eff" : "#6439FF";
}
