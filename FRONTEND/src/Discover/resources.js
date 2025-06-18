// src/Discover/resources.js

/*
 * ====================================================================================
 *                                   RESOURCES
 * ====================================================================================
 * This file contains a curated list of high-quality learning resources.
 * The array is organized into the following categories for easy navigation:
 *
 * 1.  SOFTWARE ENGINEERING & COMPUTER SCIENCE FOUNDATIONS (DSA, Interview Prep)
 * 2.  WEB DEVELOPMENT (Frontend, Backend, Full-Stack)
 * 3.  MOBILE DEVELOPMENT (React Native, Flutter)
 * 4.  DEVOPS & CLOUD COMPUTING
 * 5.  DATA SCIENCE, AI & MACHINE LEARNING
 * 6.  GENERAL PROGRAMMING (Python, Go)
 * 7.  PERSONAL DEVELOPMENT
 *
 * Within each category, resources are further grouped by author/channel.
 * ====================================================================================
 */

export const resources = [

  // =================================================================================
  // 1. SOFTWARE ENGINEERING & COMPUTER SCIENCE FOUNDATIONS (DSA, Interview Prep)
  // =================================================================================

  // --- By: Raj "Striver" Vikramaditya ---

  {
    id: 'course-striver-a2z',
    title: "Striver's A2Z DSA Course",
    author: 'Raj "Striver" Vikramaditya',
    type: 'course',
    domain: 'Computer Science',
    difficulty: 'beginner',
    tags: ['DSA', 'Striver', 'A2Z Course', 'Interview Prep', 'SDE', 'Java', 'C++', 'Python'],
    link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    youtubeId: '0bHoB32fuj0',
    playlistId: 'PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz',
    description: 'The ultimate free resource to master Data Structures & Algorithms from scratch, curated by Striver for top interview preparation.',
    imageUrl: 'https://i.ytimg.com/vi/0bHoB32fuj0/hqdefault.jpg',
    rating: 4.9,
    duration: '150+ Hours',
    videoCount: 200,
    fullDescription: "This is the definitive A-Z course for Data Structures and Algorithms, created by Raj 'Striver' Vikramaditya. It's meticulously structured to guide learners from basic concepts like arrays and sorting to advanced topics like dynamic programming and graphs, ensuring they are fully prepared for technical interviews at top product-based companies. The course combines in-depth video lectures with a comprehensive problem sheet.",
    whatYouLearn: [
      'Master all important DSA topics from basics to advanced',
      'Solve a curated set of problems on the A2Z sheet',
      'Understand the core intuition behind every algorithm',
      'Learn patterns to solve new and unseen problems',
      'Get interview-ready for FAANG and top product companies'
    ],
    prerequisites: [
      'Basic knowledge of any one programming language (C++, Java, or Python)'
    ]
  },
  {
    id: 'sheet-sde',
    title: "Striver's SDE Sheet: Top Interview Problems",
    author: 'Raj "Striver" Vikramaditya',
    type: 'article',
    domain: 'Software Engineering',
    difficulty: 'intermediate',
    tags: ['DSA', 'SDE', 'Interview Prep', 'Top 180', 'Coding Problems'],
    link: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/',
    youtubeId: null,
    playlistId: null,
    description: 'The most popular problem-solving sheet for SDE interview preparation, featuring ~180 carefully selected DSA questions.',
    imageUrl: 'https://i.ytimg.com/vi/0bHoB32fuj0/hqdefault.jpg', // Using a consistent image for Striver's brand
    rating: 4.9,
    fullDescription: "Striver's SDE Sheet is a widely-followed, curated list of the most important Data Structures and Algorithms problems asked in technical interviews for SDE roles. It is designed to systematically cover all essential topics from arrays and strings to advanced topics like graphs and dynamic programming.",
    whatYouLearn: [
      'Master essential topics for SDE interviews',
      'Solve the most frequently asked coding questions',
      'Build a strong problem-solving foundation',
      'Cover patterns across various DSA topics'
    ],
    prerequisites: [
      'Solid DSA Fundamentals',
      'Proficiency in C++, Java, or Python'
    ]
  },
  {
    id: 'sheet-striver-79',
    title: "Striver's 79: Last Moment DSA Sheet",
    author: 'Raj "Striver" Vikramaditya',
    type: 'article',
    domain: 'Software Engineering',
    difficulty: 'intermediate',
    tags: ['DSA', 'Revision', 'Interview Prep', 'Last Minute'],
    link: 'https://takeuforward.org/interview-sheets/strivers-79-last-moment-dsa-sheet-ace-interviews/',
    youtubeId: null,
    playlistId: null,
    description: 'A condensed list of 79 core DSA problems, perfect for a quick and effective revision before a coding interview.',
    imageUrl: 'https://i.ytimg.com/vi/0bHoB32fuj0/hqdefault.jpg', // Using a consistent image for Striver's brand
    rating: 4.8,
    fullDescription: "This sheet contains 79 handpicked, high-impact problems designed for rapid revision in the last 7-10 days before an interview. It helps in quickly brushing up on all important DSA patterns and boosting confidence.",
    whatYouLearn: [
      'Quickly revise all important DSA patterns',
      'Boost confidence right before an interview',
      'Focus on a core set of high-impact problems',
      'Efficiently cover a wide range of topics'
    ],
    prerequisites: [
      'Solid DSA Fundamentals',
      'Familiarity with common algorithms'
    ]
  },

  // --- By: Various (Popular Sheets) ---
  
  {
    id: 'sheet-blind-75',
    title: 'Blind 75 LeetCode Problems',
    author: 'takeUforward',
    type: 'article',
    domain: 'Software Engineering',
    difficulty: 'intermediate',
    tags: ['LeetCode', 'Blind 75', 'Interview Prep', 'DSA'],
    // link: 'https://takeuforward.org/interviews/blind-75-leetcode-problems-detailed-video-solutions/',
    youtubeId: null,
    playlistId: null,
    description: 'The famous Blind 75 list of LeetCode problems, a popular set for covering a broad range of topics efficiently.',
    imageUrl: 'https://i.ytimg.com/vi/0bHoB32fuj0/hqdefault.jpg', // Using a consistent image for this category
    rating: 4.9,
    fullDescription: "The 'Blind 75' is a list of 75 essential LeetCode problems created by a software engineer at Meta. It's highly regarded as one of the most efficient ways to prepare for technical interviews, as it covers all crucial topics and patterns without needing to solve hundreds of problems. This version provides detailed video solutions for each problem.",
    whatYouLearn: [
      'Cover essential LeetCode patterns efficiently',
      'Master 75 must-do problems for top tech interviews',
      'Understand detailed video solutions for each problem',
      'Improve problem-solving speed and accuracy'
    ],
    prerequisites: [
      'Basic DSA knowledge',
      'Familiarity with the LeetCode platform'
    ]
  },
  //new playlist for React JS in Hindi///neeeewwww
{
  "id": "playlist-PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt",
  "title": "React JS Tutorial in Hindi 🔥",
  "author": "CodeWithHarry",
  "type": "course",
  "domain": "Web Development",
  "difficulty": "intermediate",
  "tags": ["React", "JavaScript", "Frontend", "Web Development", "CodeWithHarry", "Hindi"],
  // "link": "https://www.youtube.com/watch?v=-mJFZp84TIY&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt",
  "youtubeId": "-mJFZp84TIY",
  "playlistId": "PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt",
  "description": "Learn React JS step-by-step in Hindi. This tutorial series covers everything from components and props to hooks and deployment.",
  "imageUrl": "https://i.ytimg.com/vi/-mJFZp84TIY/hqdefault.jpg",
  "rating": 4.8,
  "videoCount": 81,
  "fullDescription": "A complete React JS tutorial series in Hindi by CodeWithHarry. This course takes you from the basics of React (like JSX, props, and components) all the way to advanced topics such as hooks, state management, routing, and deploying React apps.",
  "whatYouLearn": [
    "React components and JSX",
    "State and props handling",
    "Hooks (useState, useEffect, etc.)",
    "React Router and single-page application (SPA)",
    "Deployment of React applications"
  ],
  "prerequisites": [
    "Basic HTML, CSS, and JavaScript knowledge",
    "No prior React experience required"
  ]
},
{
  "id": "video-L4_jarMnB0c",
  "title": "Django Tutorial in Hindi",
  "author": "CodeWithHarry",
  "type": "video",
  "domain": "Web Development",
  "difficulty": "intermediate",
  "tags": ["Django", "Python", "Web Development", "Backend", "Hindi", "CodeWithHarry"],
  // "link": "https://www.youtube.com/watch?v=L4_jarMnB0c&list=PLu0W_9lII9ahwFDuExCpPFHAK829Wto2O",
  "youtubeId": "L4_jarMnB0c",
  "playlistId": "PLu0W_9lII9ahwFDuExCpPFHAK829Wto2O",
  "description": "Learn Django from scratch in Hindi in this beginner-friendly tutorial that walks you through creating powerful backend web applications.",
  "imageUrl": "https://i.ytimg.com/vi/L4_jarMnB0c/hqdefault.jpg",
  "rating": 4.8,
  "videoCount": 1,
  "fullDescription": "This video serves as an introduction to Django, a high-level Python web framework. You'll learn about the MVT architecture, Django setup, views, models, and routing—all explained clearly in Hindi by CodeWithHarry.",
  "whatYouLearn": [
    "How to install and set up Django",
    "Understanding Django's project and app structure",
    "Basics of models, views, templates, and URLs",
    "Running and managing Django development server"
  ],
  "prerequisites": [
    "Basic understanding of Python",
    "Familiarity with HTML/CSS"
  ]
},
{
  "id": "playlist-PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
  "title": "Generative AI Course in Hindi 🔥",
  "author": "CodeWithHarry",
  "type": "course",
  "domain": "Artificial Intelligence",
  "difficulty": "intermediate",
  "tags": ["Generative AI", "AI", "LLM", "Python", "LangChain", "Projects", "Hindi", "CodeWithHarry"],
  // "link": "https://www.youtube.com/watch?v=BP-w99ZINTc&list=PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
  "youtubeId": "BP-w99ZINTc",
  "playlistId": "PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
  "description": "A project-based Generative AI course in Hindi, building real applications using modern AI tools and libraries.",
  "imageUrl": "https://i.ytimg.com/vi/BP-w99ZINTc/hqdefault.jpg",
  "rating": 4.9,
  "videoCount": 12,
  "fullDescription": "Dive into the world of Generative AI with this project-based course in Hindi. CodeWithHarry walks you through building practical AI applications from scratch, utilizing powerful tools like Large Language Models (LLMs), LangChain, and various APIs. This course focuses on hands-on learning, showing you how to integrate AI into real-world projects.",
  "whatYouLearn": [
    "Fundamentals of Generative AI and Large Language Models (LLMs)",
    "Building real-world AI applications from scratch",
    "Using libraries like LangChain to create AI-powered workflows",
    "Integrating with various AI APIs (like Gemini or OpenAI)",
    "Practical prompt engineering for better AI responses"
  ],
  "prerequisites": [
    "Solid understanding of the Python programming language",
    "Familiarity with how APIs work"
  ]
},
{
  "id": "playlist-PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
  "title": "Sigma Web Development Course in Hindi 🔥",
  "author": "CodeWithHarry",
  "type": "course",
  "domain": "Web Development",
  "difficulty": "beginner",
  "tags": ["Web Development", "Full-Stack", "HTML", "CSS", "JavaScript", "React", "Node.js", "Hindi"],
  // "link": "https://www.youtube.com/watch?v=tVzUXW6siu0&list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
  "youtubeId": "tVzUXW6siu0",
  "playlistId": "PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
  "description": "The ultimate web development course in Hindi, designed to take you from an absolute beginner to a full-stack developer.",
  "imageUrl": "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg",
  "rating": 4.9,
  "videoCount": 100,
  "fullDescription": "Join the Sigma Web Development course, a comprehensive 100-day journey to becoming a full-stack developer, taught in Hindi by CodeWithHarry. This course leaves no stone unturned, starting with the absolute basics of HTML, moving through CSS and JavaScript, and then diving deep into modern technologies like React for the frontend and Node.js/Express for the backend.",
  "whatYouLearn": [
    "Building websites from scratch using HTML, CSS, and JavaScript",
    "Mastering JavaScript for dynamic and interactive web pages",
    "Developing modern frontends with the React library",
    "Creating powerful backends and APIs with Node.js and Express",
    "Understanding the complete full-stack development process"
  ],
  "prerequisites": [
    "No prior programming experience is required",
    "A passion for learning and building projects"
  ]
},

{
  "id": "playlist-PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR",
  "title": "JavaScript Tutorials for Beginners in Hindi",
  "author": "CodeWithHarry",
  "type": "course",
  "domain": "Web Development",
  "difficulty": "beginner",
  "tags": ["JavaScript", "Hindi", "Web Development", "Frontend", "JS in Hindi", "CodeWithHarry"],
  // "link": "https://www.youtube.com/watch?v=ER9SspLe4Hg&list=PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR",
  "youtubeId": "ER9SspLe4Hg",
  "playlistId": "PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR",
  "description": "A complete guide for beginners to learn JavaScript from scratch, taught entirely in Hindi for easy understanding.",
  "imageUrl": "https://i.ytimg.com/vi/ER9SspLe4Hg/hqdefault.jpg",
  "rating": 4.9,
  "videoCount": 100,
  "fullDescription": "This comprehensive JavaScript course in Hindi is designed to take you from a complete novice to a confident web developer. It covers all the essential concepts, including variables, functions, DOM manipulation, events, and asynchronous programming, ensuring a strong foundation.",
  "whatYouLearn": [
    "Core JavaScript fundamentals and syntax",
    "How to make websites interactive with DOM manipulation",
    "Handling user events like clicks and forms",
    "Asynchronous programming with callbacks and promises",
    "Building practical mini-projects"
  ],
  "prerequisites": [
    "Basic knowledge of HTML and CSS",
    "No prior programming experience needed"
  ]
},
{
  "id": "playlist-PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60",
  "title": "Full Stack React & Django [1] - Basic REST API",
  "author": "Academind",
  "type": "course",
  "domain": "Web Development",
  "difficulty": "intermediate",
  "tags": ["React", "Django", "Full-Stack", "REST API", "Python", "JavaScript", "Academind"],
  // "link": "https://www.youtube.com/watch?v=Uyei2iDA4Hs&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60",
  "youtubeId": "Uyei2iDA4Hs",
  "playlistId": "PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60",
  "description": "Learn to build a full-stack application by connecting a React frontend to a powerful Django REST API backend.",
  "imageUrl": "https://i.ytimg.com/vi/Uyei2iDA4Hs/hqdefault.jpg",
  "rating": 4.8,
  "videoCount": 42,
  "fullDescription": "This course teaches you how to create a full-stack application by combining the power of React for the frontend and Django for the backend. You'll start by building a basic REST API with Django and then create a dynamic React application to consume and display the data.",
  "whatYouLearn": [
    "Setting up a Django project and creating a REST API",
    "Connecting a React application to a backend API",
    "Performing CRUD (Create, Read, Update, Delete) operations",
    "Understanding the flow of data in a full-stack environment",
    "Using tools like Axios for making API requests"
  ],
  "prerequisites": [
    "Solid understanding of React.js",
    "Basic knowledge of Python"
  ]
},
{
  "id": "playlist-PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm",
  "title": "Learn MERN Stack",
  "author": "Academind",
  "type": "course",
  "domain": "Web Development",
  "difficulty": "intermediate",
  "tags": ["MERN", "React", "Node.js", "Express", "MongoDB", "Full-Stack", "Academind"],
  // "link": "https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm",
  "youtubeId": "-0exw-9YJBo",
  "playlistId": "PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm",
  "description": "A comprehensive course to learn the MERN (MongoDB, Express, React, Node.js) stack by building a full-stack application.",
  "imageUrl": "https://i.ytimg.com/vi/-0exw-9YJBo/hqdefault.jpg",
  "rating": 4.9,
  "videoCount": 50,
  "fullDescription": "This in-depth course guides you through building a complete full-stack social media application using the MERN stack. You will learn how to create a REST API with Node.js and Express, manage data with MongoDB, and build a dynamic frontend with React that communicates with your backend. It covers authentication, file uploads, and more.",
  "whatYouLearn": [
    "Building a REST API with Node.js & Express",
    "Connecting a React frontend to a backend API",
    "User authentication with JSON Web Tokens (JWT)",
    "Managing complex state in React",
    "Working with a NoSQL database (MongoDB)"
  ],
  "prerequisites": [
    "Solid knowledge of React.js",
    "Basic understanding of Node.js and Express"
  ]
},
{
  "id": "playlist-PLhgw50vUymyckXl3D1IlXoVl94wknJfUC",
  "title": "System Design Interview Question",
  "author": "Codekarle",
  "type": "video",
  "domain": "Software Engineering",
  "difficulty": "intermediate",
  "tags": ["System Design", "Interview", "Architecture", "Scalability", "Codekarle"],
  // "link": "https://www.youtube.com/watch?v=EpASu_1dUdE&list=PLhgw50vUymyckXl3D1IlXoVl94wknJfUC",
  "youtubeId": "EpASu_1dUdE",
  "playlistId": "PLhgw50vUymyckXl3D1IlXoVl94wknJfUC",
  "imageUrl": "https://i.ytimg.com/vi/EpASu_1dUdE/hqdefault.jpg",
  "description": "A quick, high-level overview of a common system design interview question, explained in the fast-paced Fireship style.",
  "rating": 4.8,
  "videoCount": 1,
  "fullDescription": "This video breaks down a classic system design interview question, such as 'Design Twitter' or 'Design a URL Shortener'. It covers key concepts to discuss, including scalability, databases, caching, and API design, all in a concise and easy-to-digest format.",
  "whatYouLearn": [
    "How to approach a system design question",
    "Key components of a scalable system",
    "Trade-offs between different architectural choices",
    "Common patterns like load balancing and caching"
  ],
  "prerequisites": [
    "Basic understanding of web architecture",
    "Familiarity with databases and APIs"
  ]
},
{
  "id": "playlist-PLhgw50vUymycJPN6ZbGTpVKAJ0cL4OEH3",
  "title": "System Design Interview Preparation Series",
  "author": "codeKarle",
  "type": "course",
  "domain": "Software Engineering",
  "difficulty": "intermediate",
  "tags": ["System Design", "Interview Prep", "Architecture", "Series", "codeKarle", "Software Engineering"],
  // "link": "https://www.youtube.com/watch?v=3loACSxowRU&list=PLhgw50vUymycJPN6ZbGTpVKAJ0cL4OEH3",
  "youtubeId": "3loACSxowRU",
  "playlistId": "PLhgw50vUymycJPN6ZbGTpVKAJ0cL4OEH3",
  "imageUrl": "https://i.ytimg.com/vi/3loACSxowRU/hqdefault.jpg",
  "description": "A complete series by codeKarle dedicated to mastering system design concepts for top tech company interviews.",
  "rating": 4.9,
  "videoCount": 25,
  "fullDescription": "This comprehensive series covers a wide range of system design topics essential for acing technical interviews. From designing large-scale systems like Netflix and Uber to deep dives into individual components like databases, caches, and message queues, this course prepares you for real-world architectural challenges.",
  "whatYouLearn": [
    "Fundamentals of scalable system architecture",
    "Designing popular applications (e.g., social media, ride-sharing)",
    "Deep dives into database choices (SQL vs. NoSQL)",
    "Understanding caching strategies and load balancers",
    "Common interview patterns and how to answer them"
  ],
  "prerequisites": [
    "Experience with at least one programming language",
    "Knowledge of data structures and algorithms"
  ]
},
{
  "id": "playlist-PL55RiY5tL51poFMpbva1IqfO-pylwSNsN",
  "title": "Git Tutorial for Beginners - Crash Course",
  "author": "Codevolution",
  "type": "course",
  "domain": "Development Tools",
  "difficulty": "beginner",
  "tags": ["Git", "Version Control", "GitHub", "CLI", "Codevolution"],
  // "link": "https://www.youtube.com/watch?v=_OZVJpLHUaI&list=PL55RiY5tL51poFMpbva1IqfO-pylwSNsN",
  "youtubeId": "_OZVJpLHUaI",
  "playlistId": "PL55RiY5tL51poFMpbva1IqfO-pylwSNsN",
  "description": "A crash course on Git and version control for beginners. Learn how to use Git in the command line and collaborate using GitHub.",
  "imageUrl": "https://i.ytimg.com/vi/_OZVJpLHUaI/hqdefault.jpg",
  "rating": 4.8,
  "videoCount": 12,
  "fullDescription": "This Git tutorial series teaches you how to use Git efficiently from the command line, manage code history, and collaborate using GitHub. Perfect for absolute beginners looking to get started with version control.",
  "whatYouLearn": [
    "Installing and setting up Git",
    "Basic Git commands (clone, commit, push, pull)",
    "Working with branches",
    "Resolving merge conflicts",
    "Using GitHub for collaboration"
  ],
  "prerequisites": [
    "None – beginner-friendly"
  ]
},
{
  "id": "playlist-PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_",
  "title": "Build a Complete App with GraphQL, Node.js, MongoDB and React.js",
  "author": "Codevolution",
  "type": "project",
  "domain": "Web Development",
  "difficulty": "intermediate",
  "tags": ["GraphQL", "React", "MongoDB", "Node.js", "Full Stack", "Project"],
  // "link": "https://www.youtube.com/watch?v=7giZGFDGnkc&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_",
  "youtubeId": "7giZGFDGnkc",
  "playlistId": "PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_",
  "description": "Build a full-stack event booking app using GraphQL with React, Node.js, and MongoDB.",
  "imageUrl": "https://i.ytimg.com/vi/7giZGFDGnkc/hqdefault.jpg",
  "rating": 4.8,
  "videoCount": 18,
  "fullDescription": "This project-based course walks you through creating a full event booking platform. You'll create a GraphQL backend with Node.js and MongoDB and consume it using a modern React frontend.",
  "whatYouLearn": [
    "GraphQL queries, mutations, and schemas",
    "Connecting MongoDB to a Node.js backend",
    "Authentication and authorization",
    "Building a dynamic frontend using React",
    "Full-stack deployment techniques"
  ],
  "prerequisites": [
    "Intermediate React knowledge",
    "Basic understanding of Node.js and MongoDB"
  ]
},
{
  "id": "playlist-PL55RiY5tL51o5jBXR1h2JvFm0L-fbThG4",
  "title": "Python for Data Analysis Tutorial - Setup, Read File & First Chart",
  "author": "Codevolution",
  "type": "course",
  "domain": "Data Science",
  "difficulty": "beginner",
  "tags": ["Python", "Data Analysis", "Pandas", "Matplotlib", "Data Science", "Codevolution"],
  // "link": "https://www.youtube.com/watch?v=cXP_i5-nTXg&list=PL55RiY5tL51o5jBXR1h2JvFm0L-fbThG4",
  "youtubeId": "cXP_i5-nTXg",
  "playlistId": "PL55RiY5tL51o5jBXR1h2JvFm0L-fbThG4",
  "description": "A beginner's guide to data analysis with Python, starting with environment setup, reading data, and creating your first visualization.",
  "imageUrl": "https://i.ytimg.com/vi/cXP_i5-nTXg/hqdefault.jpg",
  "rating": 4.8,
  "videoCount": 25,
  "fullDescription": "This tutorial series is the perfect starting point for anyone interested in data analysis using Python. It guides you through setting up your environment, using the Pandas library to read and manipulate data from files (like CSVs), and then using Matplotlib or Seaborn to create your very first charts and visualizations to uncover insights.",
  "whatYouLearn": [
    "Setting up a Python environment for data science (e.g., Anaconda)",
    "Using Pandas to load data into DataFrames",
    "Performing basic data cleaning and manipulation",
    "Creating your first plots and charts with Matplotlib",
    "Understanding the basic data analysis workflow"
  ],
  "prerequisites": [
    "Basic Python programming knowledge is required"
  ]
},
{
  "id": "playlist-PL55RiY5tL51qKxC472MY2ayxJTze5Qb7T",
  "title": "Flutter Tutorial for Beginners - Build iOS and Android Apps",
  "author": "Codevolution",
  "type": "course",
  "domain": "Mobile Development",
  "difficulty": "beginner",
  "tags": ["Flutter", "Dart", "Mobile Development", "iOS", "Android", "Codevolution"],
  // "link": "https://www.youtube.com/watch?v=GLSG_Wh_YWc&list=PL55RiY5tL51qKxC472MY2ayxJTze5Qb7T",
  "youtubeId": "GLSG_Wh_YWc",
  "playlistId": "PL55RiY5tL51qKxC472MY2ayxJTze5Qb7T",
  "description": "Learn to build beautiful, natively compiled apps for both iOS and Android from a single codebase with Flutter and Dart.",
  "imageUrl": "https://i.ytimg.com/vi/GLSG_Wh_YWc/hqdefault.jpg",
  "rating": 4.8,
  "videoCount": 55,
  "fullDescription": "This comprehensive tutorial is your guide to mastering Flutter for cross-platform mobile app development. The course starts with the fundamentals of the Dart programming language and then dives into Flutter's widget-based architecture. You will learn how to build layouts, manage state, handle navigation, and create stunning user interfaces.",
  "whatYouLearn": [
    "Fundamentals of the Dart programming language",
    "Core concepts of the Flutter framework",
    "Building UIs with stateless and stateful widgets",
    "Navigation and routing between different screens",
    "Fetching data from APIs and managing app state"
  ],
  "prerequisites": [
    "Some experience with any object-oriented programming language is beneficial"
  ]
},

  {
    "id": "playlist-PL4cUxeGkcC9iMeu6v8Y-bxhtIOzYcB2Ot",
    "title": "Laravel Authentication Tutorial #1 - Intro & Setup",
    "author": "The Net Ninja",
    "type": "course",
    "domain": "Web Development",
    "difficulty": "intermediate",
    "tags": ["Laravel", "PHP", "Authentication", "Backend", "Web Development", "The Net Ninja"],
    // "link": "https://www.youtube.com/watch?v=3JBmbQsR0ag&list=PL4cUxeGkcC9iMeu6v8Y-bxhtIOzYcB2Ot",
    "youtubeId": "3JBmbQsR0ag",
    "playlistId": "PL4cUxeGkcC9iMeu6v8Y-bxhtIOzYcB2Ot",
    "description": "Learn how to implement a complete authentication system in your Laravel projects from scratch.",
    "imageUrl": "https://i.ytimg.com/vi/3JBmbQsR0ag/hqdefault.jpg",
    "rating": 4.8,
    "videoCount": 15,
    "fullDescription": "This tutorial series provides a step-by-step guide to building a secure authentication system in Laravel. You will learn how to handle user registration, login, logout, and protect routes, all using Laravel's built-in features. It's an essential skill for any backend developer working with the PHP ecosystem.",
    "whatYouLearn": [
      "Setting up a fresh Laravel project",
      "Implementing user registration and login forms",
      "Creating protected routes for authenticated users",
      "Using middleware for authentication checks",
      "Password hashing and secure practices"
    ],
    "prerequisites": [
      "Solid understanding of PHP",
      "Basic knowledge of the Laravel framework"
    ]
  },
  {
    "id": "playlist-PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
    "title": "Complete React Native Tutorial #1 - Introduction & Setup (Expo)",
    "author": "The Net Ninja",
    "type": "course",
    "domain": "Mobile Development",
    "difficulty": "beginner",
    "tags": ["React Native", "Expo", "Mobile Development", "JavaScript", "iOS", "Android", "The Net Ninja"],
    // "link": "https://www.youtube.com/watch?v=J2j1yk-34OY&list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
    "youtubeId": "J2j1yk-34OY",
    "playlistId": "PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
    "description": "A beginner's guide to building cross-platform mobile apps with React Native and the Expo toolkit.",
    "imageUrl": "https://i.ytimg.com/vi/J2j1yk-34OY/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 40,
    "fullDescription": "This complete React Native tutorial teaches you how to build mobile apps for both iOS and Android from a single JavaScript codebase. The course focuses on using Expo to simplify the development process, covering components, navigation, state management, and interacting with native device features.",
    "whatYouLearn": [
      "Setting up a development environment with Expo CLI",
      "Core React Native components and styling",
      "Building layouts and user interfaces",
      "Navigation between different screens",
      "Fetching data from an API"
    ],
    "prerequisites": [
      "A good understanding of React.js and JavaScript (ES6+)"
    ]
  },
  {
    "id": "playlist-PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
    "title": "Java + DSA + Interview Preparation Course",
    "author": "Telusko",
    "type": "course",
    "domain": "Computer Science",
    "difficulty": "beginner",
    "tags": ["Java", "DSA", "Interview Prep", "Data Structures", "Algorithms", "Telusko"],
    // "link": "https://www.youtube.com/watch?v=rZ41y93P2Qo&list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
    "youtubeId": "rZ41y93P2Qo",
    "playlistId": "PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
    "description": "A complete course combining Java programming, Data Structures & Algorithms, and interview preparation tips.",
    "imageUrl": "https://i.ytimg.com/vi/rZ41y93P2Qo/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 150,
    "fullDescription": "This is a comprehensive course designed to make you interview-ready. It starts with teaching the Java programming language from the fundamentals, then moves into a deep dive of all essential Data Structures and Algorithms (DSA), and finally provides tips and strategies for cracking technical interviews.",
    "whatYouLearn": [
      "Core Java and Object-Oriented Programming (OOP)",
      "All major Data Structures (Arrays, Linked Lists, Trees, Graphs, etc.)",
      "Commonly used Algorithms (Sorting, Searching, etc.)",
      "How to analyze time and space complexity",
      "Solving popular coding interview questions"
    ],
    "prerequisites": [
      "No prior programming experience is required"
    ]
  },
  {
    "id": "playlist-PL9gnSGHSqcnrslTujkMYzx-GuVrpVpu5_",
    "title": "Building and Deploying AI Application",
    "author": "Telusko",
    "type": "course",
    "domain": "Artificial Intelligence",
    "difficulty": "intermediate",
    "tags": ["AI", "Machine Learning", "Deployment", "Python", "Flask", "Docker", "Telusko"],
    // "link": "https://www.youtube.com/watch?v=_CgBmuZ99M8&list=PL9gnSGHSqcnrslTujkMYzx-GuVrpVpu5_",
    "youtubeId": "_CgBmuZ99M8",
    "playlistId": "PL9gnSGHSqcnrslTujkMYzx-GuVrpVpu5_",
    "description": "A practical course on the end-to-end process of building an AI model and deploying it as a web application.",
    "imageUrl": "https://i.ytimg.com/vi/_CgBmuZ99M8/hqdefault.jpg",
    "rating": 4.8,
    "videoCount": 30,
    "fullDescription": "This course takes you beyond just training a model. You'll learn the complete lifecycle of an AI project: from building a machine learning model in Python to wrapping it in a web framework like Flask, and finally, deploying it to a server using tools like Docker so it can be used by others.",
    "whatYouLearn": [
      "Training a machine learning model with Scikit-learn",
      "Building a REST API with Flask to serve model predictions",
      "Containerizing an application with Docker",
      "Deploying to cloud platforms (e.g., Heroku, AWS)",
      "Understanding the end-to-end MLops workflow"
    ],
    "prerequisites": [
      "Strong Python programming skills",
      "Familiarity with machine learning concepts"
    ]
  },
  {
    "id": "playlist-PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
    "title": "Java & DSA Course for Placement",
    "author": "Apna College",
    "type": "course",
    "domain": "Computer Science",
    "difficulty": "beginner",
    "tags": ["Java", "DSA", "Placement", "Interview Prep", "Apna College", "Data Structures"],
    // "link": "https://www.youtube.com/watch?v=yRpLlJmRo2w&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
    "youtubeId": "yRpLlJmRo2w",
    "playlistId": "PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
    "description": "A complete Java and Data Structures & Algorithms course specifically designed to help students crack placement interviews.",
    "imageUrl": "https://i.ytimg.com/vi/yRpLlJmRo2w/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 39,
    "fullDescription": "This is the ultimate placement preparation course by Apna College. It covers the Java language in-depth, followed by a rigorous curriculum on Data Structures and Algorithms. The course is structured to build a strong foundation and problem-solving skills needed to succeed in technical interviews for top companies.",
    "whatYouLearn": [
      "Java from basics to advanced OOP concepts",
      "In-depth analysis of every major Data Structure",
      "Core Algorithms and their time/space complexity",
      "How to approach and solve problems in interviews",
      "A roadmap for placement preparation"
    ],
    "prerequisites": [
      "No programming experience needed, starts from scratch"
    ]
  },




  // /neeeee
  {
    "id": "playlist-PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
    "title": "Operating Systems for GATE",
    "author": "GATE SMASHERS",
    "type": "course",
    "domain": "Computer Science",
    "difficulty": "intermediate",
    "tags": ["Operating Systems", "OS", "GATE", "Computer Science", "CSE"],
    // "link": "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
    "youtubeId": "bkSWJJZNgf8",
    "playlistId": "PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
    "description": "A complete lecture series on Operating Systems, tailored for students preparing for the GATE examination.",
    "imageUrl": "https://i.ytimg.com/vi/bkSWJJZNgf8/hqdefault.jpg",
    "rating": 4.7,
    "videoCount": 85,
    "fullDescription": "This comprehensive course covers the entire syllabus for the Operating Systems section of the GATE (Graduate Aptitude Test in Engineering) exam. Topics include processes, threads, CPU scheduling, memory management, file systems, and synchronization.",
    "whatYouLearn": [
      "Core concepts of modern operating systems.",
      "In-depth knowledge of process and memory management.",
      "Synchronization techniques like semaphores and mutexes.",
      "How to solve previous years' GATE questions effectively."
    ],
    "prerequisites": ["C Programming", "Data Structures"]
  },
  {
    "id": "playlist-PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
    "title": "Artificial Neural Networks from Basics",
    "author": "GATE SMASHERS",
    "type": "course",
    "domain": "Artificial Intelligence",
    "difficulty": "beginner",
    "tags": ["Neural Networks", "ANN", "Deep Learning", "Machine Learning", "AI"],
    // "link": "https://www.youtube.com/watch?v=1TmUwRALJW0&list=PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
    "youtubeId": "1TmUwRALJW0",
    "playlistId": "PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
    "description": "Understand the fundamentals of Artificial Neural Networks (ANN) with clear examples and explanations.",
    "imageUrl": "https://i.ytimg.com/vi/1TmUwRALJW0/hqdefault.jpg",
    "rating": 4.8,
    "videoCount": 40,
    "fullDescription": "This series is perfect for beginners looking to step into the world of deep learning. It explains the core building blocks of neural networks, such as perceptrons, activation functions, backpropagation, and different types of layers, without overwhelming mathematics.",
    "whatYouLearn": [
      "The basic architecture of a neural network.",
      "How neurons and activation functions work.",
      "The concept of training a model using backpropagation.",
      "Differences between various types of neural networks."
    ],
    "prerequisites": ["Basic Python", "High School Math"]
  },
  {
    "id": "playlist-PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO",
    "title": "Build Agentic AI Chatbots with LangGraph",
    "author": "Krish Naik",
    "type": "course",
    "domain": "Artificial Intelligence",
    "difficulty": "advanced",
    "tags": ["LangChain", "LangGraph", "Generative AI", "LLM", "Agentic AI"],
    // "link": "https://www.youtube.com/watch?v=HCSPIH3I-vc&list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO",
    "youtubeId": "HCSPIH3I-vc",
    "playlistId": "PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO",
    "description": "A hands-on tutorial series on building advanced, agentic AI systems using the LangGraph library.",
    "imageUrl": "https://i.ytimg.com/vi/HCSPIH3I-vc/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 7,
    "fullDescription": "Go beyond simple chatbots and learn to build AI agents that can reason, plan, and use tools. This series from Krish Naik dives into LangGraph, a powerful extension of LangChain for creating stateful, multi-agent applications with cycles and complex logic.",
    "whatYouLearn": [
      "What agentic AI is and why it's powerful.",
      "How to define agent states and graphs using LangGraph.",
      "Building AI agents that can use tools like search engines.",
      "Creating cyclical, reasoning-based AI workflows."
    ],
    "prerequisites": ["Python", "LangChain Basics", "Understanding of LLMs"]
  },
  {
    "id": "playlist-PLZoTAELRMXVPf7ga5ywnGcsh_jXisjocx",
    "title": "Getting Started With Big Data Engineering",
    "author": "Krish Naik",
    "type": "course",
    "domain": "Data Engineering",
    "difficulty": "beginner",
    "tags": ["Big Data", "Data Engineering", "Spark", "Hadoop", "Roadmap"],
    // "link": "https://www.youtube.com/watch?v=YNQWZ4uGrqc&list=PLZoTAELRMXVPf7ga5ywnGcsh_jXisjocx",
    "youtubeId": "YNQWZ4uGrqc",
    "playlistId": "PLZoTAELRMXVPf7ga5ywnGcsh_jXisjocx",
    "description": "A complete roadmap and introductory series for anyone looking to start a career in Big Data Engineering.",
    "imageUrl": "https://i.ytimg.com/vi/YNQWZ4uGrqc/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 25,
    "fullDescription": "This course provides a clear path into the world of big data. It covers the essential technologies like Hadoop and Spark, explains the roles and responsibilities of a data engineer, and lays out a step-by-step roadmap of skills you need to learn to succeed in the field.",
    "whatYouLearn": [
      "The fundamentals of Big Data and its ecosystem.",
      "Core concepts of Apache Spark and Hadoop.",
      "The difference between data lakes and data warehouses.",
      "A clear career roadmap for becoming a Data Engineer."
    ],
    "prerequisites": ["Python/Java Basics", "SQL Knowledge"]
  },
  
  {
    "id": "playlist-PLrL_PSQ6q0606tibu0c9lFIzkFtshv7HI",
    "title": "Complete OS Course for Placements",
    "author": "Riti Kumari",
    "type": "course",
    "domain": "Computer Science",
    "difficulty": "beginner",
    "tags": ["Operating Systems", "OS", "Placements", "Apna College", "Computer Science"],
    // "link": "https://www.youtube.com/watch?v=Q_OU-aKC_Gk&list=PLrL_PSQ6q0606tibu0c9lFIzkFtshv7HI",
    "youtubeId": "Q_OU-aKC_Gk",
    "playlistId": "PLrL_PSQ6q0606tibu0c9lFIzkFtshv7HI",
    "description": "A comprehensive Operating Systems course designed specifically for college students preparing for placements.",
    "imageUrl": "https://i.ytimg.com/vi/Q_OU-aKC_Gk/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 25,
    "fullDescription": "This playlist from Shradha Khapra covers all essential Operating System concepts from scratch, making it ideal for semester exams and technical interview preparation. It simplifies complex topics like scheduling, synchronization, and memory management.",
    "whatYouLearn": [
      "Process & Thread Management",
      "CPU Scheduling Algorithms",
      "Deadlocks and Synchronization",
      "Memory Management Techniques",
      "File Systems and I/O Management"
    ],
    "prerequisites": ["Basic C/C++ Knowledge"]
  },
  {
    "id": "playlist-PLrL_PSQ6q062cD0vPMGYW_AIpNg6T0_Fq",
    "title": "Complete DBMS Course | Placements & Exams",
    "author": "Riti Kumari",
    "type": "course",
    "domain": "Databases",
    "difficulty": "beginner",
    "tags": ["DBMS", "Databases", "SQL", "Placements", "Semester Exams", "MySQL"],
    // "link": "https://www.youtube.com/watch?v=eylFMNSJCQo&list=PLrL_PSQ6q062cD0vPMGYW_AIpNg6T0_Fq",
    "youtubeId": "eylFMNSJCQo",
    "playlistId": "PLrL_PSQ6q062cD0vPMGYW_AIpNg6T0_Fq",
    "description": "A complete Database Management System (DBMS) course covering theoretical concepts and practical SQL for exams and jobs.",
    "imageUrl": "https://i.ytimg.com/vi/eylFMNSJCQo/hqdefault.jpg",
    "rating": 4.8,
    "videoCount": 80,
    "fullDescription": "This extensive 80-video course by Riti Kumari is the ultimate guide to Database Management Systems. It's perfectly suited for university students and job aspirants, covering everything from ER diagrams and normalization to advanced SQL and transaction management.",
    "whatYouLearn": [
      "Relational Database Fundamentals",
      "Entity-Relationship (ER) Modeling",
      "Database Normalization (1NF, 2NF, 3NF, BCNF)",
      "Writing complex SQL Queries",
      "Transaction Control and Concurrency (ACID properties)"
    ],
    "prerequisites": ["None"]
  },
  {
    "id": "playlist-PLMCXHnjXnTnt-aA0yHoa6QcVdQ0Mu3g9j",
    "title": "A.I. Engineering Playlist",
    "author": "Codebasics (Dhaval Patel)",
    "type": "course",
    "domain": "Artificial Intelligence",
    "difficulty": "intermediate",
    "tags": ["AI", "MLOps", "Generative AI", "AI Engineering", "Codebasics", "Deployment"],
    // "link": "https://www.youtube.com/watch?v=Z3uWleYwOQA&list=PLMCXHnjXnTnt-aA0yHoa6QcVdQ0Mu3g9j",
    "youtubeId": "Z3uWleYwOQA",
    "playlistId": "PLMCXHnjXnTnt-aA0yHoa6QcVdQ0Mu3g9j",
    "description": "A practical playlist focusing on the engineering aspects of building and deploying production-ready AI systems.",
    "imageUrl": "https://i.ytimg.com/vi/Z3uWleYwOQA/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 30,
    "fullDescription": "Move beyond just training models. This playlist from Codebasics teaches you the engineering discipline required to build robust, scalable, and production-ready AI applications. It covers topics like MLOps, vector databases, model deployment, and system architecture for AI.",
    "whatYouLearn": [
      "Building end-to-end AI applications",
      "MLOps principles and tools",
      "Working with Vector Databases for RAG",
      "Deploying machine learning models as APIs"
    ],
    "prerequisites": ["Python", "Machine Learning Fundamentals"]
  },
  {
    "id": "playlist-PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
    "title": "System Design for FAANG Interviews",
    "author": "Codebasics (Dhaval Patel)",
    "type": "course",
    "domain": "System Design",
    "difficulty": "intermediate",
    "tags": ["System Design", "FAANG", "Interviews", "Architecture", "Codebasics", "Scalability"],
    // "link": "https://www.youtube.com/watch?v=SqcXvc3ZmRU&list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
    "youtubeId": "SqcXvc3ZmRU",
    "playlistId": "PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
    "description": "A popular system design series that prepares you for interviews at top tech companies like FAANG.",
    "imageUrl": "https://i.ytimg.com/vi/SqcXvc3ZmRU/hqdefault.jpg",
    "rating": 4.9,
    "videoCount": 20,
    "fullDescription": "This highly-regarded playlist by Codebasics is essential viewing for anyone preparing for a senior software engineering role. It breaks down common system design interview questions, explains the thought process, and covers key building blocks of scalable architecture.",
    "whatYouLearn": [
      "A framework for tackling system design questions",
      "Designing systems like Netflix, Uber, and Twitter",
      "Understanding concepts like CAP theorem and microservices",
      "Scaling databases and services effectively"
    ],
    "prerequisites": ["Software Development Experience", "Data Structures & Algorithms"]
  },
  {
  "id": "video-AK0hu0Zxua4",
  "title": "Introduction To System Design – Low Level Design Masterclass",
  "author": "CoderArmy",
  "type": "course",
  "domain": "System Design",
  "difficulty": "intermediate",
  "tags": ["System Design", "Low-Level Design", "LLD", "Software Engineering", "Architecture", "Design Patterns"],
  "youtubeId": "AK0hu0Zxua4",
  "playlistId": "PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT",
  "description": "This video is part of the CoderArmy System Design series, providing a detailed masterclass on Low-Level Design (LLD) principles and practices.",
  "imageUrl": "https://i.ytimg.com/vi/AK0hu0Zxua4/hqdefault.jpg",
  "rating": 4.9,
  "videoCount": 32,
  "fullDescription": "This masterclass by CoderArmy dives deep into Low-Level Design — a crucial skill for software engineers. It goes beyond high-level architecture to focus on class diagrams, design patterns, and the SOLID principles required to build maintainable, scalable, and robust code components. A must-watch for those preparing for senior SDE interviews.",
  "whatYouLearn": [
    "Applying SOLID principles in practice",
    "Understanding and using common Design Patterns (Factory, Singleton, etc.)",
    "Creating detailed class and sequence diagrams",
    "How to structure code for long-term maintainability",
    "Translating high-level requirements into detailed component designs"
  ],
  "prerequisites": [
    "Object-Oriented Programming (OOP)",
    "Experience with Java, C++, or Python",
    "Basic Data Structures"
  ]
},




];