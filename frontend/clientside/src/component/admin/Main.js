import React from 'react';

const AdminClientSections = () => {
    const redirectToAdminLogin = () => {
        window.location.href = "/admin/login";
    };

    const redirectToUserLogin = () => {
        window.location.href = "/user/login";
    };

    return (
        <div className="container" style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
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
                
                .section-admin {
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
                    <div className="section section-admin" onClick={redirectToAdminLogin}>
                        <h2>Espace admin</h2>
                        <button className="btn btn-primary">Espace admin</button>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="section section-client" onClick={redirectToUserLogin}>
                        <h2>Espace client</h2>
                        <button className="btn btn-success">Espace client</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminClientSections;
