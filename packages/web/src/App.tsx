import "./App.module.scss";
import { useResponsiveSetup } from "./features/responsive/useResponsiveSetup";
import styles from "./App.module.scss";
import Navigation from "./components/Navigation/Navigation";
import Notifications from "./components/Notifications/Notifications";
import MainNav from "./components/MainNav/MainNav";

console.log("hi");

function App() {
  useResponsiveSetup();

  return (
    <div className="App">
      {/* <MainNav /> */}
      <Navigation />
      <Notifications />
    </div>
  );
}

export default App;
