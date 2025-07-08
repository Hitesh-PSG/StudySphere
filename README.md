# StudySphere 📚

A collaborative platform for students to share, discover, and review study materials. StudySphere provides a centralized hub for educational resources, helping users connect and learn together in a community-driven environment.

### Features
- **User Authentication**: Secure user registration and login system.
- **Share & Discover**: Users can upload, view, edit, and delete their study material "listings."
- **Cloud Storage**: Seamlessly uploads images and files to the cloud using Cloudinary.
- **Community Reviews**: Allows users to leave ratings and feedback on study materials.
- **Interactive Maps**: Integrates Mapbox to show the location of listings, perfect for campus groups or local resources.
- **Responsive UI**: Built with Bootstrap to ensure a great experience on any device.

### Built Using
[![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?&style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
![EJS](https://img.shields.io/badge/EJS-A91E50.svg?style=for-the-badge&logo=ejs&logoColor=white)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%237952B3.svg?&style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![Passport.js](https://img.shields.io/badge/passport.js-34E27A.svg?style=for-the-badge&logo=passport&logoColor=white)](http://www.passportjs.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5.svg?style=for-the-badge&logo=Cloudinary&logoColor=white)](https://cloudinary.com/)

### Project Screenshots
_Add your screenshots here to show off your project!_

![Image](https://link-to-your-screenshot-1.png)
![Image](https://link-to-your-screenshot-2.png)
![Image](https://link-to-your-screenshot-3.png)


### Run the Project Locally

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Hitesh-PSG/StudySphere.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd StudySphere
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your API keys and database URL.
    ```env
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_KEY=<your_cloudinary_api_key>
    CLOUDINARY_SECRET=<your_cloudinary_api_secret>
    MAP_TOKEN=<your_mapbox_access_token>
    DB_URL=mongodb://127.0.0.1:27017/studysphere
    SECRET=your_session_secret
    ```
5. **Run the development server:**
    ```bash
    nodemon app.js
    ```
6. **Open your browser** and go to `http://localhost:8080` to see the project live.


## Author
[![Hitesh PSG](https://img.shields.io/badge/Hitesh_PSG-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hitesh-p-aa55662a3)
 
[![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hitesh-PSG)
