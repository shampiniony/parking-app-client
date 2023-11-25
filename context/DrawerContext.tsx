import { createContext } from "react";

export interface DrawerContext {
  extended: boolean,
  setExtended: (value: boolean) => void,
}

export const DrawerContext = createContext<DrawerContext>({
  extended: false,
  setExtended: (vale : boolean) => {}
});