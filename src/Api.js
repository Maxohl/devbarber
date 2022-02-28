
import AsyncStorage from '@react-native-community/async-storage'

const BASE_API = 'https://api.b7web.com.br/devbarber/api' ; //Requisitions being sent here

export default {
    checkToken: async (token) => {
        //send a POST requisition to the api
        const req = await fetch(`${BASE_API}/auth/refresh`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',  //to accept json application
                'Content-Type': 'application/json' //to send content in json format
            },
            body: JSON.stringify({token})  //send email and password as json
        })
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        //send a POST requisition to the api
        const req = await fetch(`${BASE_API}/auth/login`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',  //to accept json application
                'Content-Type': 'application/json' //to send content in json format
            },
            body: JSON.stringify({email,password})  //send email and password as json
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name,email,password) => {
        //send a POST requisition to the api
        const req = await fetch(`${BASE_API}/user`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',  //to accept json application
                'Content-Type': 'application/json' //to send content in json format
            },
            body: JSON.stringify({name, email, password})  //send email and password as json
        });
        const json = await req.json();
        return json;
    },
    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',  
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({token})  
        });
        const json = await req.json();
        return json;
    },
    getBarbers: async (lat=null, lng=null, address=null) => {      //Get all barbers from the area (if provided)
        const token = await AsyncStorage.getItem('token');

        // console.log("LAT", lat);
        // console.log("LNG", lng);
        // console.log("ADDRESS", address);

        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    },
    getBarber: async (id) => {                                      //Get details from a single barber
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        return json;
    },
    setFavorite: async (barberId) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorite`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',  
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({token,barber:barberId})  
        });
        const json = await req.json();
        return json;
    },
    setAppointment: async (
        userId,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour) => {
            const token = await AsyncStorage.getItem('token');
            const req = await fetch(`${BASE_API}/user/appointment`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',  
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    token,
                    id: userId,
                    service,
                    year: selectedYear,
                    month: selectedMonth,
                    day: selectedDay,
                    hour: selectedHour })  
            });
            const json = await req.json();
            return json;
    }
};