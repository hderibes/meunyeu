import * as React from 'react';
import { Text, View, Button, ToastAndroid, } from 'react-native';
import db from '../firebaseConfig'
import { collection, getDocs} from "firebase/firestore"; 

const Item = ({ title, auteur }) => (

    <View>
          <Text>{title}</Text>
          <Text>{auteur}</Text>
    </View>
  );


export default function EmprunterScreen() {
    const [Data, setData] = React.useState([]);

    React.useEffect(()=>{
        AfficherLivres();
    },[]);

    async function AfficherLivres(){
        try{
            const newData = [];
            const Livres = await getDocs(collection(db, "Livres"))
            Livres.forEach((element) => {
                console.log(`${element.id} et ${element.data().Titre}`);
                newData.push({id: element.id, Titre: element.data().Titre});
            });
            setData(newData);
            //ToastAndroid.show('Request sent !!');
            
        } catch{
            ToastAndroid.show('Erreur lors du chargement des livres', ToastAndroid.SHORT);
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Emprunter un livre!</Text>
            <Button title="Press pour afficher" onPress={AfficherLivres}/>
            {Data.map((livre) => (
                <Text key={livre.id}>{`ID: ${livre.id}, Titre: ${livre.Titre}`}</Text>
            ))}
        </View>
    );
}