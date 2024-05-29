import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";



export default function Index({navigation}) {



  return (
    <View style={styles.container}>

      <Text style={styles.text} >
        Acadamic<Text style={{ color: 'tomato' }}>Folio</Text>
      </Text>
      <Text style={styles.subText}>Learn with ease</Text>

      <View style={{ marginVertical: 0, marginHorizontal: 30 }}>

        <Button color='tomato' title="Get Started" onPress={()=>navigation.navigate('Main')} style={styles.button} />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'snow',
    flex: 1
  },
  text: {
    color: "black",
    fontSize: 30,
    alignContent: 'center',
    textAlign: 'center',

    marginTop: 250,
    fontWeight: 'bold',
  },
  subText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 400,
  },


})
