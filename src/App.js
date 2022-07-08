import { Install } from './components/Install';
import Home from './components/Home';
import Connect from './components/Connect';
import { GlobalStore } from './context/GlobalState'

function App() {
  const { totalMinted } = GlobalStore();
  // console.log("Contract : ", contract)
  // console.log("Contract : ", signer)
  // console.log("Contract : ", provider)
  if (window.ethereum) {
    return (
      <div>
          <Connect />
          <Home />
          {/* <button onClick={()=>getCount()}>getCount</button> */}
          {totalMinted}
      </div>
    )
  } else {
    return <Install />
  }
}

export default App;