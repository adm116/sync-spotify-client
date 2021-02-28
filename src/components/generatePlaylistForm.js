import React, { useState } from 'react';
import { SERVER_GENERATE_PLAYLIST_URL } from '../constants';
import styled from 'styled-components';

const GeneratePlaylistContainer = styled.div`
    padding: 10px 20px;
`;

const GenerateButton = styled.button`
    background-color: #fff;
    border-radius: 20px;
    border: none;
    font-size: 15px;
    padding: 5px 5px;
    margin: 0px 20px;
`;

const TracksLabel = styled.label`
    color: #fff;
    font-size: 15px;
    padding: 20px 20px;
`;

const generatePlaylists = async (event, trackIds, playlistName) => {
    event.preventDefault();

    try {
        const body = JSON.stringify({ trackIds, playlistName });
        const response = await fetch(SERVER_GENERATE_PLAYLIST_URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body,
            method: 'post'
        });

        if (!response.ok) {
            throw response.statusText;
        }

        const { success } = await response.json();

        // TODO: better message here
        alert(success);

    } catch (e) {
        alert(e);
    } 
}

const GeneratePlaylistForm = () => {
    const [trackIds, setTrackIds] = useState('');

    const handleTrackIdsChange = event => {
        setTrackIds(event.target.value)
    };

    const [playlistName, setPlaylistName] = useState('');

    const handlePlaylistName = event => {
        setPlaylistName(event.target.value)
    };

    return (
        <GeneratePlaylistContainer>
            <form onSubmit={(event) => generatePlaylists(event, trackIds, playlistName)}>
                <div>
                    <TracksLabel>Playlist Name</TracksLabel>
                    <input
                        type="playlistName"
                        name="playlistName"
                        placeholder="my playlist"
                        onChange={handlePlaylistName}
                        value={playlistName}
                    />
                    <TracksLabel>Track IDs</TracksLabel>
                    <input
                        type="trackIds"
                        name="trackIds"
                        placeholder="comma separated track ids"
                        onChange={handleTrackIdsChange}
                        value={trackIds}
                    />
                    <GenerateButton type="Submit">Generate</GenerateButton>
                </div>
            </form>
        </GeneratePlaylistContainer>
    );
}

export default GeneratePlaylistForm;