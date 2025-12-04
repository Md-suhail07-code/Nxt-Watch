# Nxt Watch - YouTube-like Video Streaming Application

A React-based video streaming platform with user authentication, video search, theme switching, and saved videos functionality.

## Quick Start

```bash
npm install
npm run dev
```

Access at: `http://localhost:5173/`

## Test Credentials

- **Username**: rahul
- **Password**: rahul@2021

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with video search |
| `/login` | Authentication page |
| `/trending` | Trending videos feed |
| `/gaming` | Gaming videos feed |
| `/saved-videos` | Saved videos library |
| `/videos/:id` | Video details page |

## Core Features

✅ **User Authentication** - JWT-based login system with cookie storage  
✅ **Video Discovery** - Browse home, trending, and gaming videos  
✅ **Video Search** - Search and filter videos by keywords  
✅ **Video Interactions** - Like, dislike, and save videos  
✅ **Dark/Light Theme** - Toggle between themes with persistent state  
✅ **Responsive Design** - Fully responsive across all device sizes  

## API Endpoints

- **Login**: POST `https://apis.ccbp.in/login`
- **Home Videos**: GET `https://apis.ccbp.in/videos/all?search=`
- **Trending**: GET `https://apis.ccbp.in/videos/trending`
- **Gaming**: GET `https://apis.ccbp.in/videos/gaming`
- **Video Details**: GET `https://apis.ccbp.in/videos/:id`

## Tech Stack

- React 19.2.0
- React Router DOM 7.9.6
- Tailwind CSS 4.1.17
- Styled Components 6.1.19
- React Icons, React Loader Spinner, React Player
- date-fns, js-cookie

## Component Structure

- **Header** - Navigation and theme toggle
- **Navbar** - Sidebar navigation with route links
- **Home** - Video search and listing page
- **Trending** - Trending videos feed
- **Gaming** - Gaming videos feed
- **SavedVideo** - Saved videos library
- **VideoItemDetails** - Video player and details with interactions
- **Login** - User authentication page

## State Management

- **React Context API** - Global state for theme and saved videos
- **React Hooks** - useState, useContext, useEffect for component logic
- **Cookies** - JWT token storage for authentication
<div style="background-color: #616e7c; width: 150px; padding: 10px; color: white">Hex: #616e7c</div>
<div style="background-color: #3b82f6; width: 150px; padding: 10px; color: white">Hex: #3b82f6</div>
<div style="background-color: #00306e; width: 150px; padding: 10px; color: white">Hex: #00306e</div>
<div style="background-color: #ebebeb; width: 150px; padding: 10px; color: black">Hex: #ebebeb</div>
<div style="background-color: #7e858e; width: 150px; padding: 10px; color: black">Hex: #7e858e</div>
<div style="background-color: #d7dfe9; width: 150px; padding: 10px; color: black">Hex: #d7dfe9</div>
<div style="background-color: #cbd5e1; width: 150px; padding: 10px; color: black">Hex: #cbd5e1</div>
<div style="background-color: #000000; width: 150px; padding: 10px; color: white">Hex: #000000</div>
<div style="background-color: #ff0b37; width: 150px; padding: 10px; color: white">Hex: #ff0b37</div>
<div style="background-color: #ff0000; width: 150px; padding: 10px; color: white">Hex: #ff0000</div>
<div style="background-color: #383838; width: 150px; padding: 10px; color: white">Hex: #383838</div>
<div style="background-color: #606060; width: 150px; padding: 10px; color: white">Hex: #606060</div>
<div style="background-color: #909090; width: 150px; padding: 10px; color: black">Hex: #909090</div>
<div style="background-color: #cccccc; width: 150px; padding: 10px; color: black">Hex: #cccccc</div>
<div style="background-color: #424242; width: 150px; padding: 10px; color: black">Hex: #424242</div>
<div style="background-color: #313131; width: 150px; padding: 10px; color: black">Hex: #313131</div>
<div style="background-color: #f4f4f4; width: 150px; padding: 10px; color: black">Hex: #f4f4f4</div>
<div style="background-color: #424242; width: 150px; padding: 10px; color: black">Hex: #424242</div>

</details>

<details>
<summary>Font-families</summary>

- Roboto

</details>


