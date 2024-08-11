'use client';

import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Asegúrate de importar 'toast'
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataF = {
            name,
            email,
            password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register/user',dataF );
            toast.success('Registration successful!');
            console.log(response.data); 
            router.push('/auth/sign-in');
        } catch (error) {
            console.log('Error', error); 
            toast.error('Revisa tus datos'); 
        }
    };

    return (
        <div className='flex flex-row justify-center content-center w-screen h-screen bg-black gap-x-4'>
            <div className='flex justify-center content-center w-[50vw] h-[90vh]'>
                <div className='background-dg'>.</div>
            </div>
            <div className='w-[50vw] grid place-content-center'>
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                    </div>
                    <div className="input-wrapper">
                        <svg
                            height="60"
                            viewBox="0 -9 32 32"
                            width="40"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Layer_3" data-name="Layer 3">
                                <path
                                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
                                ></path>
                            </g>
                        </svg>
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                    </div>
                    <div className="input-wrapper">
                        <svg
                            height="20"
                            viewBox="0 0 32 32"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Layer_3" data-name="Layer 3">
                                <path
                                    d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"
                                ></path>
                            </g>
                        </svg>
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                    </div>
                    <div className="input-wrapper">
                        <svg
                            height="20"
                            viewBox="-64 0 512 512"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"
                            ></path>
                            <path
                                d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"
                            ></path>
                        </svg>
                        <input
                            type="password"
                            className="text-input"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="signup-button">Registrarse</button>
                    <p className="account-prompt">Already have an account?
                        <a href="/auth/sign-in" className="login-link">login</a>
                    </p>
                    <div className="social-button-wrapper">
                        <button className="google-button"></button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
