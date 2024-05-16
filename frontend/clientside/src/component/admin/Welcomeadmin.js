import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManagementPage = () => {
    const navigate = useNavigate();

    const redirectToParkings = () => {
        navigate('/parkings');
    };

    const redirectToUsers = () => {
        navigate('/Client');
    };

    return (
        <div className="container mt-5">
            <style>
                {`
                .section {
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .section:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .section-parking {
                    background-color: #ffb74d;
                }

                .section-client {
                    background-color: #4caf50;
                }

                .btn {
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }

                .btn:hover {
                    background-color: #0056b3;
                }
                `}
            </style>
            <div className="row justify-content-between">
                <div className="col-md-5">
                    <div className="section section-parking" onClick={redirectToParkings}>
                        <h2>Management de parking</h2>
                        <p>Gérer le stationnement ici</p>
                        <button className="btn btn-primary">Allez aux parkings</button>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="section section-client" onClick={redirectToUsers}>
                        <h2>Gestion des utilisateurs</h2>
                        <p>Gérer les utilisateurs ici</p>
                        <button className="btn btn-success">Allez aux Clients</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementPage;
