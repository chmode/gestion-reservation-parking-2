import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PlaceUpdate = () => {
    const { id } = useParams();
    const [updatedPlace, setUpdatedPlace] = useState({
        name: '',
        price: '',
        state: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaceById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/places/placebyid/${id}`);
                const placeData = response.data;
                setUpdatedPlace({
                    name: placeData.name,
                    price: placeData.price,
                    state: placeData.state
                });
            } catch (error) {
                console.error("Error fetching place:", error);
                setError("Error fetching place. Please try again later.");
            }
        };
        fetchPlaceById();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updatedPlace.price < 0) {
            alert("Prix invalide. Le prix ne peut pas être inférieur à zéro.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/places/update/${id}`, updatedPlace);
            
            if (response.status === 200) {
                console.log("Place updated successfully");
                navigate("/parkings");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError("Le nom de cet endroit existe déjà dans ce parking. Veuillez en choisir un autre.");
            } else {
                setError("Une erreur s'est produite lors de la mise à jour de l'endroit. Veuillez réessayer plus tard.");
            }
            console.error("Error updating place:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedPlace({ ...updatedPlace, [name]: value });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Mettre à jour l'endroit</h2>

                    {error && <div className="alert alert-danger" role="alert">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input type="text" className="form-control" id="name" name="name" value={updatedPlace.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Prix</label>
                            <input type="text" className="form-control" id="price" name="price" value={updatedPlace.price} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">État</label>
                            <select className="form-control" id="state" name="state" value={updatedPlace.state} onChange={handleChange}>
                                <option value="disponible">Disponible</option>
                                <option value="undisponible">Undisponible</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Mettre à jour</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PlaceUpdate;

// CSS styles
const styles = `
    .container {
        margin-top: 50px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .btn {
        margin-right: 10px;
    }
`;
