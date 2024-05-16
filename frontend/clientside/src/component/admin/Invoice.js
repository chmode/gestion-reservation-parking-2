import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ReservationInvoice() {
    const { invoiceDetails } = useParams(); 
    const [parkingName, setParkingName] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [nbrhours, setNbrHours] = useState('');
    const [nbrminute, setNbrMinute] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');
    const [userfName, setUserFname] = useState('');
    const [userLname, setUserLname] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                const decodedInvoiceDetails = decodeURIComponent(invoiceDetails);
                const parsedDetails = JSON.parse(decodedInvoiceDetails);
                setDateIn(parsedDetails.dateIn);
                setDateOut(parsedDetails.dateOut);
                setParkingName(parsedDetails.parkingType);
                setPlaceName(parsedDetails.placeName);
                setNbrHours(parsedDetails.durationH);
                setNbrMinute(parsedDetails.durationM);
                setTotalPrice(parsedDetails.totalAmount);
                setUserFname(parsedDetails.userFname);
                setUserLname(parsedDetails.userLname);
                setUserPhone(parsedDetails.userPhone);
                setError('');
            } catch (error) {
                console.error('Error fetching invoice details:', error);
                setError('Error fetching invoice details. Please try again later.');
            }
        };

        if (invoiceDetails) {
            fetchInvoiceDetails();
        }
    }, [invoiceDetails]);

    return (
        <div className="container mt-5">
            <h2>Facture de réservation</h2>
            <div>
                <p>Prénom de l'utilisateur: <span>{userfName}</span></p>
                <p>Nom de l'utilisateur: <span>{userLname}</span></p>
                <p>Téléphone de l'utilisateur: <span>{userPhone}</span></p>
                <p>Date d'arrivée: <span>{dateIn}</span></p>
                <p>Date de départ: <span>{dateOut}</span></p>
                <p>Nom du parking: <span>{parkingName}</span></p>
                <p>Nom du place: <span>{placeName}</span></p>
                <p>Durée: <span>{nbrhours}h {nbrminute}m</span></p>
                <p>Prix total: <span>{totalPrice}</span></p>
            </div>
        </div>
    );
}

export default ReservationInvoice;
