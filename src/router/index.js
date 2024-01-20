import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import StartPage from '../pages/StartPage';

export const publicRoutes = [
    { path: '/', element: StartPage },
    { path: '/register', element: RegisterPage },
    { path: '/login', element: LoginPage },
    {path: '*', element: StartPage}
];

export const privateRoutes = [
    { path: '/', element: StartPage },
    { path: '/register', element: RegisterPage },
    { path: '/login', element: LoginPage },
    {path: '*', element: StartPage} 
];
