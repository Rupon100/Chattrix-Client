# Chattrix
## live: https://chattrix-8cdf5.web.app/

## Purpose
The purpose of this application is to create an interactive platform where users can share posts, engage with content through comments and votes, and manage their profile and membership status. It provides a personalized experience with features like dynamic search, tagging, and post sorting. The platform also includes an admin dashboard for managing users, handling reported activities, and making announcements. The system integrates user authentication, membership upgrades, and social sharing, all while maintaining a secure and user-friendly environment.

## Key Features
The application includes several key features designed for both users and admins. The Homepage features a dynamic navbar that displays a user profile with a dropdown menu (Dashboard and Logout) when logged in or a Join Us button otherwise. It includes a banner with a search bar powered by backend functionality and recent popular searches. Users can filter posts using a dedicated tags section and view announcements if available. Posts are displayed from newest to oldest with pagination (5 posts per page) and can be sorted by popularity based on vote difference (UpVote - DownVote).

On the Post Details Page, users can view detailed information about a post, including author info, title, description, tags, time, votes, and comments. Additional functionalities include commenting, voting, and sharing posts via social media using the react-share package. The Membership Page enables users to upgrade their accounts, granting them a Gold badge and allowing more than 5 posts.

The User Dashboard includes several sections: My Profile, where users can view their details, badges (Bronze for joining, Gold for membership), and recent posts; Add Post, where users can create new posts with restrictions for non-members; and My Posts, which lists all user posts in a tabular format with options to comment, delete, or manage visibility (public/private).

Admins have access to an Admin Dashboard, which includes sections for managing users (make admin, search by username, and manage memberships), reviewing and acting on reported comments, and making announcements. The Admin Profile displays admin details and a pie chart of site statistics (total posts, comments, and users) and includes a form for adding tags to be used across the site. Security is enforced with JWT for login and social authentication, and pagination is applied to tables displaying users, posts, and comments. Optional features like dynamic voting behavior, an About Me section, post visibility management, Axios interceptors, and enhanced search functionalities add additional layers of interactivity and customization.

## Admin Report Action
If a user reports a comment on their post, the user can report the comment to the admin. The admin will then review the report to determine if it is valid. If the report is valid, the admin can take action by deleting the comment.

## NPM Package Used For this application(front-end)
- @stripe/react-stripe-js - Stripe integration for React.
- @tanstack/react-query - Data fetching and state management for React.
- axios - HTTP client for making requests.
- firebase - Firebase SDK for frontend applications.
- react - React library.
- react-dom - React DOM library.
- react-helmet-async - For managing document head in React.
- react-hook-form - Form handling in React.
- react-hot-toast - Toast notifications for React.
- react-icons - React icons library.
- react-router-dom - Routing library for React.
- react-share - React components for social sharing.
- recharts - Charting library for React.
- sweetalert2 - Improved version of SweetAlert.