import React, {useState, useCallback, useEffect, useRef, useImperativeHandle, createContext, Component} from 'react';
import { Text, View, Dimensions, StyleSheet, TextInput, Image, Share, TouchableOpacity, PermissionsAndroid, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageLabel } from '../components/Texts';
import {MyButton, MyButton2} from '../components/Button'
import {GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import  { launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import RNQRGenerator from 'rn-qr-generator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { horizontalScale, verticalScale, moderateScale, verticalScaleAnti } from '../components/Metrics';
import { Child } from '../App';
import { useFocusEffect } from '@react-navigation/native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')


export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void
  getSheetHeight: ()=> void
  itemAdded: ()=> void
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(({}, ref) => {

  const [isclicked, setIsClicked] = useState(false)
  const [isclicked2, setIsClicked2] = useState(false)
  const [isclicked3, setIsClicked3] = useState(false)
  const [isclicked4, setIsClicked4] = useState(false)
  const [isclicked5, setIsClicked5] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemPlace, setItemPlace] = useState('')
  const [itemImportance, setItemImportance] = useState(0)
  const [qrValuee, setQrValuee] = useState({})
  const [uri, setUri] = useState('');

  
  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2
  
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(-destination*1.65, { damping: 2000 })
  }, [])
  
  useImperativeHandle(ref, () => ({ scrollTo, getSheetHeight, itemAdded }), [scrollTo, getSheetHeight, itemAdded])

  const itemAdded = useCallback(() => {
    setIsAdded(true)
    setIsClicked(true)
    setIsClicked2(true)
    setIsClicked3(true)
    setIsClicked4(true)
    setIsClicked5(true)
    setIsFinished(true)
    scrollTo(500)
  }, [])
  
  const getSheetHeight = () => {
    return translateY.value
  }
  
  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
    translateY.value = event.translationY + context.value.y
    translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
    // getSheetHeight()
  })
  .onEnd(() => {
    if(translateY.value > -SCREEN_HEIGHT ) {
      scrollTo(0)
    } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
      scrollTo(MAX_TRANSLATE_Y)
    }
  })
  
  useFocusEffect(
    React.useCallback(() => {
      scrollTo(0)
    }, [])
  );
  
  
  // setInterval(getSheetHeight, 5000)
  
    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [-MAX_TRANSLATE_Y + 100, -MAX_TRANSLATE_Y],
        [40, 15],
        Extrapolate.CLAMP
        )
        
        return {
          borderRadius,
          transform: [{translateY: translateY.value}]
        }
      })   
      
      
   
      const checkAction = () => {
        if(getSheetHeight() > -200){
          setIsClicked(false)
          setIsClicked2(false)
          setIsClicked3(false)
          setIsClicked4(false)
          setIsClicked5(false)
          setIsFinished(false)
        }
      }
  
      setInterval(checkAction, 5000)
      
      let myQRCode = useRef();
      let vS = useRef();
  
  
      const BottomHeader = ({txt, height, txt2, txt3}) => {
        
        // if(isclicked3) {
        //   return (
        //       <View style={{marginTop: SCREEN_HEIGHT / 20, height: height}}>
        //         <Text style={{fontSize: 30, fontWeight: 600, alignSelf: 'center'}}>
        //           {txt3}
        //         </Text>
        //       </View>
        //     )
        // }
  
        if(isclicked4) {
          return (
            <View>
  
            </View>
          )
        }
  
        if(isclicked2) {
          return (
              <View style={{marginTop: SCREEN_HEIGHT / 20, height: height}}>
                <Text style={{fontSize: verticalScale(32), fontWeight: 600, alignSelf: 'center'}}>
                  {txt2}
                </Text>
              </View>
            )
        }
  
  
        return (
          <View style={{marginTop: SCREEN_HEIGHT / 20, height: height}}>
            <Text style={{fontSize: verticalScale(32), fontWeight: 600, alignSelf: 'center'}}>
              {txt}
            </Text>
          </View>
        )
      }
  
      const done = () => {
          setIsClicked(false)
          setIsClicked2(false)
          setIsClicked3(false)
          setIsClicked4(false)
          setIsClicked5(false)
          setIsFinished(false)
          setIsAdded(false)
          scrollTo(0)
            }
      
      const BottomButton = ({txt, height, onPress, txt7, txt6, txt5, txt4, txt0}) => {
  
        if(isFinished){
          return (
            <TouchableOpacity onPress={() => {done()}} style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 12, height: 48, justifyContent: 'center', alignSelf: 'center', height: 50, marginTop: 0, marginBottom: 20}}>
            <Text style={{fontWeight: 500, color: '#090707', alignSelf: 'center', fontSize: 15}}>
              {txt7}
            </Text>
          </TouchableOpacity>
          )
        }
  
        if(isclicked5){
          return (
            <TouchableOpacity onPress={onPress} style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 12, height: 48, justifyContent: 'center', alignSelf: 'center', height: 50, marginTop: 0, marginBottom: 20}}>
            <Text style={{fontWeight: 500, color: '#090707', alignSelf: 'center', fontSize: 15}}>
              {txt6}
            </Text>
          </TouchableOpacity>
          )
        }
  
        if(isclicked4){
          return (
            <TouchableOpacity onPress={onPress} style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 12, height: 48, justifyContent: 'center', alignSelf: 'center', height: 50, marginTop: 0, marginBottom: 20}}>
            <Text style={{fontWeight: 500, color: '#090707', alignSelf: 'center', fontSize: 15}}>
              {txt5}
            </Text>
          </TouchableOpacity>
          )
        }
  
        if(isclicked3){
          return (
            <TouchableOpacity onPress={onPress} style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 12, height: 48, justifyContent: 'center', alignSelf: 'center', height: 50, marginTop: 0, marginBottom: 20}}>
            <Text style={{fontWeight: 500, color: '#090707', alignSelf: 'center', fontSize: 15}}>
              {txt4}
            </Text>
          </TouchableOpacity>
          )
        }
  
        if(isclicked){
          return (
            <TouchableOpacity onPress={onPress} style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 12, justifyContent: 'center', alignSelf: 'center', height: 50, marginTop: 10, marginBottom: 0}}>
              <Text style={{fontWeight: 500, color: '#090707', alignSelf: 'center', fontSize: 15}}>
                {txt}
              </Text>
            </TouchableOpacity>
          )
        }
  
        return (
          <TouchableOpacity onPress={onPress} style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 12, justifyContent: 'center', alignSelf: 'center', height: 50, marginTop: 0, marginBottom: 20}}>
            <Text style={{fontWeight: 500, color: '#090707', alignSelf: 'center', fontSize: 15}}>
              {txt0}
            </Text>
          </TouchableOpacity>
        )
      }
      
      const FindImage = () => {
  
        if(isclicked4) {
          return (
            <View></View>
          )
        }
        
        return (
          <View style={{alignSelf: 'center'}}>
            <Image  source={require('../components/img/4.png')} style={{
              width: verticalScale(240),
              height: horizontalScale(120)
            }} />
          </View>
        )
      }
      
            const initialValue = '';
            const reference = useRef(initialValue);
            const reference2 = useRef(initialValue);
  
      const TagInput = ({txt, height, width, onChangeText}) => {
  
        
        const handleTextt = (txt) => {
          setItemImportance(txt)
        }
        
        if(isFinished && !isAdded) {
          
          const ref1 = useRef();
          const qrValuee = {name: reference.current, place: reference2.current, importance: itemImportance}
          const stringQr = JSON.stringify(qrValuee)
          let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    
          async function hasAndroidPermission() {
            const getCheckPermissionPromise = () => {
              if (Platform.Version >= 33) {
                return Promise.all([
                  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
                  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
                ]).then(
                  ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
                    hasReadMediaImagesPermission && hasReadMediaVideoPermission,
                );
              } else {
                return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
              }
            };
          
            const hasPermission = await getCheckPermissionPromise();
            if (hasPermission) {
              return true;
            }
            const getRequestPermissionPromise = () => {
              if (Platform.Version >= 33) {
                return PermissionsAndroid.requestMultiple([
                  PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                  PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                ]).then(
                  (statuses) =>
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                      PermissionsAndroid.RESULTS.GRANTED &&
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                      PermissionsAndroid.RESULTS.GRANTED,
                );
              } else {
                return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
              }
            };
          
            return await getRequestPermissionPromise();
          }
          
  
          const storeData = async () => {
            try {
              for(let i=0; i<20; i++){
                const value = await AsyncStorage.getItem(String(i))
                // alert(value)
                if(value == null) {
                  // alert(i)
                  console.log(String(i))
                  await AsyncStorage.setItem(String(i), stringQr)
                  break
              }
              }
            } catch(e) {
              // error reading value
            }
          }
          
          storeData()

          async function savePicture(tag) {
            if (Platform.OS === "android" && !(await hasAndroidPermission())) {
              return;
            }

            
          
            CameraRoll.save(tag, { type:'photo', album:''})
          };
          
          useEffect(() => {
            ref1.current.capture().then(uri => {
              console.log(uri)

              
              // Share.share({url: uri, title: itemName})
              // const image = CameraRoll.save(uri, 'photo');

              savePicture(uri)
              


            });
          });
            
          return (
            <View >
              <Text style={{fontSize: 42, fontWeight: 400, alignSelf: 'center', bottom: 60,}}>
                Item Added!
              </Text>
              <View style={{alignSelf: 'center'}}>
              <ViewShot ref={ref1} options={{ fileName: "Item-0", format: "jpg", quality: 0.9 }}>
                <QRCode
                  value={JSON.stringify(qrValuee)}
                  // logo={{uri: base64Logo}}
                  logoSize={30}
                  logoBackgroundColor='transparent' 
                  getRef={(ref) => (myQRCode = ref)}  
                />
            </ViewShot>
            </View>
            </View>
          )
        }
  
      if(isclicked5 && !isAdded) {
  
        const qrValue = {name: reference.current, place: reference2.current, importance: itemImportance}
        
        return (
          <View >
            <Text style={{fontSize: 42, fontWeight: 400, alignSelf: 'center', bottom: 60,}}>
              Item Added!
            </Text>
            <View style={{alignSelf: 'center'}}>
            <ViewShot options={{ fileName: "Item-0", format: "jpg", quality: 0.9 }}>
              <QRCode
                value={JSON.stringify(qrValue)}
                logoSize={30}
                logoBackgroundColor='transparent' 
                getRef={(ref) => (myQRCode = ref)}  
              />
          </ViewShot>
          </View>
          </View>
        )
      }
  
        if(isclicked4) {
          return (
            <View >
              <Text style={{fontSize: 42, fontWeight: 400, alignSelf: 'center', bottom: 30}}>
                Item Added!
              </Text>
              <Image  source={require('../components/img/gif.gif')}
              style={{
                width: 200,
                height: 150,
                alignSelf: 'center'
              }}/>
            </View>
          )
        }
  
        if(isclicked3) {
          return (
            <Picker
                style={{width: '80%', marginHorizontal: 20, backgroundColor: "white", borderRadius: 10, height: 48, justifyContent: 'center', alignSelf: 'center', margin: 20}}
                selectedValue={itemImportance}
                onValueChange={(itemValue, itemIndex) =>
                  handleTextt(itemValue)
                }>
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
              </Picker>
          )
        }
  
        if(isclicked2){
          return (
            <View style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 32, height: 48, justifyContent: 'center', alignSelf: 'center', marginTop: 20}}>
              <TextInput onChangeText={txt => reference2.current = txt} style={{fontSize: 24, marginHorizontal: 30, fontWeight:'400', color: '#090707'}}>
    
              </TextInput>
            </View>
          )
        }
  
        if(isclicked){
        return (
          <View style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 32, height: 48, justifyContent: 'center', alignSelf: 'center', marginTop: 20}}>
            <TextInput onChangeText={txt => reference.current = txt} style={{fontSize: 24, marginHorizontal: 30, fontWeight:'400', color: '#090707'}}>
            </TextInput>
          </View>
        )
      }
  
      return (
        <View style={{width: '80%', marginHorizontal: 40, backgroundColor: "#F6F5F5", borderRadius: 32, justifyContent: 'center', alignSelf: 'center', marginTop: 20, height: 0}}>
          <TextInput onChangeText={txt => reference.current = txt} style={{fontSize: 24, marginHorizontal: 30, fontWeight:'400', color: '#090707'}}>
          </TextInput>
        </View>
      )
  
    }
  
    
  
  
  
      // let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  
      
      return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
              <View style={{justifyContent: 'space-between', flexDirection: 'column', height: SCREEN_HEIGHT / 2}}>
              <BottomHeader height={50} txt={!isclicked ? 'Add New Item' : 'Item Name'} txt2={isclicked3 ? 'Importance' : 'Item Place'} />
              {/* <BottomHeader txt={!isclicked ? 'Add New Item' : 'Item Name'} /> */}
              <FindImage />
              {/* <BottomButton onPress={() => {setIsClicked(true)}}  height={isclicked ? 0 : 50} /> */}
              <TagInput
              
               />
              <BottomButton onPress={() => { if(isclicked5){setIsFinished(true); setQrValuee({name: itemName, place: itemPlace, importance: itemImportance})} else if(isclicked4){setIsClicked5(true)} else if(isclicked3){setIsClicked4(true)} else if(isclicked2){setIsClicked3(true)} else if(isclicked){setIsClicked2(true)} setIsClicked(true) }} txt0={'Add QrTag'} txt={'Continue'} txt4={'Done'} txt5={'Generate QR Code'} txt6={'Save Qr Code'} txt7={'Back To Menu'} />
              </View>
            </Animated.View>
          </GestureDetector>
          </GestureHandlerRootView>
        )
      })


