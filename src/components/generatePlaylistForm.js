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

const generatePlaylists = async (event, playlistId) => {
    event.preventDefault();

    try {
        const body = JSON.stringify({ playlistId });
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
    const [playlistId, setPlaylistId] = useState('');

    const handlePlaylistIdChange = event => {
        setPlaylistId(event.target.value)
    };

    return (
        <GeneratePlaylistContainer>
            <form onSubmit={(event) => generatePlaylists(event, playlistId)}>
                <div>
                    <TracksLabel>Playlist Id</TracksLabel>
                    <input
                        type="playlistId"
                        name="playlistId"
                        placeholder="playlist id"
                        onChange={handlePlaylistIdChange}
                        value={playlistId}
                    />
                    <GenerateButton type="Submit">Generate</GenerateButton>
                </div>
            </form>
        </GeneratePlaylistContainer>
    );
}

export default GeneratePlaylistForm;