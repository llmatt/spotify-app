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
        total: number,
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
    name: string,
    owner: {
        external_urls: {
            spotify: string,
        },
        followers: {
            href: string,
            total: number,
        },
        href: string,
        id: string,
        type: string,
        uri: string,
        display_name: string,
    }
    public: boolean,
    snapshot_id: string;
    tracks: { 
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: [
            {
                added_at: string,
                added_by: {
                    external_urls: {
                        spotify: string,
                    }
                    followers: {
                        href: string,
                        total: number,
                    }
                    href: string,
                    id: string,
                    type: UserProfile,
                    uri: string,
                }
                is_local: boolean,
                track: {
                    album: {
                        album_type: string,
                        total_tracks: number,
                        available_markets: [string],
                        external_urls: {
                            spotify: string,
                        }
                        href: string,
                        id: string,
                        images: [
                            {
                                url: string,
                                height: number,
                                width: number,
                            }
                        ],
                        name: string,
                        release_date: Date,
                        release_date_precision: year,
                        restrictions: {
                            reason: string,
                        },
                        type: album,
                        uri: string,
                        artists: [
                            {
                                external_urls: {
                                    spotify: string,
                                }
                                href: string,
                                id: string,
                                name: string,
                                type: string,
                                uri: string,
                            }
                        ]
                    }
                    artists: [
                        {
                            external_urls: {
                                spotify: string,
                            },
                            followers: {
                                href: string,
                                total: number,
                            },
                            genres: [string],
                            href: string,
                            id: string,
                            images: [
                                {
                                    url: string,
                                    height: number,
                                    width: number,
                                }
                            ],
                            name: string,
                            popularity: number,
                            type: string,
                            uri: string,
                        }
                    ],
                    available_markets: [string],
                    disc_number: number,
                    duration_ms: number,
                    explicit: boolean,
                    external_ids: {
                        isrc: string,
                        ean: string,
                        upc: string,
                    },
                    external_urls: {
                        spotify: string,
                    },
                    href: string,
                    id: string,
                    is_playable: boolean,
                    linked_from: {
                    },
                    restrictions: {
                        reason: string,
                    },
                    name: string,
                    popularity: number,
                    preview_url: string,
                    track_number: number,
                    type: string,
                    uri: string,
                    is_local: boolean,
                    }
                }
            ]
    },
    type: string,
    uri: string,
}


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
