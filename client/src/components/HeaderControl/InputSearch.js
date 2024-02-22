import { memo, useState } from "react";
import classNames from "classnames/bind";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import styles from './HeaderControl.module.scss'

const cx = classNames.bind(styles)

function InputSearch({onCloseModelSearch}) {

    const [keySearch, setKeySearch] = useState('')

    const navigate = useNavigate()

    const handleSearch = () => {

        if(keySearch.trim()){

            navigate(`/tim-kiem?q=${keySearch}`)
            onCloseModelSearch()
        }
    }

    return ( 
        <div className={cx('model__search__input')}>
            <input placeholder="Nhập tên sản phẩm..." onChange={(e) => setKeySearch(e.target.value)} value={keySearch}/>
            <FontAwesomeIcon icon={faSearch} onClick={handleSearch}/>
        </div>
    );
}

export default memo(InputSearch);