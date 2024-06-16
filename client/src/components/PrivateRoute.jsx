import { Navigate } from 'react-router-dom';
import {getUserData} from "../utils"

const PrivateRoute = ({ children }) => {
  return getUserData() ? children : <Navigate to="/" />;
};

export default PrivateRoute;