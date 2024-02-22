import classNames from "classnames/bind";

import styles from './Introduce.module.scss'
import {introduce_title, introduce_desc, introduce_content} from '../../utils/dataIntroduce'
import introduce_image from '../../assets/images/introduce_image.webp'

const cx = classNames.bind(styles)

function Introduce() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <p>{introduce_desc}</p>
                    <p>{introduce_title}</p>
                    {introduce_content && introduce_content.map((item, index) => {
                        return (
                            <div key={index} className={cx('introduce__content__item')}>
                                <label className={cx('introduce__content__label')}>{item.label}:  </label>
                                <span className={cx('introduce__content__text')}>{item.text}</span>
                            </div>
                        )
                    })}
                    <div className={cx('introduce_image')}>
                        <img src={introduce_image} alt="introduce_image"/>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Introduce;