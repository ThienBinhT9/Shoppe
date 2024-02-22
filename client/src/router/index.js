import HomeLayout from "../layouts/HomeLayout"
import HasNav from "../layouts/HasNav"
import OnlyContent from '../layouts/OnlyContent'

import Home from "../pages/Home"
import Detail from "../pages/Detail"
import Login from "../pages/Auth/login"
import Register from "../pages/Auth/register"
import Contact from '../pages/Contact'
import System from '../pages/System'
import News from '../pages/News'
import Introduce from '../pages/Introduce'
import ResultSearch from "../pages/ResultSearch"
import Cart from '../pages/Cart'
import FavoriteProduct from '../pages/FavoriteProduct'
import Profile from "../pages/Profile"
import Purchase from "../pages/Purchase"
import ConfirmSale from "../pages/ConfirmSales"
import CreateProduct from "../pages/CreateProduct"
import Product from '../pages/Products'
import Archive from "../pages/Archive"
import Discount from "../pages/Discount"
import Checkout from "../pages/Checkout"

const router = [
    {path:'/', element:Home, layout:HomeLayout},
    {path:'/chi-tiet/:product_id', element:Detail, layout: HomeLayout},
    {path:'/xu-ly-thanh-toan', element:Checkout, layout: HomeLayout},
    {path:'/dang-ki', element:Register},
    {path:'/dang-nhap', element:Login},
    {path:'/lien-he', element:Contact},
    {path:'/he-thong', element:System},
    {path:'/tin-tuc', element:News},
    {path:'/gioi-thieu', element:Introduce},
    {path:'/tim-kiem', element:ResultSearch},
    {path:'/gio-hang', element:Cart},
    {path:'/san-pham', element:Product},
    {path:'/san-pham/:type', element:Product},
    {path:'/san-pham-yeu-thich', element:FavoriteProduct},
    {path:'/user/kho-luu-tru', element:Archive, layout:HasNav},
    {path:'/user/tai-khoan-cua-toi', element:Profile, layout:HasNav},
    {path:'/user/dang-san-pham', element:CreateProduct, layout:HasNav},
    {path:'/user/ma-giam-gia', element:Discount, layout:HasNav},
    {path:'/user/don-mua', element:Purchase, layout:HasNav},
    {path:'/xac-nhan-ban-hang', element:ConfirmSale, layout:OnlyContent},
]

export default router
