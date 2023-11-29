<h1 align="center">
    MERN SE WEBSITE LEARNING MANAGEMENT SYSTEM 
</h1>

<br>

# About

This SE Learning Management System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline school management, class organization, and facilitate communication between students, teachers, and administrators.

## Features

- **User Roles:** The system supports two user roles: Admin, Student. Each role has specific functionalities and access levels.

<br>

- **Login System:** login system employs JWT tokens to seamlessly track user information as they navigate through the website. This advanced authentication mechanism not only ensures the security of user data but also provides a smooth and efficient experience as users interact with the various features of the website. With this robust system in place, user interactions are seamlessly managed, offering a heightened level of privacy and personalized navigation.

![image](https://github.com/pschnatt/MERN-SE-WEBSITE/assets/121118638/fd0d75d2-8656-41f5-8b98-9651fe963084)

<br>

- **Profile Page:** Designed with the student in mind, this profile page serves as a comprehensive tool for tracking enrolled courses and created posts. By offering a centralized space for managing educational journey milestones, students can effortlessly monitor their progress, making the learning experience more organized and insightful.

![image](https://github.com/pschnatt/MERN-SE-WEBSITE/assets/121118638/d0b99184-f3ab-43be-8524-a7605d19ad5b)

<br>

- **Learning Resource:** In this dynamic learning environment, administrators possess the capability to both post and view videos on this platform. Meanwhile, students are granted access solely to the repository of uploaded videos, where they can engage with the educational content at their own pace. This intentional division of privileges ensures a streamlined and tailored learning experience for both administrators and students alike.

![image](https://github.com/pschnatt/MERN-SE-WEBSITE/assets/121118638/65da0f3e-ba69-4334-b56b-d857897044f0)

<br>

- **Course Enrollment:** This page empowers students to effortlessly enroll in courses. By providing an intuitive interface, students can seamlessly navigate through the enrollment process, ensuring a user-friendly experience. The design is focused on simplicity and efficiency, allowing students to efficiently select and enroll in the courses of their choice, fostering a hassle-free educational journey.

![image](https://github.com/pschnatt/MERN-SE-WEBSITE/assets/121118638/2b79bcee-4fd6-45b2-8f55-555b3b83ff6c)

<br>

- **Comunnity:** Within this vibrant community space, students are encouraged to actively participate by posting questions, sharing insights, and engaging in discussions. Whether seeking clarification on lessons or exploring broader topics, the platform fosters a collaborative environment where students can both ask and answer questions. This interactive space promotes a sense of camaraderie and collective learning, enhancing the overall educational experience. There're also like feature to classify topic that are most helpful and tag search that would help them to find the topic that they want to dicuss about.

![image](https://github.com/pschnatt/MERN-SE-WEBSITE/assets/121118638/df8dae99-0a55-4f20-8981-9eca25b1f0cb)

<br>

- **Item Booking:** Designed to simplify the process, this page allows students to conveniently book or borrow items, such as mice and keyboards, from the storage. However, to maintain organizational control, only administrators have the authority to delete or adjust bookings. This intentional division of permissions ensures a secure and well-managed item lending system, providing both students and administrators with a streamlined and effective user experience.

![image](https://github.com/pschnatt/MERN-SE-WEBSITE/assets/121118638/8ced16b2-c478-49f0-8158-73ddbb9d246a)

<br>

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB

<br>

# Installation

```sh
git clone https://github.com/pschnatt/MERN-SE-WEBSITE.git
```
Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
```sh
cd server
npm install
npm start
```

Terminal 2: Setting Up Frontend
```sh
cd client
npm install
npm rundev
```

Ensure to include your personalized URL in the .env file.
```py
#create your .env file in server folder
MONGO_URL = <YOUR MONGODB URL>
JWT_SECRET = <YOUR JWT SECRET KEY>
```

Now, navigate to `localhost:5173` in your browser. 
The Backend API will be running at `localhost:8000`.
