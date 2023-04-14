import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import RBSheet from "react-native-raw-bottom-sheet";
import CreateTask from './create';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, updateTask } from '../../actions/task';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
        const dateArray = [...taskData]
        dateArray?.sort((a, b) => new Date(a?.dueDate) - new Date(b?.dueDate));
        setTaskData(dateArray)
    }

    const sortByCompleted = () => {

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
                <Text style={{ ...Fonts.grayColor14SemiBold }}>Status: {item?.status ? 'Not Completed' : 'Completed'}</Text>
            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Task'} showRightIcon={true} onPressRightIcon={addTask} />
            <View>
                <TouchableOpacity onPress={() => {
                    sortByDue()
                }}>
                    <Text>Sort By Due Date</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks?.task}
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
    }
})
export default Task

