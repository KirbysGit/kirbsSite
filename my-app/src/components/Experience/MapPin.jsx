import React from 'react';
import styled, {keyframes} from 'styled-components';
import { motion } from 'framer-motion';


const MapPin = ( { item, coords, address, link} ) => {

    const MAPBOX_TOKEN  = import.meta.env.VITE_MAPBOX_TOKEN;

    const [lat, lng] = coords;
    const center = `${lng},${lat}`;
    const pin = `pin-s+ff0000(${lng},${lat})`;
    const size = "600x300"
    const style = "dark-v11";
    const pitch = 60;
    const bearing = -30;
    const zoom = 16;


    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${center},${zoom},${bearing},${pitch}/${size}?access_token=${MAPBOX_TOKEN}`;


    return (
        <MapContainer>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <MapImage src={mapUrl} alt={`Map of ${address}`} />
                <PulseCircle 
                    $pulse={item.theme.primary}
                />
                <PinIcon>
                    📍
                </PinIcon>
            </a>
        </MapContainer>
    );
};

const pulse = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity(0.7);
    }
    100% {
        transform: translate(-50%, -50%) scale(5.0);
        opacity(0);
    }
`

const MapImage = styled.img`
    width: 100%;
    display: block;
    object-fit: cover;
    filter: grayscale(0%) brightness(90%);
    transition: filter 0.3s ease;
`

const PinIcon = styled.span`
    position: absolute;
    bottom: 45%;
    left: 50%;
    transform: translate(-50%, 0%) scale(1);
    transform-origin: bottom center;
    font-size: 4rem;
    transition: transform 0.2s ease;
    z-index: 2;

    &:hover {
        transform: translate(-50%, -20%) scale(1.3);
    }
`

const PulseCircle = styled.div`
    position: absolute;
    top: 50%;
    left: 50.05%;
    width: 40px;
    height: 12px;
    background: rgb(231, 201, 220, 0.15);
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
    z-index: 0;
`

const MapContainer = styled.div`
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    margin-top: 1rem;
    max-width: 600px;

`

export default MapPin;