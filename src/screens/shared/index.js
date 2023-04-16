import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { getMyShared, getUserShared } from '../../actions/shared';
import Loader from '../../components/loader';
import { formatDate } from '../../utils/dateFunctions';


const Shared = () => {
    const dispatch = useDispatch()
    const myShared = useSelector(state => state.shared.myShared)
    const userShared = useSelector(state => state.shared.userShared)
    const loading = useSelector(state => state.shared.loading)
    const [toggleShared, setToggleShared] = useState('My')

    const getSharing = () => {
        dispatch(getUserShared())
        dispatch(getMyShared())
    }

    useEffect(() => {
        getSharing()
    }, [])

    const getInitials = (name) => {
        const parts = name?.split(' ');
        return parts.map((part) => part?.charAt(0))?.join('');
    };

    const renderItem = ({ item }) => {
        const initials = getInitials(toggleShared == 'My' ? item?.user?.fullName : item?.sender?.fullName);
        return (
            <TouchableOpacity style={{ backgroundColor: '#F5F5F5', margin: 20, padding: 20, borderRadius: 20 }} key={item?._id}>
                <View style={styles.userContainer}>
                    <Text style={{ ...Fonts.blackColor14SemiBold, marginRight: 10 }}>{toggleShared == 'My' ? 'Shared To' : 'Shared By'}</Text>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.text}>{initials}</Text>
                    </View>
                    <Text style={{ ...Fonts.blackColor14SemiBold, marginLeft: 10 }}>{toggleShared == 'My' ? item?.user?.fullName : item?.sender?.fullName}</Text>
                </View>
                <View>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>Task Name: {item?.taskId?.name}</Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>Task Due Date: {formatDate(item?.taskId?.dueDate)}</Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>Status: {item?.taskId?.status ? 'Completed' : 'Not Completed'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (loading) {
        return (
            <Loader/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Sharing'} />
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterBtn} onPress={() => setToggleShared('My')}>
                    <Text style={styles.filterLabel}>Shared By Me</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn} onPress={() => setToggleShared('User')}>
                    <Text style={styles.filterLabel}>Shared With Me</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={toggleShared == 'My' ? myShared : userShared}
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    filterContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    filterBtn: {
        backgroundColor:Colors.blackColor,
        padding:10,
        alignItems:'center',
        borderRadius:10
    },
    filterLabel: {
        ...Fonts.whiteColor14SemiBold
    }
})


export default Shared