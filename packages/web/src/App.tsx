import "./App.module.scss";
import { useResponsiveSetup } from "./features/responsive/useResponsiveSetup";
import styles from "./App.module.scss";
import Navigation from "./components/Navigation/Navigation";
import Notifications from "./components/Notifications/Notifications";

function App() {
  useResponsiveSetup();

  return (
    <div className="App">
      <Navigation />
      <Notifications />
    </div>
  );
}

export default App;
