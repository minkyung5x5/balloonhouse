import styles from "./App.module.css"
import Balloon from "./Balloon"
import House from "./House"


function App() {
  return (
    <div className={styles.sky}>
      <Balloon />
      <House />
    </div>
  );
}

export default App;
