import Header from "./components/Header";
import Home from "./components/Home"
import {Routes , Route} from 'react-router-dom';
import NewListing from "./components/NewListing";
import SignUp from "./components/SignUp";

const App = () => {


  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addlisting" element={<NewListing />} />
          <Route path="/login" element={<SignUp isloggedIn={false}/>} />
          <Route path="/signup" element={<SignUp isloggedIn={true}/>} />
        </Routes>
    </>
  )
}

export default App
