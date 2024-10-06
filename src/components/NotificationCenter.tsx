import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { Notification } from '../types/types';

const ApiUrl = process.env.REACT_APP_API_URL;
const NotificationCenter: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const response = await fetch(`${ApiUrl}/api/notifications`);
        const data = await response.json();
        setNotifications(data);
        console.log(data[0].message);
    };

    const markAsRead = async (id: number) => {
        await fetch(`${ApiUrl}/api/notifications/${id}/read`, { method: 'PUT' });
        fetchNotifications();
    };

    return (
        <>
            <FaBell  onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {notifications.map(notification => (
                        
                        <div key={notification.id}>
                            {!notification.read ? (
                                <>
                                    <p>{notification.message}</p>
                                    <Button className='btn btn-primary' onClick={() => markAsRead(notification.id)}>
                                        Mark as Read
                                    </Button>
                                </>
                            ):"No Content !"}
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NotificationCenter;