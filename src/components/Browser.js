import React, { useEffect } from 'react';
import '../App.css';
import { fetchAllAlbumCovers } from '../data/SQLAPI';
import { connect } from 'react-redux';
import Cover from './Cover';

function Browser({ albumCovers }) {
  useEffect(() => fetchAllAlbumCovers(), []);

  const images = albumCovers.map((uri, releaseId) => <Cover key={releaseId} releaseId={releaseId} uri={uri} />).toList();

  return (
    <div className="Browser">
        {images}
    </div>
  );
}

const mapStateToProps = state => ({
  albumCovers: state.get('albumCovers'),
});

export default connect(mapStateToProps)(Browser);
