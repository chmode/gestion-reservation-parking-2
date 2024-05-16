import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const ParkingDetails = () => {
    const [parkings, setParkings] = useState([]);
    const [selectedParkingId, setSelectedParkingId] = useState('');
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/parkings/all");
                console.log("Parkings:", response.data); 
                setParkings(response.data);
            } catch (error) {
                console.error("Error loading parkings:", error);
                setError("Error loading parkings. Please try again later.");
            }
        };

        fetchParkings();
    }, []);

    const fetchPlaces = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/places/places/${selectedParkingId}`);
            setPlaces(response.data);
            setError('');
        } catch (error) {
            console.error("Error fetching places:", error);
            setError("Error fetching places. Please try again later.");
        }
    };

    const handleParkingChange = (event) => {
        setSelectedParkingId(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetchPlaces();
    };

    const deletePlace = async (placeId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/places/${selectedParkingId}/places/${placeId}`);
            if (response.status === 200) {
                setPlaces(prevPlaces => prevPlaces.filter(place => place.idPlace !== placeId));
                setError('');
            }
        } catch (error) {
            console.error("Error deleting place:", error);
            setError("Error deleting place. Please try again later.");
        }
    };

    return (
        <div className="container">
            <h2>Sélectionner le parking</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleFormSubmit} className="form-inline mb-4">
                <div className="form-group mr-2">
                    <select 
                        name="idparking" 
                        value={selectedParkingId} 
                        onChange={handleParkingChange} 
                        className="form-control" 
                        style={{ width: "200px" }}
                    >
                        <option value="">Sélectionnez un parking</option>
                        {parkings.map(parking => (
                            <option 
                                key={parking.idParking} 
                                value={parking.idParking}
                            >
                                {parking.type}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mr-2">Afficher les places</button>
                <Link to="/AddPlace" className="btn btn-success">Ajouter place</Link>
            </form>

            <div className="container mt-5">
                <h2>Détails de parking</h2>
                {places.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>État</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {places.map(place => (
                                <tr key={place.idPlace}>
                                    <td>{place.name}</td>
                                    <td>{place.price}</td>
                                    <td>{place.state}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button onClick={() => deletePlace(place.idPlace)} className="btn btn-danger mr-1">Supprimer</button>
                                            <Link to={`/PlaceUpdate/${place.idPlace}`} className="btn btn-warning ml-1 update-btn">Mettre à jour</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucune place disponible.</p>
                )}
            </div>  
        </div>
    );
}

export default ParkingDetails;
