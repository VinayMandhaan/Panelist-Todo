import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Header = ({ title, showLeftIcon, showRightIcon, onPressRightIcon, onPressLeftIcon }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='arrow-left-circle' color={Colors.blackColor} size={24} />
                </TouchableOpacity>
                <Text style={styles.textStyle}>{title}</Text>
                {
                    showRightIcon && (
                        <TouchableOpacity onPress={()=>onPressRightIcon()} style={styles.addBtnStyle}>
                            <MaterialCommunityIcons name='plus-circle' color={Colors.grayColor} size={24}/>
                        </TouchableOpacity>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        margin:20,
    },
    textStyle: {
        fontSize:20,
        marginLeft:20,
        fontWeight:'bold'
    },
    addBtnStyle: {
        width:'70%',
        alignItems:'flex-end'
    }
})

export default Header