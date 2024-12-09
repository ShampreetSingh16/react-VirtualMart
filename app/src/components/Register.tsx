import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlices';
import { AppDispatch } from '../redux/store';

//structure of the registration form data
type RegisterFormData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {

    const dispatch = useDispatch<AppDispatch>();
   
    // State to store the form data
    const [formData, setFormData] = useState<RegisterFormData>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    //  State to manage form validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');

    //navigate for redirection after successful registration
    const navigate = useNavigate();

    //regex pattern for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //function to handle input change and clear error messages for individual fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear specific error messages on input change
        if (name === 'email') setEmailError('');
        if (name === 'password') setPasswordError('');
        if (name === 'confirmPassword') setConfirmPasswordError('');
        if (name === 'firstname') setFirstnameError('');
        if (name === 'lastname') setLastnameError('');
    };

    //function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Validate the form fields before proceeding
        let valid = true;

        if (!formData.firstname) {
            setFirstnameError('First name is required');
            valid = false;
        }

        if (!formData.lastname) {
            setLastnameError('Last name is required');
            valid = false;
        }

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

        if (formData.password !== formData.confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        }

        if (!valid) return; //Stop submission if there are validation errors

        //if no error try to register the user
        try {
            await dispatch(register(formData));
            toast.success('Registration successful!'); //Show success message
            navigate('/login'); //Redirect to login page
        } catch (err: any) {
            //Show error message if registration fails
            const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="bg-white border shadow-sm mx-auto rounded-md p-8 w-full max-w-md h-max my-12 sm:mb-18">
            <h5 className="text-xl font-bold text-center mb-8">Create an account</h5>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* First Name and Last Name fields */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-left">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="First name"
                            className="w-full border rounded-md p-2"
                            required
                        />
                        {firstnameError && (
                            <span className="text-red-500 text-xs">{firstnameError}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-left">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="Last name"
                            className="w-full border rounded-md p-2"
                            required
                        />
                        {lastnameError && (
                            <span className="text-red-500 text-xs">{lastnameError}</span>
                        )}
                    </div>
                </div>

                {/* Email field */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-left">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@example.com"
                        className="w-full border rounded-md p-2"
                        required
                    />
                    {emailError && (
                        <span className="text-red-500 text-xs">{emailError}</span>
                    )}
                </div>

                {/* Password and Confirm Password fields */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-left">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full border rounded-md p-2"
                            required
                        />
                        {passwordError && (
                            <span className="text-red-500 text-xs">{passwordError}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-left">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full border rounded-md p-2"
                            required
                        />
                        {confirmPasswordError && (
                            <span className="text-red-500 text-xs">{confirmPasswordError}</span>
                        )}
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-opacity-75 cursor-pointer">
                    Register
                </button>
            </form>

            {/* Link to the login page */}
            <div className="text-center mt-4">
                <span className="text-sm">Already have an account? </span>
                <Link to="/login" className="text-red-500 hover:underline cursor-pointer">Login</Link>
            </div>
        </div>
    );
};

export default Register;
