import classNames from "classnames/bind";
import { useLocation, Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { formatPathToTitleV2 } from '../../utils'
import styles from './TitlePage.module.scss'
import titlePage__img from '../../assets/images/titlePage__img.webp'

const cx = classNames.bind(styles)

function TitlePage() {

    const { pathname } = useLocation()
    const title = pathname.split('/')[1]

    const _title = formatPathToTitleV2(title)

    return ( 
        <div className={cx('wrapper')} style={{backgroundImage:`url(${titlePage__img})`}}>
            <h1 className={cx('title')}>{_title}</h1>
            <div className={cx('current__page')}>
                <Link  className={cx('current__page__item')} to='/'>Trang chủ</Link>
                <FontAwesomeIcon  className={cx('current__page__item')} icon={faChevronRight} />
                <NavLink className={cx('current__page__item')} >{_title}</NavLink>
            </div>
        </div>
     );
}

export default TitlePage;