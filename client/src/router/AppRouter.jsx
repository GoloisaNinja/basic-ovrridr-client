import {createBrowserRouter} from 'react-router-dom';
//import NavBar from '../components/NavBar';
//import Footer from '../components/Footer';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/Dashboard';


const AppRouter = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />,
        },{
            path: "/dashboard",
            element: <DashboardPage />,
        }
    ]);

export default AppRouter;