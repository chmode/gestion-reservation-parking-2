import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useParams } from 'react-router-dom'; 

const ReservationsHistory = () => {
    const params = useParams(); 
    const userid = params.userid; 

    const [reservations, setReservations] = useState([]);

    useEffect(() => { 
        const fetchReservations = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/api/reservations/user/history/${userid}`); 
                console.log('Response:', response.data); 
                setReservations(response.data); 
            } catch (error) {
                console.error('Error fetching reservations:', error); 
            }
        };
        fetchReservations();
    }, [userid]); 

    return (
        <div className="container mt-5">
            <h2>Détails des réservations</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date d'arrivée</th>
                        <th>Date de départ</th>
                        <th>Parking</th>
                        <th>Nom de l'endroit</th>
                        <th>Durée</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res, index) => (
                        <tr key={index}>
                            <td>{res.reservation[0]}</td>
                            <td>{res.reservation[1]}</td>
                            <td>{res.reservation[3]}</td>
                            <td>{res.reservation[2].name}</td>
                            <td>{res.hours}h : {res.minutes}m</td>
                            <td>{res.reservation[4]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsHistory;

