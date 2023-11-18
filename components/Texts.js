import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')


export const PageTitle = ({
    title,
}) => (
    <View style={styles.titleBox} >
        <Text style={styles.pageTitle}>{title}</Text>
    </View>
);

export const PageLabel = ({label, bc, txt, type, onPress}) => {

    return (

    type == 2 ? 
        <View style={{justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 600, fontSize: 18, alignSelf: 'center', margin: 10, color: 'black'}}>
                {label}
            </Text>
            <View style={{borderWidth: .4, borderColor: '#c2c2c2', borderColor: bc}}></View>
            <TouchableOpacity onPress={onPress} activeOpacity={.7} style={{position:'absolute', right: 40, top:13,}}>
                <Text style={{ color: '#EB1A1A'}} >
                    {txt}
                </Text>
            </TouchableOpacity>
        </View>    
    :

        <View style={{justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 600, fontSize: 18, alignSelf: 'center', margin: 10, color: 'black'}}>
                {label}
            </Text>
            <View style={{borderWidth: .4, borderColor: '#c2c2c2', borderColor: bc}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageTitle : {
        fontSize: 36,
        color: 'black',
        fontWeight: 500
    },
    titleBox: {
        marginHorizontal: 20,
        marginTop: 0
    }
})
