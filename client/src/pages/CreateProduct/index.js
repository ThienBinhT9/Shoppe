import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-regular-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import {useSelector, useDispatch} from 'react-redux'

import styles from './CreateProduct.module.scss'
import TitleAccount from "../../components/TitleAccount";
import {color, sizeClothing, sizeFootwear} from '../../utils/dataProduct'
import { create } from '../../redux/requestService/product.request'
import {createAxios} from '../../utils'
import { loginSuccess } from "../../redux/authSlice";
import Loading from '../../components/Loading'

const cx = classNames.bind(styles)

function CreateProduct() {

    const current_user = useSelector(state => state.auth.current_user)
    const {isFetching} = useSelector(state => state.product.create)

    const dispatch = useDispatch()

    const axiosInstance = createAxios(current_user, dispatch, loginSuccess)

    const [productType, setProductType] = useState('')
    const [productImages, setProductImages] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [thumb, setThumb] = useState('')
    const [desc, setDesc] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [brand, setBrand] = useState('')
    const [material, setMaterial] = useState('')
    const [model, setModel] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [thumbFormData, setThumbFormData] = useState('')
    const [imagesFormData, setImagesFormData] = useState([])

    const handleImages = (e) => {
        const files = Object.values(e.target.files)
        setProductImages((prev) => [])
        setImagesFormData((prev) => [])
        e.target.value = ''

        if(files){
            files.forEach((file) => {
                const reader = new FileReader()

                reader.onload = (e) => {
                    const temporaryUrl = e.target.result;
                    setProductImages((prevBlobs) => [...prevBlobs, temporaryUrl]);
                    setImagesFormData(prev => [...prev, file])
                }
                
                reader.readAsDataURL(file);
            })
        }

    }

    const handleCloseImage = (index) => {
        productImages.splice(index, 1)
        imagesFormData.splice(index, 1)
        setImagesFormData(prev => [...imagesFormData])
        setProductImages(prev => [...productImages])
    }

    const handleThumb = (e) => {  
        const file = e.target.files[0]
        setThumbFormData(file)

        if(file){
            const reader = new FileReader()
            reader.onload = (e) => {
                const blob = e.target.result
                setThumb(blob)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCloseThumb = () => {
        setThumb('')
        setThumbFormData('')
    }

    const handleChangeType = (e) => {
        setProductType(e.target.value)
        setColors([])
        setSizes([])
    }

    const handleColors = (e) => {
        if(!colors.includes(e.target.value)){
            setColors(prev => [...prev, e.target.value])
        }
    }

    const handleCloseColor = (index) => {
        colors.splice(index, 1)
        setColors(prev => [...colors])
    }
    
    const handleCloseSize = (index) => {
        sizes.splice(index, 1)
        setSizes(prev => [...sizes])
    }

    const handleSizes = (e) => {
        if(!sizes.includes(e.target.value)){
            setSizes(prev => [...prev, e.target.value])
        }
    }

    const handleCancel = () => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
        setProductImages([])
        setColors([])
        setSizes([])
        setThumb('')
        setDesc('')
        setName('')
        setPrice(0)
        setQuantity(0)
        setBrand('')
        setMaterial('')
        setModel('')
        setManufacturer('')
    }

    const handleSaveProduct = async(isPublished = 0) => {
        if(!productImages || !name || !productType || !desc || !price || !quantity || !thumb){
            alert('Bạn chưa nhập hết thông tin của sản phẩm!')
            return
        }

        const uploadData = new FormData()
        uploadData.append('product_name', name)
        uploadData.append('product_thumb', thumbFormData)
        imagesFormData && imagesFormData.map(data => uploadData.append('product_images', data))
        uploadData.append('product_price', price)
        uploadData.append('product_quantity', quantity)
        uploadData.append('product_type', productType)
        uploadData.append('product_description', desc)
        uploadData.append('isPublished', isPublished)
 
        if(productType === 'Clothing' || productType === 'Footwear'){
            if(!brand || !colors || !sizes || !material){
                alert('Bạn chưa nhập hết thông tin sản phẩm!')
                return
            } 
            const product_attributes = {
                brand,
                size:sizes,
                color:colors,
                material,
            }
            uploadData.append('product_attributes', JSON.stringify(product_attributes))
        }else if(productType === 'Electronic'){
            if(!manufacturer || !colors || !model ){
                alert('Bạn chưa nhập đầy đủ thông tin sản phẩm')
                return
            }
            const product_attributes = {
                manufacturer,
                color:colors,
                model
            }
            uploadData.append('product_attributes', JSON.stringify(product_attributes))
        }else return 

        await create(axiosInstance, current_user?._id, current_user?.access_token, uploadData, dispatch)
        alert('Đăng sản phẩm thành công')
        handleCancel()
    }

    const handleSell = () => {
        handleSaveProduct(1)
    }

    return ( 
        <div className={cx('wrapper')}>
            <TitleAccount title='Điền thông tin sản phẩm bán'/>
            <div className={cx('body')}>
                {isFetching && <Loading />}
                <div className={cx('section')}>
                    <h3 className={cx('section__title')}>Thông tin cơ bản</h3>
                    <div className={cx('section__content')}>
                        <div className={cx('section__form')}>
                            <label className={cx('section__form__title')}>Hình ảnh sản phẩm</label>
                            <input id="product_images" className={cx('section__form__input-file')} type="file" multiple accept="image/*" onChange={handleImages}/>
                            <label className={cx('section__form__input-file-content')} htmlFor="product_images">
                                <FontAwesomeIcon icon={faImage}/>
                            </label>
                            <div className={cx('section__form__display__images')}>
                                {productImages && productImages.map((item, index) => {
                                    return (
                                        <div key={index} className={cx('section__form__display__image')}>
                                            <FontAwesomeIcon icon={faClose} onClick={() => handleCloseImage(index)}/>
                                            <img src={item} alt=""/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>                  
                        <div className={cx('section__form')}>
                            <label htmlFor="product_name" className={cx('section__form__title')}>Tên sản phẩm</label>
                            <input className={cx('section__form__input-text')} id="product_name" value={name} placeholder="Nhập tên sản phẩm" onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className={cx('section__form')}>
                            <label className={cx('section__form__title')}>Nghành hàng</label>
                            <select className={cx('section__form__select')} value={productType} onChange={handleChangeType}>
                                <option className={cx('section__form__option')} value="">Chọn nghành hàng</option>
                                <option className={cx('section__form__option')} value="Clothing">Quần áo</option>
                                <option className={cx('section__form__option')} value="Footwear">Giày dép</option>
                                <option className={cx('section__form__option')} value="Electronic">Điện tử</option>
                            </select>
                        </div>
                        <div className={cx('section__form')}>
                            <label id="product_description" className={cx('section__form__title')}>Mô tả sản phẩm</label>
                            <textarea className={cx('section__form__input-text')} id="product_description" placeholder="Nhập mô tả sản phẩm" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                {(productType === 'Clothing' || productType === 'Footwear') && (
                    <div className={cx('section')}>
                        <h3 className={cx('section__title')}>Thông tin chi tiết</h3>
                        <div className={cx('section__content')}>
                            <div className={cx('section__form')}>
                                <label className={cx('section__form__title')}>Nhãn hiệu</label>
                                <input type="text" placeholder="Nhập vào" className={cx('section__form__input-text')} value={brand} onChange={e => setBrand(e.target.value)}/>
                            </div>
                            <div className={cx('section__form')}>
                                <label className={cx('section__form__title')}>Kích cỡ</label>
                                <select className={cx('section__form__select')} onChange={handleSizes}>
                                    <option className={cx('section__form__option')} value="">Chọn kích cỡ</option>
                                    {(productType === 'Clothing') && sizeClothing.map(item => {
                                            return <option key={item.value} className={cx('section__form__option')} value={item.value}>{item.display}</option>
                                    })}

                                    {(productType === 'Footwear') && sizeFootwear.map(item => {
                                            return <option key={item} className={cx('section__form__option')} value={item}>{item}</option>
                                    })}
                                </select>
                                <div className={cx('section__form__select__values')}>
                                    {sizes && sizes.map((item, index) => {
                                        return (
                                            <div key={index} style={{backgroundColor:`${item}`}} className={cx('section__form__select__value')}>
                                                <FontAwesomeIcon icon={faClose} onClick={() => handleCloseSize(index)}/>
                                                <span>{item}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={cx('section__form')}>
                                <label className={cx('section__form__title')}>Màu sắc</label>
                                <select className={cx('section__form__select')} onChange={handleColors}>
                                    <option className={cx('section__form__option')} value="">Chọn màu sắc</option>
                                    {
                                        color.map(item => {
                                            return <option key={item.value} className={cx('section__form__option')} value={item.value}>{item.display}</option>
                                        })
                                    }
                                </select>
                                <div className={cx('section__form__select__values')}>
                                    {colors && colors.map((item, index) => {
                                        return (
                                            <div key={index} style={{backgroundColor:`${item}`}} className={cx('section__form__select__value')}>
                                                <FontAwesomeIcon style={item === 'black' ? {color:'white'} : {color:'black'}} icon={faClose} onClick={() => handleCloseColor(index)}/>
                                                <span style={item === 'black' ? {color:'white'} : {color:'black'}}>{item}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={cx('section__form')}>
                                <label className={cx('section__form__title')}>Chất liệu</label>
                                <input type="text" placeholder="Nhập vào" className={cx('section__form__input-text')} value={material} onChange={e => setMaterial(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                )}
                {productType === 'Electronic' && (
                    <div className={cx('section')}>
                        <h3 className={cx('section__title')}>Thông tin chi tiết</h3>
                        <div className={cx('section__content')}>
                            <div className={cx('section__form')}>
                                <label className={cx('section__form__title')}>Nhà sản xuất</label>
                                <input type="text" placeholder="Nhập vào" className={cx('section__form__input-text')} value={manufacturer} onChange={e => setManufacturer(e.target.value)}/>
                            </div>
                            <div className={cx('section__form')}>
                                <label className={cx('section__form__title')}>Màu sắc</label>
                                <select className={cx('section__form__select')} onChange={handleColors}>
                                    <option className={cx('section__form__option')} value="">Chọn màu sắc</option>
                                    {color.map((item, index) => <option key={index} className={cx('section__form__option')} value={item.value}>{item.display}</option>)}
                                </select>
                                <div className={cx('section__form__select__values')}>
                                    {colors && colors.map((item, index) => {
                                        return (
                                            <div key={index} style={{backgroundColor:`${item}`}} className={cx('section__form__select__value')}>
                                                <FontAwesomeIcon style={item === 'black' ? {color:'white'} : {color:'black'}} icon={faClose} onClick={() => handleCloseColor(index)}/>
                                                <span style={item === 'black' ? {color:'white'} : {color:'black'}}>{item}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={cx('section__form')}>
                                <label className={cx('section__form__title')}>Hình dạng</label>
                                <input type="text" placeholder="Nhập vào" className={cx('section__form__input-text')} value={model} onChange={e => setModel(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('section')}>
                    <h3 className={cx('section__title')}>Thông tin bán hàng</h3>
                    <div className={cx('section__content')}>
                        <div className={cx('section__form')}>
                            <label className={cx('section__form__title')}>Giá</label>
                            <input className={cx('section__form__input-text')} id="product_price" type="number" step={10000} min={0} value={price}  placeholder="Nhập giá" onChange={e => setPrice(e.target.value)}/>
                        </div>
                        <div className={cx('section__form')}>
                            <label className={cx('section__form__title')}>Kho hàng</label>
                            <input className={cx('section__form__input-text')} id="product_quantity" type="number" min={0} step={10}  value={quantity} placeholder="Nhập số lượng bán" onChange={e => setQuantity(e.target.value)}/>
                        </div>
                        <div className={cx('section__form')}>
                            <label className={cx('section__form__title')}>Hình ảnh hiển thị sản phẩm</label>
                            <input className={cx('section__form__input-file')} id="product_thumb" type="file" accept="image/*" onChange={handleThumb}/>
                            <label className={cx('section__form__input-file-content')} htmlFor="product_thumb">
                                <FontAwesomeIcon icon={faImage} />
                            </label>
                            {thumb && (
                                <div className={cx('section__form__display__images')}>
                                    <div className={cx('section__form__display__image')}>
                                        <FontAwesomeIcon icon={faClose} onClick={handleCloseThumb}/>
                                        <img src={thumb} alt=""/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('btns-submit')}>
                    <span className={cx('btn')} onClick={handleCancel}>Hủy bỏ</span>
                    <span className={cx('btn', 'btn-save')} onClick={handleSaveProduct}>Lưu</span>
                    <span className={cx('btn','btn-post')} onClick={handleSell}>Đăng bán</span>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;