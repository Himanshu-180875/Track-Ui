import React, { useContext } from 'react';
import { StyleSheet,Platform,StatusBar} from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/authContext';
import { SafeAreaView } from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons';


const AccountScreen = () => {

    const {signout} = useContext(AuthContext)
    return ( 
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <Text  style={{textAlign:'center',margin:15}} h3>Hello</Text>
        <Button style={styles.signoutbutton} title="Sign Out" onPress={signout} />
    </SafeAreaView>
)

}
AccountScreen.navigationOptions = {
    title:'Account',
    tabBarIcon:<FontAwesome name='gear' size={20}/>
}

const styles = StyleSheet.create({
    signoutbutton:{
        margin:10
    }
})
export default AccountScreen;