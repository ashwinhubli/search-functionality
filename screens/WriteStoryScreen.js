import React from 'react';
import { StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert
 }
   from 'react-native';
import {Header} from 'react-native-elements'
import db from '../config';
import * as firebase from 'firebase';

export default class WriteStoryScreen extends React.Component{
   constructor(){
     super();
     this.state={
       Title: '',
       Author: '',
       Story: '',
       submitPressed: ''
        }
   }
  
     
     submitStory=async()=>{
      db.collection("hub").add({
        'Author': this.state.Author,
        'Title': this.state.Title,
        'story': this.state.Story
      })
     Alert.alert('Your Story is Submitted!')
     
     this.setState({
      Title: '',
      Author: '',
      Story: ''
     })
     }
   render(){
        return(
            <KeyboardAvoidingView style={styles.container}>
        <Header
          backgroundColor={'#FFB6C1'}
          centerComponent={{
            text: 'Story Hub',
            style: { color: '#fff', fontSize: 20 },
          }}
        /> 
           <TextInput
             style={styles.inputBox}
             placeholder="Story Title"
              onChangeText={(text)=>{
                this.setState({
                  Title: text
                })    
              }}
           />
            <TextInput
             style={styles.inputBox}
             placeholder="Author"
             onChangeText={(text)=>{
              this.setState({
                Author: text
              })    
            }}
           />  
           < TextInput
           style={styles.inputBox2}
           multiline= {true}
           placeholder="Write Your Story"
           onChangeText={(text)=>{
            this.setState({
              Story: text
            })    
          }}
        />
           <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.submitStory}}
            >
               <Text>Submit</Text>
           </TouchableOpacity>
                           
         </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputBox:{
        marginTop: 50,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 1,
        outline: 'none',
      },
      inputBox2:{
        marginTop: 50,
        width: '80%',
        alignSelf: 'center',
        height: 240,
        textAlign: 'center',
        alignItems: 'center',
        borderWidth: 1,
        outline: 'none',
        multiline: true  
    },
     button:{
        width: '10%',
        height: 50,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: '#FFB6C1',
        borderColor: 'black',
        borderWidth: 1 
    }
})