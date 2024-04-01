import { useSpotify } from './hooks/useSpotify';
import { Scopes, SpotifyApi, UserProfile, Page } from '.';
//import { Scopes, SearchResults, SpotifyApi, UserProfile, Page } from '../src';
import { useEffect, useState } from 'react'
import './App.css'
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

function App() {
  
  // Instead of using all permissions we can specify scopes by using a string list 
  //const useScopes: string[] = Scopes.playlistRead.concat(Scopes.userDetails, Scopes.playlist, Scopes.userLibraryRead);

  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID, 
    import.meta.env.VITE_REDIRECT_TARGET, 
    Scopes.all
    //useScopes
  );

  return sdk
    ? (<CurrentUserPlaylists sdk={sdk} />) 
    : (<></>);
}

function CurrentUserPlaylists({ sdk }: { sdk: SpotifyApi}) {

  // Using state to handle promises of API results
  const [currentUserProfile, setcurrentUserProfile] = useState<UserProfile | null>(null); // Initialize with null
  const [currentUsersPlaylists, setcurrentUsersPlaylists] = useState<Page<SimplifiedPlaylist> | null>(null); // Initialize with null

  // On rerender we fetch the current user profile and the current users playlists from the API 
  useEffect(() => {
    (async () => {
      const fetchedProfile = await sdk.currentUser.profile();
      const fetchedPlaylists = await sdk.currentUser.playlists.playlists(50,0);
      setcurrentUserProfile(fetchedProfile); // Update state directly with fetched profile
      setcurrentUsersPlaylists(fetchedPlaylists);
    })();
  }, [sdk]);

  // For each playlist, create a playlist item that can be appended to our #playlists div 
  const playlistItems = currentUsersPlaylists?.items.map((playlist: SimplifiedPlaylist) => {

    if (playlist.owner.id === currentUserProfile?.id) {
      return (
        <div className="playlist-item" data-playlist-id={playlist?.id} key={playlist?.id}>
          {playlist?.name}
          <span>({playlist?.tracks?.total})</span>
        </div>
      );
    } else {
      return null; // Return null if owner id does not match
    }
  });

  // Our final component return 
  return (
    <>
      <h2>Select a Playlist to Analyze</h2>
      <div id="playlists">
        {playlistItems}
      </div>
    </>
  )
} 

/*
* Default search call from the example
*/

// function SpotifySearch({ sdk }: { sdk: SpotifyApi}) {
//   const [results, setResults] = useState<SearchResults<["artist"]>>({} as SearchResults<["artist"]>);

//   useEffect(() => {
//     (async () => {
//       const results = await sdk.search("The Beatles", ["artist"]);
//       setResults(() => results);      
//     })();
//   }, [sdk]);

//   // generate a table for the results
//   const tableRows = results.artists?.items.map((artist) => {
//     return (
//       <tr key={artist.id}>
//         <td>{artist.name}</td>
//         <td>{artist.popularity}</td>
//         <td>{artist.followers.total}</td>
//       </tr>
//     );
//   });

//   return (
//     <>
//       <h1>Spotify Search for The Beatles</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Popularity</th>
//             <th>Followers</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableRows}
//         </tbody>
//       </table>
//     </>
//   )
// }

export default App;
