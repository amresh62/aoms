import React, { useEffect, useState } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { Notification } from '../types/types';
import { fetchWithCredentials } from '../utils/api';


const NotificationCenter: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const response = await fetchWithCredentials(`/api/notifications`);
        const data = await response.json();
        setNotifications(data);
    };

    const markAsRead = async (id: number) => {
        await fetchWithCredentials(`/api/notifications/${id}/read`, { method: 'PUT' });
        fetchNotifications();
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <>
            <div className="position-relative d-inline-block">
                <FaBell onClick={handleShow} style={{ cursor: 'pointer' }} />
                {unreadCount > 0 && (
                    <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '.8em', padding: '0.25em 0.4em', minWidth: '1em', height: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {unreadCount}
                    </Badge>
                )}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {notifications.map(notification => (
                        <div key={notification.id}>
                            {!notification.read && (
                                <>
                                    <p>{notification.message}</p>
                                    <Button className='btn btn-primary' onClick={() => markAsRead(notification.id)}>
                                        Mark as Read
                                    </Button>
                                </>
                            )}
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
