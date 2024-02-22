import axios from "axios"
import jwt_decode from 'jwt-decode'
import { handleRefreshToken } from '../redux/requestService/auth.request'

const formatPathToTitleV2 = (path) => {
    
    switch (path) {
        case 'gioi-thieu':
            return 'Giới thiệu'
        case 'he-thong':
            return 'Hệ thống'
        case 'tin-tuc':
            return 'Tin tức'
        case 'lien-he':
            return 'Liên hệ'
        case 'dang-ki':
            return 'Đăng kí'
        case 'dang-nhap':
            return 'Đăng nhập'
        case 'gio-hang':
            return 'Giỏ hàng'
        case 'san-pham-yeu-thich':
            return 'Sản phẩm yêu thích'
        case 'tim-kiem':
            return 'Tìm kiếm'
        case 'san-pham':
            return 'Sản phẩm'
        case 'kho-luu-tru':
            return 'Kho lưu trữ'
        case 'quan-ao':
            return 'Quần áo'
        case 'do-dien-tu':
            return 'Đồ điện tử'
        case 'ao':
            return 'Áo'
        case 'quan':
            return 'Quần'
        case 'giay':
            return 'Giày - Dép'
        case 'mu':
            return 'Mũ'
        case 'tu-lanh':
            return 'Tủ lạnh'    
        case 'ti-vi':
            return 'Tivi'
        case 'dien-thoai':
            return 'Điện thoại'
        case 'may-tinh':
            return 'Máy tính'                              
        default:
            return ''
    }
}

function normalizeNumber(number) {
    return number?.toLocaleString('vi-VN');
}

const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create()

    newInstance.interceptors.request.use(
        async(config) => {
            let date = new Date()

            const decoded_token = jwt_decode(user.access_token)

            if(decoded_token.exp < date.getTime()/1000){
                const tokens = await handleRefreshToken(user._id, user.refresh_token)
                const refreshUser = {
                    ...user,
                    ...tokens
                }
                dispatch(stateSuccess(refreshUser))
                config.headers = {
                    'x-client-id':user._id,
                    refresh_token:tokens.refresh_token,
                    access_token:tokens.access_token
                }
            }

            return config
        },(err) => new Promise.reject(err)
    )

    return newInstance
}

const totalPriceOrderd = (products = []) => {
    return products.reduce((acc, product) => {
        return acc += (Number(product.product_price) * product.quantity)
    },0)
}

const formatDataProductCheckout = (products = [], cartId, discount) => {
    /*
        output = [
            {
                product_shop,
                products:[
                    {
                        ...product_01,
                        ...product_02
                    }
                ]
            },
            {
                product_shop,
                products:[
                    {
                        ...product_01,
                        ...product_02
                    }
                ]
            },
        ] 
    */
    const output = {
        cartId,
        shop_order_ids:[]
    }
    let unique_roduct_userId = new Set(products.map(product => product.product_userId));
    const arr_product_userId =  [...unique_roduct_userId]

    arr_product_userId.forEach(product_userId => {
        const data = {
            product_userId,
            discount_id:'',
            products:[]
        }
        if(product_userId === discount?.discount_userId){
            data.discount_id = discount?._id
        }
        products.forEach(product => {
            if(product_userId === product.product_userId){
                data.products.push(product)
            }
        })
        output.shop_order_ids.push(data)
    })
    
    return output
}


const validateInput = (type, value) => {
    switch (type) {
        case 'username':{
            if(value.length < 2 || value.length > 20 || !value) return false
            return true
        }
        case 'email':{
            if(!value || value.length > 50 || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))) return false
            return true
        }
        default:
            return false
    }
}

function chuyenDoiThoiGian(str) {
    const ngayGio = new Date(str);
    const ngay = ngayGio.toLocaleDateString('en-US');
    const gio = ngayGio.toLocaleTimeString('en-US');
    
    return `${gio} - ${ngay}`
}

function convertNumberToShortString(number) {
    if (number >= 1000) {
        const thousands = Math.floor(number / 1000);
        const remainder = number % 1000;
        const remainderString = remainder !== 0 ? `.${remainder}` : '';
        return `${thousands}${remainderString}k`;
    }
    return number.toString();
}

export { 
    formatPathToTitleV2, 
    createAxios, 
    validateInput, 
    normalizeNumber, 
    chuyenDoiThoiGian, 
    convertNumberToShortString, 
    totalPriceOrderd,
    formatDataProductCheckout
}

