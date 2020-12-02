import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput} from 'react-native';
import {Header} from 'react-native-elements'
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default class ReadStoryScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        search: '' ,
        allStories: [],
        lastVisibleStory: null 
      }
    }
    updateSearch=(search)=>{
     this.setState({
        search
     })
    }
    retrieveStories = async ()=>{
      var text = this.state.search.toUpperCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toUpperCase() ==='B'){
      const query = await db.collection("hub").where('Title','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVisibleStory: doc
        })
      })
    }
      else if(enteredText[0].toUpperCase() === 'S'){
        const query = await db.collection("hub").where('Title','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [...this.state.allStories, doc.data()],
            lastVisibleStory: doc
          })
        })
      }
  }

    searchFilterFunction= async(text) =>{
      var enteredText = text.split("")  
      if (enteredText[0].toUpperCase() ==='B'){
        const story =  await db.collection("hub").where('Title','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleStory: doc
          })
        })
      }
      else if(enteredText[0].toUpperCase() === 'S'){
        const story = await db.collection("hub").where('Author','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleStory: doc
          })
        })
      }
    }
    componentDidMount=async()=>{
       const stories = await db.collection("hub").limit(10).get(); 
       stories.docs.map((doc)=>{
           this.setState({
            allStories: [...this.state.allStories,doc.data()],  
            lastVisibleStory: doc
          })
       })
    }
    render(){
        const {search} = this.state;
        return(
            <View>
           <ScrollView>
            <Header
              backgroundColor={'#FFB6C1'}
              centerComponent={{
               text: 'Bed Time Stories',
               style: { color: '#fff', fontSize: 20 },
               }}
             />
             <View>
          
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Type Here......."
         onChangeText={this.updateSearch}
         value={search}
               />
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchFilterFunction(this.updateSearch)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
             <ScrollView>
            {this.state.allStories.map((story)=>{
            return(
              <View style={{borderBottomWidth: 2}}>
                <Text>{"Author: "+story.Author}</Text>
                <Text>{"Title: "+story.Title}</Text>
              </View>
            )
          })}
            </ScrollView>
            
            </View>
            </ScrollView>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  searchBar:{
    flexDirection:'row',
    height:40,
    width:'auto',
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:'grey',

  },
  bar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10,
  },
  searchButton:{
    borderWidth:1,
    height:30,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green'
  }
})

