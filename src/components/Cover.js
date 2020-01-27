import React from 'react';

export default ({ releaseId, uri }) => (
    <a
        className="Cover-image-wrapper"
        href={`https://www.discogs.com/master/${releaseId}`}
        target="_blank"
        rel="noopener noreferrer"
    >
        <img className="Cover-image" src={uri} alt="album art" />
    </a>
);