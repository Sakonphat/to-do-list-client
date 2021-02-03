import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter,
    Switch
} from "react-router-dom";
// import { createBrowserHistory } from 'history';
import MainRoute from "../routes/MainRoute";
import TaskBoard from "./TaskBoard";
import Login from "./Login";
import Register from "./Register";
import {ToastContainer} from "react-toastify";
import GlobalModal from "../components/Modals/GlobalModal"
import {useSelector} from "react-redux";

// const history = createBrowserHistory();

function App() {

    const toastStyle = {
        marginTop: "3rem"
    }

    const { isOpen, title, description } = useSelector(state => state.modal);

  return (
      <BrowserRouter>
          <div>
              <ToastContainer style={toastStyle}/>
              <GlobalModal
                  backdrop="static"
                  title={title}
                  description={description}
                  show={isOpen}
              />
              <Switch>
                  <MainRoute exact path="/" isPrivate={true} component={TaskBoard} />
                  <MainRoute exact path="/login" isPrivate={false} component={Login} />
                  <MainRoute exact path="/register" isPrivate={false} component={Register} />
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
