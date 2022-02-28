import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation'; 

import Api from '../../Api';


import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea,

} from './styles';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';


export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder =  () => {   //Function to get current location of user, originally async but it crashes on android 8
        setCoords(null);
        let result =  request(             //Get user permission
            Platform.OS === 'android' ?
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                :
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        );
        // if(result == 'granted'){  if commented because of problems with permissions on Android 8
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
                getBarbers();
            });

        // }

    }

    const getBarbers = async () => {  //get list of barbers to show on the screen
        setLoading(true);
        setList([]);

        let lat = null; 
        let lng = null;
        if(coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }
        console.log(coords);

        let res = await Api.getBarbers(lat,lng, locationText);
        if(res.error == '') {
            if(res.loc) {
                setLocationText(res.loc);
            }
            setList(res.data);

        } else {
            alert("Error: "+res.error);
        }

        setLoading(false);
    }

    useEffect(()=> {
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }


    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } >

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}> Encontre o seu barbeiro favorito </HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está ?"
                        placeholderTextColor="#FFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFF" />
                    </LocationFinder>
                </LocationArea>
    
                {loading &&
                    <LoadingIcon size="large" color="#FFF" /> 
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}