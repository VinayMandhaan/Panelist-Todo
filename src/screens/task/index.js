import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import RBSheet from "react-native-raw-bottom-sheet";
import CreateTask from './create';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, updateTask } from '../../actions/task';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DISPLAY_ALL, DISPLAY_COMPLETED, DISPLAY_NOT_COMPLETED, SORT_TASK } from '../../actions/types';
import { Modal } from 'react-native-paper';
import Users from '../users';
import { createShared } from '../../actions/shared';
import Loader from '../../components/loader';
import { formatDate } from '../../utils/dateFunctions';



const Task = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const tasks = useSelector(state => state.task.tasks)
    const loading = useSelector(state => state.task.loading)
    const [selectedTask, setSelectedTask] = useState()

    const bottomSheet = useRef()
    const userBottomSheet = useRef()


    const addTask = () => {
        bottomSheet.current.open()
    }

    const getTask = () => {
        dispatch(getTasks())
    }

    const sortByDue = () => {
        dispatch({
            type: SORT_TASK,
            payload: tasks
        })
    }

    const displayCompleted = () => {
        dispatch({
            type: DISPLAY_COMPLETED,
            payload: tasks
        })
    }

    const displayAll = () => {
        dispatch({
            type: DISPLAY_ALL,
            payload: tasks
        })
    }

    const displayNotCompleted = () => {
        dispatch({
            type: DISPLAY_NOT_COMPLETED,
            payload: tasks
        })
    }

    const onShareUser = (selectedUser ) => {
        const data = {
            userId:selectedUser,
            taskId:selectedTask,
            sender:user?._id
        }
        dispatch(createShared(data, userBottomSheet))
    }

    useEffect(() => {
        getTask()
    }, [])


    const displayFilters = () => {
        return (
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
        )
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardStyle} key={item?._id}>
                <View style={styles.iconContainer}>
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

                    <TouchableOpacity onPress={() => {
                        setSelectedTask(item?._id)
                        userBottomSheet.current.open()
                    }}>
                        <MaterialCommunityIcons name='share' color={Colors.grayColor} size={24}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.labelStyle}>Name: {item?.name}</Text>
                <Text style={styles.labelStyle}>Notes: {item?.description}</Text>
                <Text style={styles.labelStyle}>Due: {formatDate(item?.dueDate)}</Text>
                <Text style={styles.grayLabelStyle}>Reminder Set: {item?.reminder ? 'Yes' : 'No'}</Text>
                <Text style={styles.grayLabelStyle}>Status: {item?.status ? 'Completed' : 'Not Completed'}</Text>
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
            <Header title={'Task'} showRightIcon={true} onPressRightIcon={addTask} />
            {displayFilters()}
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
            <RBSheet
                ref={userBottomSheet}
                height={600}
                openDuration={250}
                customStyles={{

                }}
            >
                <Users onClickUser={onShareUser}/>

            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        marginTop:Platform.OS == 'android' ? 20 : 0
    },
    filterStyle: {
        backgroundColor: Colors.blackColor,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        margin: 4
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        flexWrap: 'wrap'
    },
    filterLabel: {
        ...Fonts.blackColor12SemiBold,
        color: 'white'
    },
    labelStyle: {
        ...Fonts.blackColor14SemiBold, 
        marginBottom: 6
    },
    grayLabelStyle: {
        ...Fonts.grayColor14SemiBold, 
        marginBottom: 6 
    },
    cardStyle: {
        backgroundColor: '#F5F5F5',
        margin: 20, 
        padding: 20, 
        borderRadius: 20
    },
    iconContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10
    }
})
export default Task

