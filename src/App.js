import './App.css';
import Forms from './pages/Form';
import Signin from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Otp from './pages/Otp'
import ChangePassword from './pages/ChangePassword';
import AdminPanel from './pages/AdminPanel';
import Details from './pages/Details';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterUsers from './pages/AdminRegister';
import Home from './pages/Home';
import DataContextState from './context/dataContextState';
import ViewProfile from './pages/ViewProfile';
import WelcomePage from './pages/WelcomePage';
function App() {
  return (
    <DataContextState>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} ></Route>
          <Route exact path='/sign-in' component={Signin}></Route>
          <Route exact path='/homepage' component={Forms}></Route>
          <Route exact path='/admin-panel' component={AdminPanel}></Route>
          <Route exact path='/forgotPassword' component={ForgotPassword}></Route>
          <Route exact path='/otp' component={Otp}></Route>
          <Route exact path='/register' component={RegisterUsers}></Route>
          <Route exact path='/change-password' component={ChangePassword}></Route>
          <Route exact path='/details/:sapId' render={(props) => <Details {...props} />}></Route>
          <Route exact path='/view' component={ViewProfile}></Route>
          <Route exact path='/welcome' component={WelcomePage}></Route>
          <Route component={Home}></Route>
        </Switch>
      </Router>
    </DataContextState>
  );
}

export default App;
