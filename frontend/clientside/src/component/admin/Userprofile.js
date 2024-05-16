import React from 'react';
import { Link, useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userid } = useParams();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Profil utilisateur</h2>
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <Link to={`/user/profile/makereservation/${userid}`} className="btn btn-primary btn-block">Effectuer une réservation</Link>
                            </div>
                            <div className="mb-3">
                                <Link to={`/user/reservations/history/${userid}`} className="btn btn-secondary btn-block">Mon historique de réservations</Link>
                            </div>
                            <div>
                                <Link to={`/user/profile/edit/${userid}`} className="btn btn-info btn-block">Modifier le profil</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
