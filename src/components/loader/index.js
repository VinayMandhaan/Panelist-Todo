import { ActivityIndicator, View, StyleSheet } from "react-native"


const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={'black'} size={24} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Loader