import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { email, password });
            console.log('Response:', response);

            if (response.status === 200) {
                navigate(`/user/profile/${response.data}`);
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in. Please try again later.');
        }
    };

    const redirectToUserSignup = () => {
        navigate('/user/signup');
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px', backgroundColor: '#fff', borderRadius: '8px', padding: '40px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center', color: '#333' }}>Client Login</h2>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }} />
                    <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease', marginBottom: '10px' }}>Login</button>
                    <button type="button" className="signup" onClick={redirectToUserSignup} style={{ width: '100%', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease', marginBottom: '0' }}>Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default ClientLogin;
