import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { supabase } from '../lib/supabase';
import { Location } from '../types/database';

export default function MapaAcervo() {
    const [locais, setLocais] = useState<Location[]>([]);

    // 1. Buscar dados do Supabase
    const buscarLocais = async () => {
        const { data, error } = await supabase
            .from('locations')
            .select('*');

        if (error) console.log('Erro ao carregar: ', error.message);
        else setLocais(data);
    };

    useEffect(() => {
        buscarLocais();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -25.4284,
                    longitude: -49.2733,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* 2. Mapear os locais salvos no mapa */}
                {locais.map((local) => (
                    <Marker
                        key={local.id}
                        coordinate={{ latitude: local.lat, longitude: local.lng }}
                        pinColor="red"
                    >
                        <Callout>
                            <View style={{ padding: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{local.name}</Text>
                                <Text>{local.city} - {local.neighborhood}</Text>
                                <Text style={{ fontStyle: 'italic' }}>{local.fun_fact}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' }
});
