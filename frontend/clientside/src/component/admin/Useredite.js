import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUserProfile = () => {
    const { userid } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/profile/${userid}`);
                const userData = response.data;
                setFormData({
                    firstName: userData.idUser.firstName,
                    lastName: userData.idUser.lastName,
                    phone: userData.idUser.phone,
                    email: userData.email,
                    password: userData.password,
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Error fetching user. Please try again later.');
            }
        };
        fetchUserById();
    }, [userid]);

    const isValidPhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 
        if (!isValidPhone(formData.phone)) {
            setError('Le numéro de téléphone doit comporter exactement 10 chiffres.');
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8080/api/users/profile/edit/${userid}`, formData);
            if (response.status === 200) {
                console.log('User updated successfully');
                setError('');
                setSuccessMessage('User updated successfully');
                navigate(`/user/profile/${userid}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setSuccessMessage('');
                if (error.response.data === 'phone') {
                    setError('Le numéro de téléphone existe déjà.');
                } else if (error.response.data === 'email') {
                    setError('L\'email de cet utilisateur existe déjà.');
                } else {
                    setError('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur. Veuillez réessayer plus tard.');
                    console.error('Error updating user:', error);
                }
            } else if (error.response && error.response.status === 409) {
                setSuccessMessage('');
                if (error.response.data === 'phone') {
                    setError('Le numéro de téléphone existe déjà.');
                } else if (error.response.data === 'email') {
                    setError('L\'email de cet utilisateur existe déjà.');
                } else {
                    setError('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur. Veuillez réessayer plus tard.');
                    console.error('Error updating user:', error);
                }
            } else {
                setSuccessMessage('');
                setError('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur. Veuillez réessayer plus tard.');
                console.error('Error updating user:', error);
            }
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Modifier le profil de l'utilisateur</h2>

                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}

                    <form onSubmit={(event) => handleFormSubmit(event)}>
                        <div className="form-group">
                            <label htmlFor="firstName">Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Nom de famille</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Téléphone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Enregistrer les modifications</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserProfile;
