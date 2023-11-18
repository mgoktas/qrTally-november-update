import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


export const Cell = ({title, icon, backColor, place, importance, onPress, txt}) => {
    return (
        <TouchableOpacity style={[styles.cell]} onPress={onPress} >
        <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
        <Icon name={icon} size={18} color={'white'}/>
        </View>
        <Text style={[styles.title]}>{title}</Text> 
        <Text style={[styles.subTitle]}>{place}</Text> 
        <Text style={[styles.subTitlee]}>{importance}</Text> 
        <Icon style={styles.iconArrow} name={'arrow-forward-sharp'} size={22}/>
        </TouchableOpacity>
    )
  }
  
export const Seperator = ({space}) => {
    return (
        <View style={{borderWidth: .4, borderColor: '#c2c2c2', marginLeft: space}}></View>
    )
}
  
const styles = StyleSheet.create({
    cell: {
        paddingVertical: Platform.OS === 'ios' ? 12 : 12,
        bottom: Platform.OS === 'ios' ? 0 : 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginVertical: 6,
        justifyContent: "space-between"
    },
    rowIcon: {
        borderWidth: 0, 
        padding:3, 
        borderRadius: 6, 
        marginLeft: 20
    },
    title: {
        fontSize: 20,
        marginStart: 18,
        fontWeight: 400,
        flex: 1,
        color: 'black'
    }, 
    subTitle: {
        fontSize: 15,
        marginStart: 16,
        fontWeight: 400,
        flex: 1,
        color: '#111010'
    }, 
    subTitlee: {
        fontSize: 10,
        marginStart: 16,
        fontWeight: 700,
        flex: 1,
        color: '#111010'
    }, 
    iconArrow: {
        marginRight: 20,
        color: 'black'
    },


})