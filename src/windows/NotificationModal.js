import React from 'react'
import { Modal, Button } from 'react-bootstrap'


import { useSelector, useDispatch } from 'react-redux'
import { hideNotificationModal } from '../reducers/notificationModalReducer'

export const GlobalNotifcation = () => {
    const dispatch = useDispatch()
    const notificationModal = useSelector(state => state.notificationinModal)
    const message = notificationModal.message
    //console.log(notificationModal.timeout)
    //console.log(`showBool:${showBool.type} message:${message}`)

    if (notificationModal.type) {
        setTimeout(() => {
            dispatch(hideNotificationModal())
        }, notificationModal.timeout)
        return (
            <NotificationModal showBool message={message} background={notificationModal.background}/>
        )
    }

    return null
}


const NotificationModal = ({ showBool, message, background }) => {
    return (
        <Modal
            show={showBool}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered={true}
            contentClassName={`bg-${background} text-white `}
            animation={false}
        >
            <Modal.Body className="align-self-center">
                <div className=''>
                    <p>{message}</p>

                </div>
            </Modal.Body>

        </Modal>
    )
}

export default NotificationModal