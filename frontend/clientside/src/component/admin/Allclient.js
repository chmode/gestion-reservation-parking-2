import React, { useState, useEffect } from 'react';
import axios from "axios";

const AllClient = () => {
    const [users, setUsers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/users/plus"
                );

                if (response.status === 200) {
                    setUsers(response.data); 
                }
            } catch (error) {
                console.error("Error loading users:", error);
            }
        };

        loadUsers();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:8080/api/users/search?email=${searchEmail}`
            );

            if (response.status === 200) {
                setUsers(response.data); 
            }
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const deleteUser = async (email) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/users/delete/${email}`
            );

            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(user => user[4] !== email));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container">
            <h2>les utilisateurs</h2>
            <div className="mb-3">
                <form onSubmit={handleSearch} className="row">
                    <div className="col-sm-8">
                        <input 
                            type="text" 
                            id="searchInput" 
                            name="email" 
                            value={searchEmail} 
                            onChange={(e) => setSearchEmail(e.target.value)} 
                            className="form-control" 
                            placeholder="Rechercher par mail" 
                        />
                    </div>
                    <div className="col-sm-4">
                        <button type="submit" className="btn btn-primary btn-block">Rechercher</button>
                    </div>
                </form>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom de famille</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>Nombre de réservations</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user[0]}>
                            <td>{user[1]}</td>
                            <td>{user[2]}</td>
                            <td>{user[3]}</td>
                            <td>{user[4]}</td>
                            <td>{user[5]}</td>
                            <td>
                                <button onClick={() => deleteUser(user[4])} className="btn btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllClient;
