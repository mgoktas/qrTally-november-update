import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageTitle, PageLabel } from '../components/Texts';
import { Cell, Seperator } from '../components/Cell';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { leftSwipe, renderLeftActions } from '../components/Swipes';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

export const Child = () => {
  return (
    <Text>dsds</Text>
  )
}

export const Home = () => {

  const [items, setItems] = useState([])

 
  useFocusEffect(
    React.useCallback(() => {
      getData()
    }, [])
  );

  
  const getData = async () => {
    setItems([])
    try {
      for(let i=0; i<20; i++){
        const value = await AsyncStorage.getItem(String(i))
        if(value !== null ){
          const item = JSON.parse(value)
          console.log(item)
          setItems(arr => [...arr, {name: item.name, place: item.place, importance: item.importance}])
        }
        // if(value == null) {
        //   break
        // }
      }
    } catch(e) {
      alert(e)
    }
  }
  
   const deleteItem = async (indeX) => {
    try {
    setItems(items.filter((item,index) => index !== indeX))
    await AsyncStorage.removeItem(String(indeX))
    } catch(e) {
      alert(e)
    }

  }


  const ref = useRef(null);
  const row: Array<any> = [];
  let prevOpenedRow;


  const deleteAll = async () => {
    setItems([])
    await AsyncStorage.clear()  
  }

  const closeRow = async indeX => {

    try {
      setItems(items.filter((item,index) => index !== indeX))


      items.length == 1 ? await AsyncStorage.clear() : await AsyncStorage.removeItem(String(indeX))

      } catch(e) {
        alert(e)
      }

    if (prevOpenedRow && prevOpenedRow !== row[indeX]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[indeX];
  };

  const closeRow2 = (indeX) => {
    if (prevOpenedRow && prevOpenedRow !== row[indeX]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[indeX];    



  }

    return (
      <GestureHandlerRootView>
      <SafeAreaView style={styles.pageView}>
        <PageLabel onPress={deleteAll} label={'Items'} bc={'gray'} type={2} txt={'delete all'}/>
        <ScrollView>
        {
          items.map((item, index) =>
          (
            <React.Fragment key={index}>
              <Swipeable
                ref={ref => (row[index] = ref)}
                onSwipeableOpen={() => { closeRow2(index); closeRow(index)}}
                renderLeftActions={(progress, dragX) =>
                  renderLeftActions(progress, dragX)
                }                >
              <Cell onPress={() => {closeRow2(index)}} title={item.name} place={item.place} importance={item.importance} icon={'infinite'} backColor={'black'}/>
              </Swipeable>       
            </React.Fragment>
          ))
        }
        </ScrollView>
      </SafeAreaView>
      </GestureHandlerRootView>
    ); 
}


const styles = StyleSheet.create({
  pageView: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT,
  }
})

export default Home
