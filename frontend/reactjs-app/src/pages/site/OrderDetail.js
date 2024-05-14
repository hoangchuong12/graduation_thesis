import React from 'react';
import '../../assets/styles/OrderDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faBoxOpen, faShippingFast, faHome, faCheck, faTruck } from '@fortawesome/free-solid-svg-icons';
const OrderDetail = () => {
    return (
        <section className="vh-100" style={{ backgroundColor: '#8c9eff' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">


                        <div className="card card-stepper" style={{ borderRadius: 16 }}>
                            <div>
                                <div className="card-body p-4">
                                    <div className="d-flex flex-row mb-4 pb-2">
                                        <div className="flex-fill">
                                            <div>
                                                <p className="text-muted mb-2"> Order ID <span className="fw-bold text-body">1222528743</span></p>
                                                <p className="text-muted mb-0"> Place On <span className="fw-bold text-body">12,March 2019</span> </p>
                                            </div>
                                            <h5 className="bold">Headphones Bose 35 II</h5>
                                            <p className="text-muted"> Qt: 1 item</p>
                                            <h4 className="mb-3"> $ 299 <span className="small text-muted"> via (COD) </span></h4>
                                            <p className="text-muted">Tracking Status on: <span className="text-body">11:30pm, Today</span></p>
                                        </div>
                                        <div>
                                            <img className="align-self-center img-fluid" src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp" width={250} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-5">
                                <ul id="progressbar-2" className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
                                    <li className="step0 active text-center" id="step1" />
                                    <li className="step0 active text-center" id="step2" />
                                    <li className="step0 text-muted text-end" id="step3" />
                                </ul>
                                <div className="d-flex justify-content-between">
                                    <div className="d-lg-flex align-items-center">
                                        <FontAwesomeIcon icon={faClipboardList} size="3x" />
                                        <div>
                                            <p className="fw-bold mb-1">Order</p>
                                            <p className="fw-bold mb-0">Processed</p>
                                        </div>
                                    </div>
                                    <div className="d-lg-flex align-items-center">
                                        <FontAwesomeIcon icon={faShippingFast} size="3x" />
                                        <div>
                                            <p className="fw-bold mb-1">Order</p>
                                            <p className="fw-bold mb-0">En Route</p>
                                        </div>
                                    </div>
                                    <div className="d-lg-flex align-items-center">
                                        <FontAwesomeIcon icon={faHome} size="3x" />
                                        <div>
                                            <p className="fw-bold mb-1">Order</p>
                                            <p className="fw-bold mb-0">Arrived</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default OrderDetail;