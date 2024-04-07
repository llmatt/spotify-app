const clientId = "b39f52315e534b6fa9f022f05e72e0ec";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const playlistId = '0zS1HHXfrBy8AMjg6Aq6QD';

// class Plist implements Playlist {
//     collaborative: boolean;

//     constructor(collaborative: boolean, id: string, snapshot_id: string, tracks[]: PlaylistTrackObject;) {
//     this.collaborative = collaborative;
//     this.id: string;
//     this.name: string;
//     this.snapshot_id: string;
//     this.tracks: { items: PlaylistTrackObject[]; }
//     }
// };



if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const playlist = await fetchPlaylist(accessToken, playlistId);

    // populateUI(profile);

 //   displayPlaylist(playlist);
    populateUI(profile, playlist);
}

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email playlist-read-private");

    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token: string): Promise<UserProfile> {
     const result = await fetch("https://api.spotify.com/v1/me", {
         method: "GET", headers: { Authorization: `Bearer ${token}` }
     });

     return await result.json();
}
async function fetchPlaylist(token: string, playlist_id: string): Promise<Playlist> {
    const result = await fetch(`https://api.spotify.com/v1/me/playlists/${playlist_id}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    });

    return await result.json();
}

function populateUI(profile: UserProfile, playlist: Playlist) {
    document.getElementById("playlist_name")!.innerText = playlist.name;    
    document.getElementById("user_name")!.innerText = profile.display_name;
    document.getElementById("num_tracks")!.innerText = String(playlist.tracks.items.length);
        
//     if (profile.images[0]) {
//         const profileImage = new Image(200, 200);
//         profileImage.src = profile.images[0].url;
//         document.getElementById("avatar")!.appendChild(profileImage);
//     }
//     document.getElementById("id")!.innerText = profile.id;
//     document.getElementById("email")!.innerText = profile.email;
//     document.getElementById("uri")!.innerText = profile.uri;
//     document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
//     document.getElementById("url")!.innerText = profile.href;
//     document.getElementById("url")!.setAttribute("href", profile.href);
//     document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? '(no profile image)';
} 