import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Sizes, Fonts } from '../../../constants/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/button';
import DropDownPicker from 'react-native-dropdown-picker';
import { createProject } from '../../../actions/project';





const CreateProject = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [dueDate, setDueDate] = useState(new Date())
    const [reminder, setReminder] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)
    const tasks = useSelector(state => state.task.tasks)
    var [items, setItems] = useState()


    const getTasks = () => {
        var newArray = []
        tasks?.map(val => {
            var newItem = {
                value: val?._id,
                label: val?.name
            }
            newArray.push({ ...newItem })
        })
        setItems(newArray)
    }

    useEffect(() => {
        getTasks()
    }, [])

    const onSubmit = () => {
        const data = {
            name: name,
            description: description,
            taskId:value,
        }
        dispatch(createProject(data))
    }

    return (
        <SafeAreaView>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={{ ...Fonts.blackColor16Regular, marginBottom: 10 }}>
                        Project Name
                    </Text>
                    <TextInput
                        value={name}
                        onChangeText={(value) => setName(value)}
                        style={{ ...Fonts.blackColor18Regular, borderBottomColor: Colors.grayColor, borderBottomWidth: 1 }}
                        placeholder="Buy Grocery..."
                        placeholderTextColor={Colors.grayColor}
                        cursorColor={Colors.whiteColor}
                    />
                </View>
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={{ ...Fonts.blackColor16Regular, marginBottom: 10 }}>
                    Project Description
                    </Text>
                    <TextInput
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                        style={{ ...Fonts.blackColor18Regular, borderBottomColor: Colors.grayColor, borderBottomWidth: 1 }}
                        placeholder="From Wallmart.."
                        placeholderTextColor={Colors.grayColor}
                        cursorColor={Colors.whiteColor}
                    />
                </View>
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={{ ...Fonts.blackColor16Regular, marginBottom: 10 }}>
                        Select Task
                    </Text>
                    <DropDownPicker
                        maxHeight={400}
                        containerStyle={{height:'auto'}}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                    />
                </View>
            </View>
            <View>
                <Button title={'Create Project'} onBtnPress={onSubmit} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0
    },
    labelStyle: {

    }
})

export default CreateProject