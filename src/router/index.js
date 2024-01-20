import Calorie from '../pages/Calorie';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Start from '../pages/Start';

export const publicRoutes = [
    { path: '/', element: Start },
    { path: '/register', element: Register },
    { path: '/login', element: Login },
    { path: '/calorie', element: Calorie },
];

export const privateRoutes = [];
