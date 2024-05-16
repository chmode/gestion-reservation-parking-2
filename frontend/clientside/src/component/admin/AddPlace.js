import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNewPlace = () => {
    const [formData, setFormData] = useState({
        parkingId: 0,
        name: '',
        price: 0.0,
        state: 'disponible'
    });
    const [parkings, setParkings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/parkings/all");
                setParkings(response.data);
            } catch (error) {
                console.error("Error fetching parkings:", error);
                setErrorMessage("Error fetching parkings. Please try again later.");
            }
        };
        fetchParkings();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.price < 0) {
            alert("Prix invalide. Le prix ne peut pas être inférieur à zéro.");
            return;
        }
        try {
            const formDataToSend = {
                name: formData.name,
                price: formData.price,
                state: formData.state,
                parking: { idParking: formData.parkingId }
            };

            const response = await axios.post('http://localhost:8080/api/places/placeadd', formDataToSend);
            if (response.status === 201) {

                navigate("/parkings");
                /*setSuccessMessage("Le place a été ajouté correctement.");
                setFormData({
                    parkingId: 0,
                    name: '',
                    price: 0.0,
                    state: 'disponible'
                }); */
                setErrorMessage(''); 
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage("Une place du même nom existe déjà dans le parking sélectionné.");
                setSuccessMessage('');
            } else {
                setErrorMessage("Une erreur s'est produite lors de l'ajout du lieu. Veuillez réessayer plus tard.");
                console.error('Error adding place:', error);
                setSuccessMessage(''); 
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Ajouter un nouveau place</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="parking">Sélectionnez un parking</label>
                    <select className="form-control" id="parking" name="parkingId" value={formData.parkingId} onChange={handleChange}>
                        <option value="">Sélectionnez un parking</option>
                        {parkings.map(parking => (
                            <option key={parking.idParking} value={parking.idParking}>{parking.type}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Prix</label>
                    <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="state">État</label>
                    <select className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} required>
                        <option value="disponible">Disponible</option>
                        <option value="undisponible">Undisponible</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter un place</button>
            </form>
            {successMessage && <div className="alert alert-success mt-3" role="alert">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-3" role="alert">{errorMessage}</div>}
        </div>
    );
};

export default AddNewPlace;
