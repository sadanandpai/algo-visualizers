import Home from "./Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

function Main() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default Main;
