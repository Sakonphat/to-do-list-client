import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import MainRoute from "./routes/MainRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import {ToastContainer} from "react-toastify";

const history = createBrowserHistory();

function App() {
  return (
      <Router history={history}>
          <div>
              <ToastContainer/>
              <Switch>
                  <MainRoute exact path="/" component={Home} />
                  <MainRoute exact path="/login" component={Login} />
                  <MainRoute exact path="/register" component={Register} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
