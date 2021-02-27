import React, { useState } from 'react';
import { SERVER_GENERATE_PLAYLIST_URL } from '../constants';
import styled from 'styled-components';

const GeneratePlaylistContainer = styled.div`
    padding: 10px 20px;
`;

const GenerateButton = styled.button`
    background-color: #fff;
    border-radius: 30px;
    border: none;
    font-size: 20px;
    padding: 20px 30px;
`;

const generatePlaylists = async (event, trackIds) => {
    event.preventDefault();

    try {
        const body = JSON.stringify({ trackIds });
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

    return (
        <GeneratePlaylistContainer>
            <form onSubmit={(event) => generatePlaylists(event, trackIds)}>
                <div>
                    <label>Track IDs (comma separated)</label>
                    <input
                        type="trackIds"
                        name="trackIds"
                        placeholder="comma separated list of track ids"
                        onChange={handleTrackIdsChange}
                        value={trackIds}
                    />
                </div>
                <GenerateButton type="Submit">Generate</GenerateButton>
            </form>
        </GeneratePlaylistContainer>
    );
}

export default GeneratePlaylistForm;