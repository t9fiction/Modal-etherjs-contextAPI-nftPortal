import { Install } from './components/Install';
import Home from './components/Home';
import Connect from './components/Connect';

function App() {
 
  if (window.ethereum) {
    return(
      <div>
      <Connect />
      <Home />
      </div>
      )
  } else {
    return <Install />
  }
}

export default App;