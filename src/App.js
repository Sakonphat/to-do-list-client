import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter,
    Switch
} from "react-router-dom";
// import { createBrowserHistory } from 'history';
import MainRoute from "./routes/MainRoute";
import TaskBoard from "./components/TaskBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import SessionExpired from "./components/SessionExpired";
import {ToastContainer} from "react-toastify";

// const history = createBrowserHistory();

function App() {

    const toastStyle = {
        marginTop: "3rem"
    }

  return (
      <BrowserRouter>
          <div>
              <ToastContainer style={toastStyle}/>
              <Switch>
                  <MainRoute exact path="/" isPrivate={true} component={TaskBoard} />
                  <MainRoute exact path="/login" isPrivate={false} component={Login} />
                  <MainRoute exact path="/register" isPrivate={false} component={Register} />
                  <MainRoute exact path="/session-expired" isPrivate={false} component={SessionExpired} />
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
