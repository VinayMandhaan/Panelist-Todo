import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Sizes, Fonts } from '../../../constants/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createTask } from '../../../actions/task';
import Button from '../../../components/button';




const CreateTask = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [dueDate, setDueDate] = useState(new Date())
    const [reminder, setReminder] = useState(false)

    const onChangeDate = (val,date) => {
        setDueDate(date)
    }

    const onSubmit = () => {
        const data = {
            name:name,
            description:description,
            dueDate:dueDate,
            reminder:reminder
        }
        dispatch(createTask(data))
    }
    
    return (
        <SafeAreaView>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={{ ...Fonts.blackColor16Regular, marginBottom: 10 }}>
                        Task Name
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
                        Task Description
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
                        Task Due Date
                    </Text>
                    <DateTimePicker
                        value={dueDate}
                        onChange={(val,date) => {
                            onChangeDate(val,date)
                        }}

                    />
                </View>
            </View>
            <View>
                <View style={styles.inputContainer}>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor16Regular }}>
                            Add Reminder Before Due Date
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setReminder(!reminder)
                        }} style={{ width: 20, height: 20, borderRadius: 10 / 2, borderColor: Colors.blackColor, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                            <MaterialCommunityIcons name={reminder ? 'check' : 'cancel'} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <View>
                <Button title={'Create Task'} onBtnPress={onSubmit}/>
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

export default CreateTask