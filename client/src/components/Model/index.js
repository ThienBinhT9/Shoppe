import classNames from "classnames/bind";

import styles from './Model.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const cx = classNames.bind(styles)


function Model({children, className, isScale}) {
    return ( 
        <div className={cx('wrapper',{[className]:className},{'scale':isScale})}>
            {children}
        </div>
    );
}

const ModelContent = ({children, onClose, title, className, isLeftToRight}) => {
    return (
        <div className={cx('content',{[className]:className},{'leftToRight':isLeftToRight})}>
            <div className={cx('header')}>
                <h3>{title || ''}</h3>
                <FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick={onClose}/>
            </div>
            <div className={cx('body')}>
                {children}
            </div>
        </div>
    )
}

export { ModelContent }
export default memo(Model);