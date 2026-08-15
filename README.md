<h1 align="center">🎬 Cineflix</h1>
<h3 align="center">A full-stack React Native movie app — browse, search, save, and watch, built end-to-end with real authentication and a production-style architecture.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit">
  <img src="https://img.shields.io/badge/TMDB%20API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB API">
</p>

<h3 align="center">📱 What it does</h3>
<ul>
<li><p>🔐 <strong>Real authentication</strong> — Firebase email/password sign-up, login, and password reset, with persisted sessions</p></li>
<li><p>🎞️ <strong>Movie browsing</strong> — Popular, Upcoming, and Top Rated lists pulled live from the TMDB API</p></li>
<li><p>🔍 <strong>Search</strong> — real-time movie search with empty and error states handled properly</p></li>
<li><p>📄 <strong>Movie details</strong> — full detail screen with cast, overview, genres, and similar titles</p></li>
<li><p>⭐ <strong>My List</strong> — favourites and viewing history, persisted on-device with Redux Persist</p></li>
<li><p>▶️ <strong>Demo video player</strong> — custom playback controls (seek, play/pause, auto-hiding UI) built with react-native-video</p></li>
<li><p>👤 <strong>Profile</strong> — account info, favourites, and recently viewed, in one place</p></li>
</ul>
<h3 align="center">📲 Try it</h3>
<p align="center">
  <a href="YOUR_DRIVE_LINK_HERE" target="_blank">
    <img src="https://img.shields.io/badge/Download%20APK-4CAF50?style=for-the-badge&logo=android&logoColor=white" alt="Download APK">
  </a>
</p>
<p align="center"><i>Debug build — enable "install from unknown sources" on Android to install.</i></p>
<h3 align="center">🛠️ Tech Stack</h3>
<p align="center">
  <img src="https://img.shields.io/badge/React%20Native%200.86-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/React%20Navigation-6B52AE?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase%20Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/TMDB%20REST%20API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white">
</p>

<h3 align="center">📂 Project Structure</h3>

```
src/
  components/     Reusable password field, modals
  constants/      API keys, theme, video config — centralized, not hardcoded
  navigation/     Root stack + bottom tab navigators
  redux/          Store, favourites slice, history slice
  screens/
    Auth/         Login, Signup, shared auth styles
    Home/         Movie browsing (Popular, Upcoming, Top Rated)
    Search/       Live search
    MovieDetail/  Full movie detail + cast + similar titles
    Favorites/    Saved movies
    Popular/      Dedicated popular movies screen
    Profile/      Account, favourites, history
    VideoPlayer/  Custom video player with controls
    Splash/       App launch screen
```

<h3 align="center">⚠️ Known Limitations</h3>
<ul>
<li><p>Video playback uses a shared demo clip rather than real per-movie streams — intentional, since streaming actual movie content raises licensing/copyright issues for a portfolio project</p></li>
<li><p>Favourites and history are stored locally on-device, not synced to the cloud</p></li>
<li><p>The TMDB API token is centralized in <code>constants/api.js</code> for this demo; a production version would proxy TMDB calls through a backend instead of shipping the token in the client</p></li>
</ul>

<h3 align="center">Contact</h3>
<div align="center">
  <a href="https://www.linkedin.com/in/ali-raza-42965a237/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="mailto:razabugtiali@gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>
  <a href="https://alirazaaaportfolio.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio">
  </a>
</div>
