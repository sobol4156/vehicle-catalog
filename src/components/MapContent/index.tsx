import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup,   } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { api } from '../../api';
import { Vehicle } from './MapContent.type';



const MapContent = () => {
    const [coordinates, setCoordinates] = useState<[number, number][]>([]);
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response: Vehicle[] = await api();
                const coords: [number, number][] = response.map(vehicle => [vehicle.latitude, vehicle.longitude]);
                setCoordinates(coords);
            } catch (error) {
                console.error('Ошибка при получении координат:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <MapContainer center={[59.93863, 30.31413]} zoom={10} style={{ height: '400px', width:"400px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinates.map((coords, index) => (
                    <Marker key={index} position={coords}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapContent;
