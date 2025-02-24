import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ProtectedRoute = ({ element }) => {
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwt_token');
    return jwtToken ? element : <Navigate to='/authenticate' />;
};

export default ProtectedRoute;
