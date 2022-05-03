import { useSelector, useDispatch } from 'react-redux'
import { closeNotification } from '../reducers/notificationReducer'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    if(notification.type === 'ON'){
        setTimeout(() => {
            dispatch(closeNotification())
        }, 6000)

        return (
            <p className="nav-link active" id="notifier">
                {notification.message}
            </p>
        )
    }

    if(notification.type === 'OFF'){
        return(
            <></>
        )
    }

    return(
        <></>
    )
}

export default Notification