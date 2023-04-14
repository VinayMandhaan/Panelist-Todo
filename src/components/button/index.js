import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { Colors } from "../../constants/styles"


const Button = ({ title, onBtnPress }) => {
    return (
        <TouchableOpacity style={styles.btnStyle} onPress={() => onBtnPress()}>
            <Text style={styles.labelStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor:Colors.blackColor,
        padding:20,
        alignItems:'center',
        margin: 20,
        borderRadius:20
    },
    labelStyle: {
        color:Colors.whiteColor
    }
})

export default Button