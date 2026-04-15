import { useContext } from "react";
import { ShoppingContext } from "../store/ShoppingContext";

export function useShopping() {
  return useContext(ShoppingContext);
}