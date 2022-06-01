// import '../_mock Location';
import React, {useState,useEffect,useContext, useCallback} from 'react';
import { StyleSheet,Platform,StatusBar} from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import * as Location from 'expo-location';
import Map from '../components/Map';
import {Context as LocationContext} from '../context/locationContext';
import TrackForm from '../components/TrackForm';
import {FontAwesome} from '@expo/vector-icons';

const TrackCreateScreen = ({isFocused}) => {
    const {addLocation,state} = useContext(LocationContext)
    
    const [err,setErr] = useState(null)
    const callback = useCallback(location=> {
      addLocation(location,state.recording)
    },[state.recording] )
    

    useEffect(()=>{
      let subscriber;
      const startWatching = async () => {
        try {
          const { status  } = await Location.requestForegroundPermissionsAsync();
          subscriber = await Location.watchPositionAsync({
              accuracy: Location.Accuracy.BestForNavigation,
              timeInterval:1000,
              distanceInterval:10
          },callback           
          )
          if (status !== 'granted') {
            throw new Error('Location permission not granted');
          }
         
        } catch (e) {
          setErr(e);
        }
      };
        if(isFocused || state.recording){
            startWatching()
        }
        else{
          if(subscriber){
            subscriber.remove();
          }
            
            subscriber=null
        }
        return () => {
          if(subscriber){
            subscriber.remove()
          }
        }
        
    },[isFocused,callback])
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <Text h3 style={{textAlign:'center', margin:45}}>Create a Track</Text>
            <Map />
            {err? <Text>Please enable location services.</Text>: null}
            <TrackForm />
        </SafeAreaView>
    )
}

TrackCreateScreen.navigationOptions = {
  title:'Add Track',
  tabBarIcon:<FontAwesome name='plus' size={20} />
}

const styles = StyleSheet.create({})
export default withNavigationFocus(TrackCreateScreen);