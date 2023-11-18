import { View, Text, StyleSheet, Animated } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1]
    }
    )

    return (
    <TouchableOpacity   style={styles.deleteBox}>
        <View>
            <Animated.Text style={[{transform: [{scale: scale}]}, {color: 'white'}]}>
            Delete
            </Animated.Text>
        </View>
      </TouchableOpacity>
    )
  }

export const renderLeftActions = (progress, dragX, onPress, item, items, onPress2) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1]
    })
    

return (

    <TouchableOpacity   style={styles.deleteBox}>
        <View>
            <Animated.Text style={[{transform: [{scale: scale}]}, {color: 'white'}]}>
            Delete
            </Animated.Text>
        </View>
      </TouchableOpacity>
);
};

export const rightSwipe = (progress, dragX) => {
const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [.5, 0]
})

return (
<TouchableOpacity  style={styles.archiveBox}>
    <View>
        <Animated.Text style={[{transform: [{scale: scale}]}, {color: 'white'}]}>
        Archive
        </Animated.Text>
    </View>
</TouchableOpacity>
)
}

  const styles = StyleSheet.create({
   deleteBox: {
    justifyContent: 'center', 
    backgroundColor: '#EB0606', 
    alignItems: 'center',
    width: 120,
    height: 48,
    top: 6
},
   archiveBox: {
    justifyContent: 'center', 
    backgroundColor: '#735238', 
    alignItems: 'center',
    width: 120,
    height: 48,
    top: 6
    },
  })