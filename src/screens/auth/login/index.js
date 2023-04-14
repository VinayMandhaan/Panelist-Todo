import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, BackHandler, StatusBar, Dimensions, ScrollView, Modal, TextInput, TouchableOpacity, Image } from 'react-native'
import { Colors, Fonts, Sizes } from '../../../constants/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { showToast } from '../../../utils/customToast';
import { ActivityIndicator } from 'react-native-paper';


const { width } = Dimensions.get('window');

const SigninScreen = ({ navigation }) => {
    // const dispatch = useDispatch()
    // const authLoading = useSelector(state => state.auth.loading)
    const authLoading = false

    const onSubmitLogin = () => {
        navigation.navigate('HomeScreen')
        if (password.length < 7) {
            showToast('error', 'Login', 'Password Should Be More Than 6 Characters')
        } else {
            // dispatch(login(email, password))
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {emailInfo()}
                    {passwordInfo()}
                    {signinButton()}
                    {orText()}
                    {dontAccountInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function dontAccountInfo() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.lightGrayColor16Regular }}>
                    Don’t have an account? { }
                </Text>
                <Text
                    onPress={() => { navigation.push('Signup') }}
                    style={{ ...Fonts.primaryColor16Bold }}
                >
                    Sign Up
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

    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { onSubmitLogin() }}
                style={styles.buttonStyle}
            >
                {
                    authLoading ? (
                        <ActivityIndicator color='white' size={'small'} />
                    ) : (
                        <Text style={{ ...Fonts.whiteColor22Bold, paddingVertical: Sizes.fixPadding + 5.0 }}>
                            Sign In
                        </Text>
                    )
                }
            </TouchableOpacity>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    Password
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        style={{ ...Fonts.blackColor18Regular, flex: 1 }}
                        placeholder="Enter Your Password"
                        placeholderTextColor={Colors.blackColor}
                        cursorColor={Colors.whiteColor}
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
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={{ ...Fonts.blackColor18Regular }}
                    placeholder="Enter Your Email"
                    placeholderTextColor={Colors.blackColor}
                    keyboardType="email-address"
                    cursorColor={Colors.whiteColor}
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
            <Text style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor20SemiBold }}>
                Sign In
            </Text>
        )
    }

}

export default SigninScreen

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
    },
    exitInfoWrapStyle: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})