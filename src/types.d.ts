interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string
    },
    followers: {
        href: string,
        total: 0
    },
    href: string,
    id: string;
    images: [
        {
            url: string,
            height: number,
            width: number,
        }
    ],
    name: string;
    snapshot_id: string;
    tracks: { items: PlaylistTrackObject[]; };
};


interface PlaylistTrackObject {
    added_at: string;
    added_by: object;
    track: TrackObject;
}

interface TrackObject {
    album: object;
    artists: ArtistObject[];
    available_markets: string[];
    duration_ms: number;
    explicit: boolean;
    href: string;
    id: string;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}
