export const addAlbumCover = (releaseId, uri) => ({
    type: 'ADD_ALBUM_COVER',
    payload: {
        releaseId,
        uri,
    },
});

export const addAllAlbumCovers = data => ({
    type: 'ADD_ALL_ALBUM_COVERS',
    payload: data,
});

export const setSearchQuery = query => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
});

export const setSearchResults = results => ({
    type: 'SET_SEARCH_RESULTS',
    payload: results,
});