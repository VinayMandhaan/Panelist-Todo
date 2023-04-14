import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import RBSheet from "react-native-raw-bottom-sheet";
import CreateTask from './create';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, updateTask } from '../../actions/task';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DISPLAY_ALL, DISPLAY_COMPLETED, DISPLAY_NOT_COMPLETED, SORT_TASK } from '../../actions/types';


const Task = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)
    const loading = useSelector(state => state.task.loading)
    const [taskData, setTaskData] = useState(tasks)
    const bottomSheet = useRef()


    const addTask = () => {
        bottomSheet.current.open()
    }

    const getTask = () => {
        dispatch(getTasks())
    }

    const sortByDue = () => {
        dispatch({
            type:SORT_TASK,
            payload:tasks
        })
    }

    const displayCompleted = () => {
        dispatch({
            type:DISPLAY_COMPLETED,
            payload:tasks
        })
    }

    const displayAll = () => {
        dispatch({
            type:DISPLAY_ALL,
            payload:tasks
        })
    }

    const displayNotCompleted = () => {
        dispatch({
            type:DISPLAY_NOT_COMPLETED,
            payload:tasks
        })
    }

    useEffect(() => {
        getTask()
    }, [])


    const renderItem = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#F5F5F5', margin: 20, padding: 20, borderRadius: 20 }} key={item?._id}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    {
                        !item?.status && (
                            <TouchableOpacity onPress={() => dispatch(updateTask(item?._id))}>
                                <MaterialCommunityIcons name='check' color={Colors.greenColor} size={24} />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity onPress={() => dispatch(deleteTask(item?._id))}>
                        <MaterialCommunityIcons name='delete' color={Colors.redColor} size={24} />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...Fonts.blackColor14SemiBold, marginBottom: 6 }}>{item?.name}</Text>
                <Text style={{ ...Fonts.blackColor14SemiBold, marginBottom: 6 }}>{item?.description}</Text>
                <Text style={{ ...Fonts.blackColor14SemiBold, marginBottom: 6 }}>Due: {item?.dueDate}</Text>
                <Text style={{ ...Fonts.grayColor14SemiBold, marginBottom: 6 }}>Reminder Set: {item?.reminder ? 'Yes' : 'No'}</Text>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>Status: {item?.status ? 'Completed' : 'Not Completed'}</Text>
            </View>
        )
    }

    if(loading) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color={'black'} size={24}/>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Task'} showRightIcon={true} onPressRightIcon={addTask} />
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterStyle} onPress={() => {
                    sortByDue()
                }}>
                    <Text style={styles.filterLabel}>Sort By Due Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterStyle} onPress={() => {
                    displayCompleted()
                }}>
                    <Text style={styles.filterLabel}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterStyle} onPress={() => {
                    displayNotCompleted()
                }}>
                    <Text style={styles.filterLabel}>Not Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterStyle} onPress={() => {
                    displayAll()
                }}>
                    <Text style={styles.filterLabel}>ALL</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
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

                <CreateTask />

            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor
    },
    filterStyle: {
        backgroundColor:Colors.blackColor,
        padding:10,
        alignItems:'center',
        borderRadius:10,
        margin:4
    },
    filterContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        flexWrap:'wrap'
    },
    filterLabel: {
        ...Fonts.blackColor12SemiBold,
        color:'white'
    }
})
export default Task

