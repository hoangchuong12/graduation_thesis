import Home from "../pages/site/Home";
import OrderDetail from "../pages/site/OrderDetail";
import productdetail from "../pages/site/ProductDetails";
import Productfortune from "../pages/site/Productfortune";
import ShoppingCart from "../pages/site/ShoppingCart";
import Login from "../layouts/LayoutSite/Login";
import user from "../pages/site/user";
import Register from "../layouts/LayoutSite/Register";
const RouteSite = [
    { path: '/', component: Home },

    { path: '/productdetail/:id', component: productdetail },

    { path: '/productfortune', component: Productfortune },

    { path: '/card', component: ShoppingCart },

    { path: '/orderdetail/:id', component: OrderDetail },

    { path: '/login', component: Login },

    { path: '/register', component: Register },

    { path: '/user', component: user },
    
];
export default RouteSite;