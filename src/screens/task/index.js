import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import RBSheet from "react-native-raw-bottom-sheet";
import CreateTask from './create';




const Task = () => {


    const bottomSheet = useRef()

    const addTask = () => {
        bottomSheet.current.open()
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Task'} showRightIcon={true} onPressRightIcon={addTask} />
            <RBSheet
                ref={bottomSheet}
                height={600}
                openDuration={250}
                customStyles={{

                }}
            >

                <CreateTask/>

            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor
    }
})

export default Task

