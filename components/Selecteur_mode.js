import { ScrollView, View,Text, Touchable, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Item = ({title, goto, navigation, actual}) => (
    <TouchableOpacity onPress={() =>{
        navigation.navigate(goto)
    }}
    style={ goto == actual ? styles.button_actif :styles.button  }>
        <Text style={goto == actual ? styles.button_text_actif: styles.button_text}>{title}</Text>
    </TouchableOpacity>
)

export function Selecteur_mode({navigation, actual}){
    return(
        <ScrollView style={styles.scroll} horizontal>
            <Item title={"Livres"} goto={'Main_Livres'} navigation={navigation} actual={actual}/>
            <Item title={"Etagères"}  goto={'Etageres'} navigation={navigation} actual={actual}/>
            <Item title={"Tags"}  goto={'Tags'} navigation={navigation} actual={actual}/>
            <Item title={"Catégories"} goto={'Categories'} navigation={navigation} actual={actual}/>
            <Item title={"Emplacements"} goto={'Emplacements'} navigation={navigation} actual={actual}/>
            <Item title={"Dates"} goto={'Dates'} navigation={navigation} actual={actual}/>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
    scroll:{
        minHeight:40,
        padding:5,
    },
    button:{
        backgroundColor:'white',
        borderRadius:10,
        borderColor:'grey',
        borderWidth:1,
        paddingVertical:2,
        paddingHorizontal:6,
        marginHorizontal:4,
    },
    button_actif:{
        backgroundColor:'#254b7f',
        borderRadius:10,
        borderColor:'white',
        borderWidth:1,
        paddingVertical:2,
        paddingHorizontal:6,
        marginHorizontal:4,
    },
    button_text:{
        color:"#254b7f",
        fontWeight:'bold',
        fontSize:16,
    },
    button_text_actif:{
        color:"white",
        fontWeight:'bold',
        fontSize:16,
    },
})