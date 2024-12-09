import { Link } from "react-router-dom";

// Error page componenet
const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <p className="text-lg text-red-600">404</p>
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="text-xl text-gray-600">Sorry, we couldn't find the page you are looking for.</p>
            <div className="flex justify-center mb-4">
                <Link
                    to="/"
                    className="bg-black text-white p-4
                    rounded-md mx-auto hover:opacity-75 text-sm font-bold">
                    Go back home
                </Link>
            </div>
        </div>
    );
}

export default Error;
