"use client"; // This makes sure it's a Client Component

import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
