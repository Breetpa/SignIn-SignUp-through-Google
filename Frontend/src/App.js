import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import EditUser from "./pages/EditUser";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserList from "./pages/UserList";
import Alert from "./components/Alert";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert></Alert>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/edit" element={<EditUser />} />
          <Route exact path="/userlist" element={<UserList />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
