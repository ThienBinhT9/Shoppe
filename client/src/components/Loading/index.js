import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading() {

    return ( 
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faSpinner} className={cx('loading__icon')}/>
        </div>
    );
}

export default Loading;