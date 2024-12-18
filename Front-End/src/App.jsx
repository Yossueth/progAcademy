import Routing from "./routes/Routing";
import './App.css'
import AcademyProvider from "./components/Context/AcademyProvider";

function App() {
  return (
    <div>
      <AcademyProvider>
        <Routing />
      </AcademyProvider>
    </div>
  );
}

export default App;
