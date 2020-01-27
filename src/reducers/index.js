import { Map, List } from 'immutable';

const initialState = Map({
    albumCovers: Map(),
    searchQuery: '',
    searchResults: List(),
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ALBUM_COVER':
            const { releaseId, uri } = action.payload;
            return state.setIn(['albumCovers', releaseId], uri);
        case 'ADD_ALL_ALBUM_COVERS':
            return state.merge({
                albumCovers: state.get('albumCovers').merge(action.payload),
            });
        case 'SET_SEARCH_QUERY':
            return state.set('searchQuery', action.payload);
        case 'SET_SEARCH_RESULTS':
            return state.set('searchResults', action.payload);
        default:
            return state;
    }
}