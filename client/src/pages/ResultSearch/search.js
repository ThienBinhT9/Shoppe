import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from './ResultSearch.module.scss'

const cx = classNames.bind(styles)

function Search() {

    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/tim-kiem?q=${query}`)
    }

    return ( 
        <div className={cx('search-form')}>
            <input placeholder="Nhập tên sản phẩm..." value={query} onChange={(e) => setQuery(e.target.value)}/>
            <span onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch}/>
            </span>
        </div>
     );
}

export default Search;