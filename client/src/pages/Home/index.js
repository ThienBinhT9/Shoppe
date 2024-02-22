import classnames from 'classnames/bind'
import styles from './Home.module.scss'
import Outstanding from './outstanding';

const cx = classnames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>      
            <Outstanding />
        </div>
    );
}

export default Home;