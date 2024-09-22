import HomeIcon from '../public/icons/icon-home.svg';
import HomeIconActive from '../public/icons/icon-home-active.svg';
import BeverageIcon from '../public/icons/icon-coffee.svg'
import BeverageIconActive from '../public/icons/icon-coffee-active.svg'
import CalendarIcon from '../public/icons/icon-calendar.svg'
import CalendarIconActive from '../public/icons/icon-calendar-active.svg'
import AccountIcon from '../public/icons/icon-user.svg'
import AccountIconActive from '../public/icons/icon-user-active.svg'

type Path = '/' | '/beverage' | '/calendar' | '/account';
const IconData = {
    '/home' : {
        default: HomeIcon,
        active: HomeIconActive
    },
    '/beverage' : {
        default: BeverageIcon,
        active: BeverageIconActive
    },
    '/calendar' : {
        default: CalendarIcon,
        active: CalendarIconActive
    },
    '/account' : {
        default: AccountIcon,
        active: AccountIconActive
    }
}

export default IconData