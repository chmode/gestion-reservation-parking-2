import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationPage = () => {
    const navigate = useNavigate();
    const param = useParams();
    const userId = param.userid;
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');
    const [parkingId, setParkingId] = useState('');
    const [parkings, setParkings] = useState([]);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [error, setError] = useState('');

    const handleDateInChange = (event) => {
        setDateIn(event.target.value);
    };

    const handleDateOutChange = (event) => {
        setDateOut(event.target.value);
    };

    const handleParkingChange = (event) => {
        setParkingId(event.target.value);
    };

    const handleSubmit = async () => {
        if (!dateIn || !dateOut || !parkingId) {
            alert("Veuillez sélectionner à la fois la date d'entrée et la date de sortie et le parking.");
            return;
        }
        const currentDate = new Date();
        const selectedDateIn = new Date(dateIn);
        if (selectedDateIn < currentDate) {
            alert("La date d'entrée doit être égale ou postérieure à la date actuelle.");
            return;
        }
        if (dateOut <= dateIn) {
            alert("La date de sortie doit être postérieure à la date d'entrée.");
            return;
        }

        const requestData = {
            dateIn: dateIn,
            dateOut: dateOut,
            parkingId: parkingId
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/reservations/user/reservation/s`, requestData);
            setAvailablePlaces(response.data);
        } catch (error) {
            console.error("Error making reservation:", error);
            setError("Error making reservation. Please try again later.");
        }
    };

    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/parkings/all");
                setParkings(response.data);
                setError('');
            } catch (error) {
                console.error("Error fetching parkings:", error);
                setError("Error fetching parkings. Please try again later.");
            }
        };

        fetchParkings();
    }, []);

    const handleReservation = async (placeId, price) => {
        const reservationData = {
            userId: userId,
            dateIn: dateIn,
            dateOut: dateOut,
            parkingId: parkingId,
            placeId: placeId,
            price: price
        };
        try {
            const response = await axios.post('http://localhost:8080/api/reservations/user/reservation/validation', reservationData);
            navigate(`/user/profile/makereservation/invoice/${encodeURIComponent(JSON.stringify(response.data))}`);
        } catch (error) {
            console.error('Error storing reservation:', error);
            setError('Error storing reservation. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Effectuer une réservation</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="dateIn">Date d'arrivée:</label>
                    <input type="datetime-local" id="dateIn" name="dateIn" className="form-control" value={dateIn} onChange={handleDateInChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOut">Date de départ:</label>
                    <input type="datetime-local" id="dateOut" name="dateOut" className="form-control" value={dateOut} onChange={handleDateOutChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="parking">Sélectionner un parking:</label>
                    <select id="parking" name="parking" className="form-control" value={parkingId} onChange={handleParkingChange} required>
                        <option value="">Sélectionner un parking</option>
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
                <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>Rechercher</button>
            </form>

            <h2>Places disponibles de {dateIn} à {dateOut}</h2>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Prix</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {availablePlaces.map(place => (
                        <tr key={place.id}>
                            <td>{place.name}</td>
                            <td>{place.price}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleReservation(place.idPlace, place.price)}
                                >
                                    Réserver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationPage;
