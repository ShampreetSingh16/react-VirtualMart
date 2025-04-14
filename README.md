## VirtualMart
This project is a full-stack e-commerce website for electronic goods, built using the MERN (MongoDB, Express, React, Node.js) stack. It offers a complete shopping experience by enabling users to explore a range of products, filter and sort products , manage their shopping cart, and complete secure transactions through an integrated payment gateway.

The frontend is built with React and Typescript, with Tailwind CSS used for styling. The React Redux Toolkit is used to manage the cart and user authentication state. Axios is used to make API requests, and React Toastify is used to display notifications. Additional libraries like React Icons, React Fast Marquee, and Swiper.js are incorporated to enhance the user interface and overall user experience. For media storage and delivery, this project uses Cloudinary. All images are uploaded to Cloudinary, and the provided urls are used to display them within the application.

The backend is built with Express and MongoDB for data storage. For security, it uses a JWT-based authentication system for user authentication , and bcrypt is used for password hashing. CORS middleware ensures seamless communication between the frontend and backend. Nodemailer is used for sending registration confirmation emails, and Stripe (in test mode) handles secure payment processing.

## Key features
- **Product Management:** Users can browse products, filter by categories or brands, and sort by price.
- **Authentication:** Secure JWT-based authentication for user login and registration , with bcrypt libary for hashing passwords.
- **Email Notifications:** Nodemailer library is used to provide users a confirmation email upon successful registration.
- **Order Placement:** Orders are created and saved in the backend once placed.
- **User Notifications:** Real-time notifications are displayed using React Toastify.
- **API Integration:** Axios library is used for efficient communication between the frontend and backend.
- **Secure Payment Processing with Stripe:** The website integrates Stripe as a payment gateway, currently in test mode, to handle payments securely and efficiently.
- **Responsive Design:** The application is styled with Tailwind CSS, with React Fast Marquee and Swiper.js for enhancing the user interface.
- **Environment Configuration:** env file is used to manage environment variables, ensuring secure access to sensitive data.
- **Cross-Origin Resource Sharing (CORS):** cors library is used to handle secure cross-origin requests between the frontend and backend.
- **State Management:** Used React Context API to manage the shopping cart and user authentication.

## Tech Stack
- **Frontend:** React, Typescript , Tailwind CSS, React Icons, React Toastify, React Fast Marquee, Swiper Js, Axios
- **Backend:** Node JS ,Express JS, MongoDB, JWT for authentication, Nodemailer
- **Database:** MongoDB
- **Payment Gateway:** Stripe (test environment)
- **Hosting:** Render
  
## Future Enhancements
- **User Profile:** User profile can be added where user can see their previous placed orders and manage their information.
- **Password Reset:** To allow users to recover or change their passwords securely.
- **Order confimation Email :** Users placed order information can be fetched form the database and a confimation email along with those details can be sent.  
- **Add to favourites:** Add to favourites feature can be added for logged in users.
- **Improved CSS Design:** Overall, the design and responsiveness of the application can be improved to provide a more modern look and seamless user experience.
- **Admin Panel:** An admin panel can be created to manage the products , users and orders.

## Deployed Link
- **Frontend:** https://virtualmartclient.onrender.com
- **Backend:** https://virtualmartserver.onrender.com
