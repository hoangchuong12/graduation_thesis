import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ImageModal = ({ show, handleClose, imageSrc }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show && imageSrc) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                setLoading(false);
            };
        }
    }, [show, imageSrc]);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header>
                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                    <span aria-hidden="true"><FontAwesomeIcon icon={faTimes} /></span>
                </button>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <img src={imageSrc} alt="Product" style={{ width: '100%' }} />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ImageModal;
