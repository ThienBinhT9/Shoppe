import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Contact.module.scss'
import {contact_title, contact_titleV2, contact_subtitle, contact_subtitleV2, contact_info} from '../../utils/dataContact'

const cx = classNames.bind(styles)

function Contact() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content__left')}>
                    <div className={cx('content__left__section')}>
                        <h1 className={cx('content__left__title')}>{contact_title}</h1>
                        <p className={cx('content__left__subtitle')}>{contact_subtitle}</p>
                        <div className={cx('content__left__info')}>
                            {
                                contact_info && contact_info.map((item, index) => {
                                    return (
                                        <div className={cx('content__left__info__item')} key={index}>
                                            <div className={cx('content__left__info__icon')}><FontAwesomeIcon icon={item.icon}/></div>
                                            <div>
                                                <p className={cx('content__left__info__title')}>{item.title}</p>
                                                <p className={cx('content__left__info__desc')}>{item.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={cx('content__left__section')}>
                        <h1 className={cx('content__left__title')}>{contact_titleV2}</h1>
                        <p className={cx('content__left__subtitle')}>{contact_subtitleV2}</p>
                        <div className={cx('content__left__form')}>
                            <input className={cx('content__left__input')} type="text" placeholder="Họ và tên"/>
                            <input className={cx('content__left__input')} type="email" placeholder="Email"/>
                            <textarea className={cx('content__left__textarea')} placeholder="Nội dung"></textarea>
                            <span className={cx('content__left__submit')}>Gửi thông tin</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content__right')}>
                    <iframe title="map" className={cx("gmap_iframe")} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?hl=en&amp;q=Hanoi University of Industry&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
            </div>
        </div>
     );
}

export default Contact;