import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/users';


const Users = ({onClickUser}) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    const getAllUsers = () => {
        dispatch(getUsers())
    }

    const getInitials = (name) => {
        const parts = name?.split(' ');
        return parts.map((part) => part?.charAt(0))?.join('');
    };

    useEffect(() => {
        getAllUsers()
    }, [])

    const renderItem = ({ item }) => {
        const initials = getInitials(item?.fullName);
        return (
            <TouchableOpacity onPress={() => {
                onClickUser(item?._id)
            }} style={{ backgroundColor: '#F5F5F5', margin: 20, padding: 20, borderRadius: 20 }} key={item?._id}>
                <View style={styles.userContainer}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.text}>{initials}</Text>
                </View>
                <Text style={{ ...Fonts.blackColor14SemiBold, marginLeft:10}}>{item?.fullName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Users'} />
            <FlatList
                data={users}
                keyExtractor={(item) => `${item._id}`}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
      },
      text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
      },
      userContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
      }
})

export default Users

