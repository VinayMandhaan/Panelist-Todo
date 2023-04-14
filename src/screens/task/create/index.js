import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import { Colors, Sizes, Fonts } from '../../../constants/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const CreateTask = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [reminder, setReminder] = useState(false)
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
                        value={name}
                        onChangeText={(value) => setName(value)}
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
                        value={new Date()}

                    />
                </View>
            </View>
            <View>
                <View style={styles.inputContainer}>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor16Regular }}>
                            Add Reminder Before Due Date
                        </Text>
                        <View style={{ width: 20, height: 20, borderRadius: 10 / 2, borderColor: Colors.blackColor, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                            <MaterialCommunityIcons name='check' />
                        </View>
                    </View>

                </View>
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