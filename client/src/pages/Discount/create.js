import { memo, useEffect, useState } from 'react'
import classnames from "classnames/bind";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'

import styles from './Discount.module.scss'
import {createAxios, normalizeNumber} from '../../utils'
import { published } from '../../redux/requestService/product.request'
import Model,{ ModelContent } from '../../components/Model'
import { loginSuccess } from '../../redux/authSlice';
import { createDiscount } from '../../redux/requestService/discount.request'
import Loading from '../../components/Loading'

const cx = classnames.bind(styles)

function CreateDiscount() {

    const publishedState = useSelector(state => state.product.published)
    const createDiscountState = useSelector(state => state.discount.create_discount)
    const user = useSelector(state => state.auth.current_user)

    const dispatch = useDispatch()
    const axiosInstance = createAxios(user, dispatch, loginSuccess)

    const [showModel, setShowModel] = useState(false)
    const [applyTo, setApplyTo] = useState('all')
    let [itemsApply, setItemsApply] = useState([])
    
    const handleChooseTypeApply = (e) => {
        setApplyTo(e.target.value)
        if(e.target.value === 'specific') setShowModel(true)
    }

    const handleApplyTypeisAll = () => {
        setApplyTo('all')
        setShowModel(false)
        setItemsApply([])
    }

    const handleChooseItem = (product_id) => {
        setItemsApply(prev => {
            if(itemsApply.includes(product_id)) return itemsApply.filter(id => id !== product_id)
     
            return [...prev, product_id]
        })
    }

    const handleApplyProducts = () => {
        if(itemsApply.length === 0){
            alert('Bạn chưa chọn sản phẩm được áp dụng mã giảm giá!')
            return 
        } 
        setApplyTo('specific')
        setShowModel(false)
    }

    const formik = useFormik({
        initialValues:{
            discount_name:'',
            discount_code:'',
            discount_start_day:'',
            discount_end_day:'',
            discount_type:'fixed_amount',
            discount_value:'',
            discount_min_order_value:'',
            discount_max_uses:'',
            discount_max_uses_per_user:'',
        },
        validationSchema: Yup.object({
            discount_name: Yup.string()
            .required('Bạn chưa nhập tên Voucher'),
            discount_code: Yup.string()
            .max(5, 'Mã giảm giá không được quá 5 kí tự')
            .required('Bạn chưa nhập mã Voucher'),
            discount_start_day: Yup.date()
            .required('Bạn chưa nhập ngày bắt đầu'),
            discount_end_day: Yup.date()
            .required('Bạn chưa nhập ngày kết thúc'),
            discount_type: Yup.string()
            .required('Bạn chưa nhập trường này'),
            discount_value: Yup.number()
            .required('Bạn chưa nhập số tiền giảm giá'),
            discount_min_order_value: Yup.number()
            .required('Bạn chưa nhập giá trị đơn hàng tối thiểu'),
            discount_max_uses: Yup.number()
            .required('Bạn chưa nhập tổng lượt sử dụng tối đa'),
            discount_max_uses_per_user: Yup.number()
            .required('Bạn chưa nhập lượt sử dụng tối đa mỗi người dùng'),
            discount_is_active: Yup.boolean(),
        }),
        onSubmit:(values) => {
            if(applyTo === 'all') itemsApply = []
            const data = {
                ...values,
                discount_applies_type:applyTo,
                discount_applies_products:itemsApply
            }
            createDiscount(axiosInstance, user._id, user.access_token, data, dispatch)
            setItemsApply([])
            setApplyTo('all')
        }
    })

    useEffect(() => {
        published(axiosInstance, user._id, user.access_token, dispatch)
    },[])
    

    return ( 
        <div className={cx('create')}>
            {createDiscountState.isFetching && <Loading />}
            <div className={cx('create__section')}>
                <p className={cx('create__section__title')}>Thông tin cơ bản</p>
                <div className={cx('create__section__body')}>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')} htmlFor='discount_name'>Tên chương trình giảm giá</label>
                            <input 
                                className={cx('create__item__input')} 
                                id='discount_name' 
                                value={formik.values.discount_name} 
                                placeholder='Nhập vào' 
                                onChange={formik.handleChange}
                            />
                        </div>
                        <p className={cx('create__item__note')}>Tên Voucher sẽ không được hiển thị cho người mua</p>
                        {formik.errors.discount_name && formik.touched.discount_name && <p className={cx('create__item__error-message')}>{formik.errors.discount_name}</p>}
                    </div>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')} htmlFor='discount_code'>Mã Voucher</label>
                            <input 
                                className={cx('create__item__input')} 
                                id='discount_code' 
                                value={formik.values.discount_code} 
                                placeholder='Nhập vào' 
                                maxLength={5} 
                                onChange={formik.handleChange}
                            />
                        </div>
                        <p className={cx('create__item__note')}>{'Vui lòng chỉ nhập các kí tự chữ cái (A-Z), số (0-9), tối đa 5 kí tự'}</p>
                        {formik.errors.discount_code && formik.touched.discount_code && <p className={cx('create__item__error-message')}>{formik.errors.discount_code}</p>}

                    </div>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')} htmlFor='discount_code'>Thời gian sử dụng mã</label>
                            <div className={cx('create__item__choose')}>
                                <input className={cx('create__item__choose__date')} id='discount_start_day' type='datetime-local' value={formik.values.discount_start_day} onChange={formik.handleChange}/>
                                <input className={cx('create__item__choose__date')} id='discount_end_day' type='datetime-local' value={formik.values.discount_end_day} onChange={formik.handleChange} />
                            </div>
                        </div>
                        {formik.errors.discount_start_day && formik.touched.discount_start_day && <p className={cx('create__item__error-message')}>{formik.errors.discount_start_day}</p>}
                        {formik.errors.discount_end_day && formik.touched.discount_end_day && <p className={cx('create__item__error-message')}>{formik.errors.discount_end_day}</p>}
                    </div>
                </div>
            </div>
            <div className={cx('create__section')}>
                <p className={cx('create__section__title')}>Thiết lập mã giảm giá</p>
                <div className={cx('create__section__body')}>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')}>Loại giảm giá | Mức giảm</label>
                            <div className={cx('create__item__choose')}>
                                <select className={cx('create__item__choose__select')} id='discount_type' value={formik.values.discount_type} onChange={formik.handleChange}>
                                    <option value='fixed_amount'>Theo số tiền</option>
                                    <option value='percent_amount'>Theo phần trăm</option>
                                </select>
                                <input 
                                    className={cx('create__item__choose__input')} 
                                    placeholder={formik.values.discount_type === 'percent_amount' ? 'Nhập % giảm' : 'Nhập số tiền'}
                                    id='discount_value'
                                    min={1} 
                                    max={formik.values.discount_type === 'percent_amount' ? 100 : Infinity} 
                                    type='number'
                                    onChange={formik.handleChange}
                                    value={formik.values.discount_value}
                                />
                            </div>
                        </div>
                        {formik.errors.discount_value && formik.touched.discount_value && <p className={cx('create__item__error-message')}>{formik.errors.discount_value}</p>}
                    </div>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')}>Giá trị đơn hàng tối thiểu</label>
                            <input 
                                className={cx('create__item__input')} 
                                id='discount_min_order_value' 
                                type='number'
                                step={10000}
                                min={0}
                                placeholder='Nhập vào'
                                value={formik.values.discount_min_order_value}
                                onChange={formik.handleChange}
                                />
                        </div>
                        {formik.errors.discount_min_order_value && formik.touched.discount_min_order_value && <p className={cx('create__item__error-message')}>{formik.errors.discount_min_order_value}</p>}

                    </div>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')} htmlFor='discount_max_uses'>Tổng lượt sử dụng tối đa</label>
                            <input 
                                className={cx('create__item__input')} 
                                type='number' 
                                id='discount_max_uses' 
                                min={0} 
                                step={10} 
                                placeholder='Nhập vào'
                                value={formik.values.discount_max_uses}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <p className={cx('create__item__note')}>Tổng số Mã giảm giá có thể sử dụng</p>
                        {formik.errors.discount_max_uses && formik.touched.discount_max_uses && <p className={cx('create__item__error-message')}>{formik.errors.discount_max_uses}</p>}

                    </div>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')}>Lượt sử dụng tối đa/Người mua</label>
                            <input 
                                className={cx('create__item__input')} 
                                type='number' 
                                id='discount_max_uses_per_user'
                                min={1} 
                                step={1} 
                                placeholder='Nhập vào'
                                value={formik.values.discount_max_uses_per_user}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.discount_max_uses_per_user && formik.touched.discount_max_uses_per_user && <p className={cx('create__item__error-message')}>{formik.errors.discount_max_uses_per_user}</p>}
                    </div>
                </div>
            </div>
            <div className={cx('create__section')}>
                <p className={cx('create__section__title')}>Chế độ hiển thị mã giảm giá và các sản phẩm áp dụng</p>
                <div className={cx('create__section__body')}>
                    <div className={cx('create__item')}>
                        <div className={cx('create__item__form')}>
                            <label className={cx('create__item__label')}>Sản phẩm được áp dụng</label>
                            <div className={cx('create__item__choose')}>
                                <div className={cx('create__item__choose__radios')}>
                                    <div className={cx('create__item__choose__radio')}>
                                        <input id='discount_applies_type__all' type='radio' value='all' checked={applyTo === 'all'} onChange={handleChooseTypeApply}/>
                                        <label htmlFor='discount_applies_type__all' onClick={handleChooseTypeApply}>Tất cả</label>
                                    </div>
                                    <div className={cx('create__item__choose__radio')}>
                                        <input id='discount_applies_type__specific' type='radio' value='specific' checked={applyTo === 'specific'} onChange={handleChooseTypeApply}/>
                                        <label htmlFor='discount_applies_type__specific' onClick={handleChooseTypeApply}>Chọn sản phẩm</label>
                                    </div>
                                </div>
                                {showModel && applyTo === 'specific' && (
                                    <Model>
                                        <ModelContent onClose={() => setShowModel(false)} title='Chọn sản phẩm' className={cx('model__choose-products')}>
                                            <div className={cx('model__choose-products__content')}>
                                                {publishedState._products && publishedState._products.map((item, index) => {
                                                    return (
                                                        <div className={cx('model__choose_item')} key={index}>
                                                            <input type='checkbox' checked={itemsApply.includes(item._id)} onChange={() => handleChooseItem(item._id)}/>
                                                            <div className={cx('model__choose_item__img')}>
                                                                <img src={item.product_thumb} alt='product__item'/>
                                                            </div>
                                                            <div className={cx('model__choose_item__info')}>
                                                                <p className={cx('model__choose_item__name')}>{item.product_name}</p>
                                                                <p className={cx('model__choose_item__price')}>{normalizeNumber(item.product_price)}đ</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                <div className={cx('model__choose_submit')}>
                                                    <span onClick={handleApplyTypeisAll}>Bỏ áp dụng</span>
                                                    <span className={cx('model__choose_submit-btn-active')} onClick={handleApplyProducts}>Áp dụng</span>
                                                </div>
                                            </div>
                                        </ModelContent>
                                    </Model>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('create__btns')}>
                <span className={cx('create__btn')} onClick={formik.handleReset}>Hủy</span>
                <span className={cx('create__btn', 'create__btn--active')} onClick={formik.handleSubmit}>Xác nhận</span>
            </div>
        </div>
    );
}

export default memo(CreateDiscount);