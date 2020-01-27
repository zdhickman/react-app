import { addAllAlbumCovers, setSearchResults } from '../actions';
import { Map, List } from 'immutable';
import store from '../store';

const HOST = process.env.REACT_APP_HOST;

export const fetchAllAlbumCovers = () => {
    fetch(`${HOST}/covers`)
        .then(resp => resp.json())
        .then(resp => {
            const mappedByRelease = Map(new Map(resp.map(pair => [pair.release_id, decodeURIComponent(pair.uri)])));
            store.dispatch(addAllAlbumCovers(mappedByRelease));
        });
}

export const addAlbumCover = (releaseId, uri) => {
    fetch(`${HOST}/covers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            releaseId,
            uri: encodeURIComponent(uri)
        }),
    });
}

export const search = query => {
    fetch(`${HOST}/search?q=${encodeURIComponent(query)}`)
        .then(resp => resp.json())
        .then(({ results }) => {
            store.dispatch(setSearchResults(List(results)))
        })
}