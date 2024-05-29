import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import sathya from '../images/sathya.jpg'
import image1 from '../images/all.jpg'
import image2 from '../images/4882464.jpg'
import image3 from '../images/Success.jpg'

export default function AboutScreen() {
  return (
    <ScrollView style={{ backgroundColor: 'snow' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Acadamic<Text style={{ color: 'tomato' }}>Folio</Text></Text>
        <Text style={{ textAlign: 'center', color: 'green' }}>Learn with ease</Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={{ textAlign: 'center', margin: 20, fontSize: 25, flexDirection: 'column-reverse' }}>
          <Text style={{ color: 'tomato', fontWeight: 'bold' }}>Discover a dynamic hub for tech enthusiasts!</Text>
        </Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
          <Image source={image1} style={{ width: 250, height: 250, borderRadius: 50 }} />
        </View>
        <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Explore insightful blogs, engaging video tutorials, and hilarious tech memes—all in one convenient app.</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
          <Image source={image2} style={{ width: 250, height: 250, borderRadius: 50 }} />
        </View>
        <Text style={{ color: 'darkslategrey', fontSize: 20, fontWeight: 'bold', textAlign: 'center',margin:20 }}>Embark on a journey of endless discovery with us, navigating the vast sea of information together, empowering you to conquer new horizons and embrace lifelong learning</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
          <Image source={image3} style={{ width: 250, height: 250}} />
        </View>
      </View>
    </ScrollView>


  )
}