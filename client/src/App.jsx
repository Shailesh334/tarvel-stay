import Header from "./components/Header";
import Home from "./components/Home"
import {Routes , Route} from 'react-router-dom';
import NewListing from "./components/NewListing";
import SignUp from "./components/SignUp";
import ListingSingle from "./components/ListingSingle";
import EditListing from "./components/EditListing";

const App = () => {




  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:listingId" element={<ListingSingle  />} />
          <Route path="/edit/:listingId" element={<EditListing  />} />
          <Route path="/addlisting" element={<NewListing />} />
          <Route path="/login" element={<SignUp isloggedIn={true}/>} />
          <Route path="/signup" element={<SignUp isloggedIn={false}/>} />
        </Routes>
    </>
  )
}

export default App