const styles = StyleSheet.create({
  qrReader: {
    position: 'absolute',
    bottom: 0, top:0, right: 0, left:0,
    flex: 1 
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
    line : {width: 75, borderWidth: 1, backgroundColor: 'black', color: 'black', alignSelf: 'center', height: 4, marginVertical: 15, borderRadius: 5},
    bottomSheet : {height: verticalScaleAnti(SCREEN_HEIGHT/39) ,width: '96%', top:SCREEN_HEIGHT / 1.2 , backgroundColor: 'white', alignSelf: 'center', zIndex: 2},
    seperator: {height: .6, borderWidth: .2, borderColor: '#B2A496', marginHorizontal:40},
    countryIcon : {marginLeft: 20},
    cellTxt: {
      fontSize: 13, color: 'black', marginRight: 20
  },
    title: {
    fontSize: 18,
    marginStart: 32,
    fontWeight: 500,
    flex: 1,

},
input: {
    backgroundColor: 'transparent',
    marginLeft: 40,
    borderRadius: 40,
    color: 'black',
    fontSize: 20,
    bottom: 29
},
    cell: {
        paddingVertical: 6,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBox: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 1,
        color: 'gray',
        borderColor: 'transparent',
        fontSize: 28,
        marginHorizontal:20,
        height: 40,
    },
    })

    const Create = () => {
  const [uriii, setUriii] = useState('')
  const [qrName, setQrName] = useState('')
  const [qrPlace, setQrPlace] = useState('')
  const [qrImportance, setQrImportance] = useState('')

  const ref3 = useRef<BottomSheetRefProps>(null) 

  const itemAdded = useCallback(() => {
    ref?.current?.itemAdded()
}, [])


  const readQr = async () => {

    const storeData = async (str: any) => {
      try {
        for(let i=0; i<20; i++){
          const value = await AsyncStorage.getItem(String(i))
          if(value == null) {
            console.log(String(i))
            await AsyncStorage.setItem(String(i), str)
            break
        }
        }
        
      } catch(e) {
        // error reading value
      }
    }
  
    await launchImageLibrary({mediaType: 'photo', maxWidth: 200, maxHeight: 200, quality: 0.8, presentationStyle: 'pageSheet', selectionLimit: 1, }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      else if (response.assets) {
        const image = response.assets[0]
        setUriii(image.uri)      
        
        const qrValu = {name: qrName, place: qrPlace, importance: qrImportance}
        const str = JSON.stringify(qrValu)
        console.log(str)

        storeData(str)
        itemAdded()

    }
  })

  await RNQRGenerator.detect({
    uri: uriii,
  })
    .then(response => {
      const { values } = response; 
      console.log(values)

      const qrValues = JSON.parse(values)

      setQrName(qrValues.name)
      setQrPlace(qrValues.place)
      setQrImportance(qrValues.importance)

      const qrValu = {name: qrName, place: qrPlace, importance: qrImportance}
      const str = JSON.stringify(qrValu)
      
      
      // storeData(str)
      itemAdded()



    })
    .catch(error => console.log('Cannot detect QR code in image', error));


};

  const [sheetHeight, setSheetHeight] = useState(0)
  const ref = useRef<BottomSheetRefProps>(null) 
  let refSheet = useRef(0)
  const scrollTo = useCallback(() => {
      ref?.current?.scrollTo(SCREEN_HEIGHT/ 1.6)
  }, [])

  const getSheetHeight = useCallback(() => {
    setSheetHeight(ref?.current?.getSheetHeight())
    return sheetHeight
  }, [])

  setInterval(getSheetHeight, 1000)
    
  const initial = '';
  const urii = useRef(initial);
  const basee = useRef(initial);

  const [isScanning, setIsScanning] = useState(false)
  const [isAction, setIsAction] = useState(false)
    
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: sheetHeight > -200 ? 'white' : 'gray', zIndex:1}}>
            <PageLabel label={'Create'} bc={'gray'} />
        <View style={{marginTop: 180, opacity: sheetHeight > -300 ? 1 : 0, zIndex: sheetHeight > -200 ? 1 : 0}}>
                <MyButton onPress={() => {scrollTo(); setIsAction(true); setTimeout(getSheetHeight, 1000) }} title={'Add Item'} style={{alignSelf: 'flex-end', width: SCREEN_WIDTH- 60}}/>
                <MyButton2 onPress={() => {readQr(); }} title={'Identify Item'} style={{alignSelf: 'flex-end', width: SCREEN_WIDTH- 60, zIndex: 0}}/>
        </View>
        <View style={[{zIndex: isScanning ? 2 : 0}]}>
        </View>
        <BottomSheet ref={ref} />
    </SafeAreaView>
    )
}

export default Create;

// const onCameraPress = useCallback(() => {
  // const options = {
  //   saveToPhotos: true,
  //   mediaType: 'photo',
  //   includeBase64: false,
  //   maxHeight: 200,
  //   maxWidth: 200,
  // };
  // launchCamera(options, (res) => {
  //   alert(res)
  //   setResourcePath(res)
  // });
// }, []);