import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import entete from '../assets/entete.png'
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Entete(){
    return(
        <View style={styles.container}>
            <Image
            source = {entete}
            style={styles.image}
            >
            </Image>
            <TouchableOpacity onPress={() => signOut(auth)} style={styles.touchable}>
                <Ionicons name={"exit-outline"} size={30} color='white'/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: '80%',
        resizeMode: 'contain',
        maxHeight:50,
        
    },
    container:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#254b7f",
        padding:3
    },
    touchable:{
        margin:5,
        
    }
})