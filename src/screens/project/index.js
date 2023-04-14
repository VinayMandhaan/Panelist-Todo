import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/styles';
import Header from '../../components/header';


const Project = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Project'}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
     flex:1,
     backgroundColor:Colors.whiteColor
    }
 })

export default Project

