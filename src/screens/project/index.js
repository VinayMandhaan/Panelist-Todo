import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CreateProject from './create';
import { deleteProject, getProject, updateProject } from '../../actions/project';
import Loader from '../../components/loader';



const Project = () => {
    const dispatch = useDispatch()
    const bottomSheet = useRef()
    const projects = useSelector(state => state.project.projects)
    const loading = useSelector(state => state.project.loading)

    const addProject = () => {
        bottomSheet.current.open()
    }

    const getProjects = () => {
        dispatch(getProject())
    }

    useEffect(() => {
        getProjects()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#F5F5F5', margin: 20, padding: 20, borderRadius: 20 }} key={item?._id}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    {
                        !item?.status && (
                            <TouchableOpacity onPress={() => dispatch(updateProject(item?._id))}>
                                <MaterialCommunityIcons name='check' color={Colors.greenColor} size={24} />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity onPress={() => dispatch(deleteProject(item?._id))}>
                        <MaterialCommunityIcons name='delete' color={Colors.redColor} size={24} />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...Fonts.blackColor14SemiBold, marginBottom: 6 }}>{item?.name}</Text>
                <Text style={{ ...Fonts.blackColor14SemiBold, marginBottom: 6 }}>{item?.description}</Text>
                <Text style={{ ...Fonts.blackColor14SemiBold, marginBottom: 6 }}>Task: {item?.taskId?.name}</Text>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>Status: {item?.status ? 'Completed' : 'Not Completed'}</Text>
            </View>
        )
    }


    if (loading) {
        return (
            <Loader/>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Project'} showRightIcon={true} onPressRightIcon={addProject} />
            <FlatList
                data={projects}
                keyExtractor={(item) => `${item._id}`}
                renderItem={renderItem}
            />
            <RBSheet
                ref={bottomSheet}
                height={600}
                openDuration={250}
                customStyles={{

                }}
            >
                <CreateProject />

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

export default Project

