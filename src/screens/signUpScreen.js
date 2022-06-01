import React,{useState,useContext,useEffect} from 'react';
import {View,  StyleSheet,TouchableOpacity,Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {Text, Input, Button} from 'react-native-elements';
import { Context as AuthContext } from '../context/authContext';
import {MapImage} from '../images';

const SignUpScreen = ({navigation}) => {
    const {state, signup,clearErrorMessage,tryLocalSignIn}= useContext(AuthContext);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    
    return( 
    <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
     <Text h3 style={styles.heading}>Sign Up for Tracker</Text>
     <Input 
        label="Email"  
        value={email} 
        onChangeText={email => setEmail(email) } 
        autoCapitalize="none"
        autoCorrect={false}
        />
     <Text style={styles.spacingBetweenElements}></Text>
     <Input  
        secureTextEntry
        label="Password" 
        value={password} 
        onChangeText={newpassword => setPassword(newpassword) } 
        autoCapitalize="none"
        autoCorrect={false}
        />
        {state.errorMessage? <Text style={styles.errorMessage}>{state.errorMessage}</Text>:null}
     <Button style={styles.spacer} title="Sign Up" onPress={()=>signup({email,password})}/>
     <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
         <Text style={styles.link}>Already have an account?</Text>
     </TouchableOpacity>
     <Image source={MapImage} style={styles.imageSet}/>
    </View>
    )
}
SignUpScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

const styles = StyleSheet.create({
    spacer:{
        margin:15
    },
    spacingBetweenElements:{
        marginTop:5
    },
    container:{
        
        flex:1,
        justifyContent:'center',
        marginBottom:200,

    },
    heading:{
        margin:45,
        textAlign:'center'
    },
    errorMessage:{
        fontSize:16,
        color:'red',
        textAlign:'center',
        margin:10
    },
    link:{
        color:'blue',
        margin:15,
        textAlign:'center'
    },
    imageSet:{
        alignSelf:'center',
        marginTop:30,
        marginBottom:-225
    }

})
export default SignUpScreen;