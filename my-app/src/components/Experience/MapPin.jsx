import React, { useRef } from 'react';
import styled, {keyframes} from 'styled-components';
import { motion, useInView } from 'framer-motion';


const MapPin = ( { 
    item, 
    coords, 
    address, 
    link,
    // Custom map parameters
    size = "600x300",
    style = "dark-v11",
    pitch = 60,
    bearing = -30,
    zoom = 16,
    // Custom pin parameters
    pinSize = "4rem",
    pinPosition = { bottom: "45%", left: "50%" },
    // Custom pulse parameters
    showPulse = true,
    pulsePosition = { top: "52.5%", left: "52.625%" },
    // Custom visual effects
    mapFilters = "grayscale(0%) brightness(90%)",
    borderRadius = "16px"
} ) => {

    const MAPBOX_TOKEN  = import.meta.env.VITE_MAPBOX_TOKEN;
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        threshold: 0.3,
        triggerOnce: true 
    });

    const [lat, lng] = coords;
    const center = `${lng},${lat}`;
    const pin = `pin-s+ff0000(${lng},${lat})`;


    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${center},${zoom},${bearing},${pitch}/${size}?access_token=${MAPBOX_TOKEN}`;


    return (
        <MapContainer ref={ref} $borderRadius={borderRadius}>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <MapImage 
                    src={mapUrl} 
                    alt={`Map of ${address}`} 
                    $filters={mapFilters}
                />
                {showPulse && (
                    <PulseCircle 
                        $pulse={item.theme.primary}
                        $position={pulsePosition}
                    />
                )}
                <AnimatedPinIcon 
                    $size={pinSize}
                    $position={pinPosition}
                    initial={{ 
                        scale: 0, 
                        y: -100, 
                        opacity: 0 
                    }}
                    animate={isInView ? {
                        scale: [0, 2, 1],
                        y: [0, 0, 0],
                        opacity: [0, 1, 1]
                    } : {
                        scale: 0,
                        y: -100,
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                >
                    📍
                </AnimatedPinIcon>
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
    filter: ${props => props.$filters};
    transition: filter 0.3s ease;
`

const PinIcon = styled.span`
    position: absolute;
    bottom: ${props => props.$position.bottom};
    left: ${props => props.$position.left};
    transform: translate(-50%, 0%) scale(1);
    transform-origin: bottom center;
    font-size: ${props => props.$size};
    transition: transform 0.2s ease;
    z-index: 2;

    &:hover {
        transform: translate(-50%, -20%) scale(1.3);
    }
`

const AnimatedPinIcon = styled(motion.span)`
    position: absolute;
    bottom: ${props => props.$position.bottom};
    left: ${props => props.$position.left};
    transform: translate(-50%, 0%);
    transform-origin: bottom center;
    font-size: ${props => props.$size};
    z-index: 2;
    cursor: pointer;

    &:hover {
        transform: translate(-50%, -20%) scale(1.3);
    }
`

const PulseCircle = styled.div`
    position: absolute;
    top: ${props => props.$position.top};
    left: ${props => props.$position.left};
    width: 36px;
    height: 16px;
    background: rgba(52, 134, 201, 0.4);
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
    z-index: 0;
`

const MapContainer = styled.div`
    position: relative;
    border-radius: ${props => props.$borderRadius};
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    margin-top: 1rem;
    max-width: 600px;
`

export default MapPin;