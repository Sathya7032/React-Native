import { View, Text, ScrollView, StyleSheet, Button, Image } from 'react-native'
import React from 'react'
import tutorials from '../images/tutorial.jpg'
import blog from '../images/blog.jpg'
import code from '../images/code.jpg'
import FloatingButton from './user/FloatingButton'

export default function HomeScreen({navigation}) {

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Acadamic<Text style={{ color: 'tomato' }}>Folio</Text></Text>
        <Text style={styles.subtext}>
          Explore a wide range of programs, Tutorials, Blogs and memes
        </Text>
        <View style={{ padding: 2, paddingTop: 10, alignItems: 'center' }}>
          <Button
            onPress={() => navigation.navigate('Blog')}
            title="Register"
            color="tomato"
          />
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginTop: 15 }}>Tutorials</Text>
        <Image source={tutorials} style={styles.image} />
        <View style={{ margin: 10, marginBottom: 20 }}>
          <Button title='Explore our Tutorials' color='darkslategrey' onPress={()=>navigation.navigate('Tutorials')}/>
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginTop: 15 }}>Blogs</Text>
        <Image source={blog} style={styles.image} />
        <View style={{ margin: 10, marginBottom: 20 }}>
          <Button title='Explore our Blogs' color='darkslategrey' onPress={()=>navigation.navigate('Blogs')}/>
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginTop: 15 }}>Code Snippets</Text>
        <Image source={code} style={styles.image} />
        <View style={{ margin: 10, marginBottom: 20 }}>
          <Button title='Explore our Codes' color='darkslategrey' onPress={()=>navigation.navigate('CodeSnippets')}/>
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#233142',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
  },
  container1: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'snow',
    borderRadius: 20
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',

  },
  subtext: {
    fontSize: 13,
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
    margin: 10
  },
  image: {
    width: 240,
    height: 240,
    margin: 20
  },
})