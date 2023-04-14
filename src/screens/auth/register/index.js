import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { Colors, Fonts, Sizes } from '../../../constants/styles'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../actions/auth';
import { ActivityIndicator } from 'react-native-paper';



const { width } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const authLoading = useSelector(state => state.auth.loading)
    const [fullName, setFullName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const onSubmitRegister = () => {
        dispatch(register(email, password, fullName))
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.secondaryColor} />
                <View style={{ flex: 1, }}>
                    {header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* {displayImagePicker()} */}
                        {displayUsername()}
                        {emailInfo()}
                        {/* {phoneNumberInfo()} */}
                        {passwordInfo()}
                        {confirmPasswordInfo()}
                        {signupButton()}
                        {orText()}
                        {/* {socialMediaOIptions()} */}
                        {alreadyAccountInfo()}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )



    function displayUsername() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: 20 }}>
                <Text style={{ ...Fonts.blackColor18Regular }}>
                    Full Name
                </Text>
                <TextInput
                    value={fullName}
                    onChangeText={(value) => setFullName(value)}
                    style={{ ...Fonts.blackColor18Regular }}
                    placeholder="Enter Your Username"
                    placeholderTextColor={Colors.blackColor}
                    cursorColor={Colors.blackColor}
                />
                {divider()}
            </View>
        )
    }



    function alreadyAccountInfo() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.lightGrayColor16Regular }}>
                    Already have an account? { }
                </Text>
                <Text
                    onPress={() => { navigation.push('Signin') }}
                    style={{ ...Fonts.primaryColor16Bold }}
                >
                    Sign In
                </Text>
            </Text>
        )
    }


    function orText() {
        return (
            <Text style={{ ...Fonts.lightGrayColor16Regular, marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                OR
            </Text>
        )
    }

    function signupButton() {
        return (
            <TouchableOpacity
                disabled={authLoading}
                activeOpacity={0.8}
                onPress={() => { onSubmitRegister() }}
                style={styles.buttonStyle}
            >
                {
                    authLoading ? (
                        <ActivityIndicator color='white' size={'small'} />
                    ) : (
                        <Text style={{ ...Fonts.whiteColor22Bold, paddingVertical: Sizes.fixPadding + 5.0 }}>
                            Sign Up
                        </Text>
                    )
                }

            </TouchableOpacity>
        )
    }

    function confirmPasswordInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18Regular }}>
                    Confirm Password
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        style={{ ...Fonts.blackColor18Regular, flex: 1 }}
                        placeholder="Enter Your Password"
                        placeholderTextColor={Colors.blackColor}
                        cursorColor={Colors.blackColor}
                        secureTextEntry={!confirmPasswordVisible}
                    />
                    <MaterialCommunityIcons
                        name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"}
                        size={16}
                        color={Colors.whiteColor}
                        onPress={() => { setConfirmPasswordVisible(!confirmPasswordVisible) }}
                    />
                </View>
                {divider()}
            </View>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18Regular }}>
                    Password
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        style={{ ...Fonts.blackColor18Regular, flex: 1 }}
                        placeholder="Enter Your Password"
                        placeholderTextColor={Colors.blackColor}
                        cursorColor={Colors.blackColor}
                        secureTextEntry={!passwordVisible}
                    />
                    <MaterialCommunityIcons
                        name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                        size={16}
                        color={Colors.whiteColor}
                        onPress={() => { setPasswordVisible(!passwordVisible) }}
                    />
                </View>
                {divider()}
            </View>
        )
    }


    function emailInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18Regular }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={{ ...Fonts.blackColor18Regular }}
                    placeholder="Enter Your Email"
                    placeholderTextColor={Colors.blackColor}
                    keyboardType="email-address"
                    cursorColor={Colors.blackColor}
                />
                {divider()}
            </View>
        )
    }


    function divider() {
        return (
            <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginTop: Sizes.fixPadding - 5.0 }} />
        )
    }

    function header() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <MaterialIcons name="arrow-back-ios" size={22} color={Colors.blackColor} onPress={() => navigation.pop()} />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor20SemiBold }}>
                    Sign Up
                </Text>
            </View>
        )
    }

}

export default SignupScreen

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        margin: Sizes.fixPadding * 2.0,
        minHeight: 60,
    },
    socialMediaIconWrapStyle: {
        width: width / 8.0,
        height: width / 8.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor
    },
    socialMediaIconStyle: {
        width: width / 18.0,
        height: width / 18.0,
        resizeMode: 'contain'
    },
    socialMediaOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0
    }
})