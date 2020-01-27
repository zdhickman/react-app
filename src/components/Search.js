import React, { useCallback, useEffect } from 'react';
import '../App.css';
import { search, addAlbumCover } from '../data/SQLAPI';
import { connect } from 'react-redux';
import { setSearchQuery as setSearchQueryAction } from '../actions';
import { debounce } from 'lodash';

const runSearch = searchQuery => {
    if (searchQuery.length > 2) {
        search(searchQuery);
    }
}

const debouncedSearch = debounce(runSearch, 1000);

function Search({ albumCovers, searchResults, searchQuery, setSearchQuery }) {
  const images = searchResults.map(result => {
    const { id, cover_image, uri } = result;

    if (cover_image.length === 0 || cover_image.indexOf('spacer.gif') !== -1 || uri.indexOf('master') === -1) {
        return null;
    }

    const releaseIds = albumCovers.map((uri, releaseId) => releaseId).toSet();

    return (
      <div className="Cover" key={id}>
        <img className="Cover-image" src={cover_image} alt="album art" />
        <div className="Cover-hover">
            <a href={`https://www.discogs.com${uri}`} target="_blank" rel="noopener noreferrer">View</a>
            {releaseIds.contains(id) ? <span className="Added">Add</span> : <a onClick={() => addAlbumCover(id, cover_image)}>Add</a>}
        </div>
      </div>
    )
  }).toJS();

  useEffect(() => {
      debouncedSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = ({ target: { value } }) => {
      setSearchQuery(value);
      debouncedSearch();
  }

  return (
    <div>
        <div className="Search-wrapper">
            <input type="text" value={searchQuery} onChange={handleSearch} />
        </div>
        {images}
    </div>
  );
}

const mapStateToProps = state => ({
  searchResults: state.get('searchResults'),
  searchQuery: state.get('searchQuery'),
  albumCovers: state.get('albumCovers'),
});

export default connect(mapStateToProps, { setSearchQuery: setSearchQueryAction })(Search);
