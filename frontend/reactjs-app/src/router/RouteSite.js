import Home from "../pages/site/Home";
import OrderDetail from "../pages/site/OrderDetail";
import productdetail from "../pages/site/ProductDetails";
import Productfortune from "../pages/site/Productfortune";
import ShoppingCart from "../pages/site/ShoppingCart";
import Login from "../layouts/LayoutSite/Login";
import user from "../pages/site/user";
import Register from "../layouts/LayoutSite/Register";
import CategoryFortune from "../pages/site/Categoryfortune";
import BrandFortune from "../pages/site/Brandfortune";
import TagFortune from "../pages/site/Tagfortune";
const RouteSite = [
    { path: '/', component: Home },

    { path: '/productdetail/:id', component: productdetail },

    { path: '/productfortune', component: Productfortune },

    { path: '/card', component: ShoppingCart },

    { path: '/orderdetail/:id', component: OrderDetail },

    { path: '/login', component: Login },

    { path: '/register', component: Register },

    { path: '/user', component: user },
    
    { path: '/categoryFortune/:id', component: CategoryFortune },

    { path: '/brandFortune/:id', component: BrandFortune },

    { path: '/tagFortune/:id', component: TagFortune },
];
export default RouteSite;