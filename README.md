# 📚 StudySphere

> A collaborative study platform where users can share study materials, ask questions, and form study groups.

StudySphere is a full-stack web application designed to help students connect and learn together. It provides a centralized place to upload, browse, and review educational resources, fostering a community-driven learning environment.


_**(Important: Replace the link above with a real screenshot of your app's homepage or dashboard!)**_

---

## ✨ Key Features

-   **User Authentication**: Secure user registration and login system using Passport.js.
-   **CRUD for Study Materials**: Users can Create, Read, Update, and Delete their own study material "listings".
-   **Cloud Image Uploads**: Seamless image and file uploads handled by Multer and stored on the cloud with Cloudinary.
-   **Reviews and Ratings**: Users can leave reviews and ratings on study materials to provide feedback.
-   **Interactive Maps**: Integration with Mapbox to display locations associated with listings (e.g., for local study groups or campus locations).
-   **RESTful API Design**: Follows RESTful principles for a clean and predictable API.
-   **Responsive Design**: Built with Bootstrap for a great user experience on both desktop and mobile devices.
-   **Flash Messaging**: Provides users with contextual feedback for their actions (e.g., "Successfully logged in!").

---

## 🛠️ Tech Stack

This project is built with the MERN stack (MongoDB, Express, React, Node.js), with EJS for server-side rendering instead of React.

| Category      | Technology                                                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**   | **Node.js**, **Express.js**                                                                                                             |
| **Database**  | **MongoDB** with **Mongoose** (ODM)                                                                                                     |
| **Frontend**  | **EJS** (Templating), **HTML5**, **CSS3**, **Bootstrap**                                                                                  |
| **Auth**      | **Passport.js** (Local Strategy)                                                                                                        |
| **File/Image Handling** | **Cloudinary** (Cloud Storage), **Multer** (File Upload Middleware)                                                           |
| **Mapping**   | **Mapbox API**                                                                                                                          |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your system:
-   [Node.js](https://nodejs.org/) (which includes npm)
-   [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Hitesh-PSG/StudySphere.git
    cd StudySphere
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory of the project and add the following variables. You will need to get your own API keys from Cloudinary and Mapbox.

    ```env
    # Cloudinary credentials for image storage
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_KEY=<your_cloudinary_api_key>
    CLOUDINARY_SECRET=<your_cloudinary_api_secret>

    # Mapbox token for displaying maps
    MAP_TOKEN=<your_mapbox_access_token>

    # MongoDB connection URL (can be local or from Atlas)
    DB_URL=mongodb://127.0.0.1:27017/studysphere

    # Secret for session management
    SECRET=thisisagoodsecret
    ```

4.  **Start the development server:**
    The project uses `nodemon` to automatically restart the server on file changes.
    ```sh
    nodemon app.js
    ```
    If you don't have `nodemon` installed globally, you can run:
    ```sh
    npm install -g nodemon
    ```
    Alternatively, you can just use `node`:
    ```sh
    node app.js
    ```

5.  **Open your browser** and navigate to `http://localhost:8080`.

---

##  usage

1.  **Sign Up / Log In**: Create an account or log in with existing credentials.
2.  **Browse Materials**: View all available study materials on the home page.
3.  **Add New Material**: Click "Add New Listing" to upload your own study notes, files, or resources.
4.  **View Details**: Click on any material to see its full details, location on the map, and existing reviews.
5.  **Leave a Review**: If you are logged in, you can submit a rating and a comment on any study material.
6.  **Manage Your Content**: You can edit or delete the materials that you have personally uploaded.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is not currently licensed. Consider adding an [MIT License](https://opensource.org/licenses/MIT) to encourage collaboration.

---

## 📧 Contact

Hitesh - [@hitesh_psg](https://twitter.com/your_twitter_handle) - hiteshsaini400@gmail.com

Project Link: [https://github.com/Hitesh-PSG/StudySphere](https://github.com/Hitesh-PSG/StudySphere)
