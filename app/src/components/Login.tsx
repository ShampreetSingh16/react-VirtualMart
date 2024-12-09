import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../redux/slices/authSlices';
import { AppDispatch } from '../redux/store';

// Structure of login form data
type LoginFormData = {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'email') setEmailError('');
        if (name === 'password') setPasswordError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let valid = true;

        if (!formData.email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!emailPattern.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        }
        if (!formData.password) {
            setPasswordError('Password is required');
            valid = false;
        }
        if (!valid) return;

        try {
            await dispatch(login(formData)).unwrap();
            navigate('/');
        }  catch (error: any) {
            if (typeof error === "object" && error.email) {
                setEmailError(error.email);
            } else if (typeof error === "object" && error.password) {
                setPasswordError(error.password);
            } else {
                setEmailError("");
                setPasswordError(error || "Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="bg-white border shadow-sm mx-auto w-96 my-12 sm:mb-18 p-8 rounded-md">
            <h5 className="text-xl font-bold text-center mb-2">Welcome back</h5>
            <h6 className="text-sm font-light text-center mb-8">Please enter your details to login</h6>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-left">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@example.com"
                        className="border rounded-md p-2 h-10"
                        required
                    />
                    {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-left">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                        className="border rounded-md p-2 h-10"
                        required
                    />
                    {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-opacity-75 cursor-pointer">
                    LOGIN
                </button>
            </form>
            <div className="text-center mt-6">
                <span className="text-sm text-gray-700">Don't have an account? </span>
                <Link to="/register" className="text-red-600 text-sm cursor-pointer hover:underline">Register</Link>
            </div>
        </div>
    );
};

export default Login;
