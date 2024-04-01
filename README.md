# Billboard Chat / Spotify Web API Playlist Analysis 

This project is a WIP

This application uses the JavaScript/TypeScript SDK for the [Spotify Web API](https://developer.spotify.com/web-api/).

## Requirements

Because this SDK uses `fetch` both in Node and the Browser, and ESM, we require the following:

- Node 18.0.0 or higher
- For best results buidl with node v18.20.0 (npm v10.5.0)
- A modern, version infinite, browser

## Project set up

```bash
npm install @spotify/web-api-ts-sdk
```

```bash
npm install
```

Create a `.env` file in the example directory with your `client_id` and redirect url:

```bash .env
VITE_SPOTIFY_CLIENT_ID=your-spotify-client-id
VITE_REDIRECT_TARGET=http://localhost:3000
```

To run the app:

```bash
npm run dev
```