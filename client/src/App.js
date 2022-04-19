import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import EditMovie from "./components/editMovie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
const Component1 = () => {
  return <Register/>;
};

const Component2 = () => {
  return <Login/>;
};
const Component3 = () => {
  return <Dashboard/>;
};
const Component4 = () => {
  return <EditMovie/>;
};

function App() {
  let routes = useRoutes([
    { path: "/", element: <Component1 /> },
    { path:"/login", element: <Component2 /> },
    { path:"/dashboard", element: <Component3 /> },
    { path:"/edit/:id", element: <Component4 /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
  

export default AppWrapper;
