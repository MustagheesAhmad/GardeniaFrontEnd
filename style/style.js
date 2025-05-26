import { StyleSheet } from "react-native";

const appStyle =StyleSheet.create({
    bgRoundedWhite: {
        width: "90%",
        padding: 10,
        elevation: 10,
        backgroundColor: "#FFFF",
        borderRadius: 10,
        borderColor: "#e9810e",
        flexDirection: 'row',
        marginTop: 60,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center'
      },

      bgRoundedWhiteMedium:{
        width: "48%",
        padding: 10,
        elevation: 10,
        backgroundColor: "#FFFF",
        borderRadius: 10,
        borderColor: "#e9810e",
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center'  
      },
      cardContainer: {
        width: "90%",
        padding: 10,
        elevation: 10,
        backgroundColor: "#FFFF",
        borderRadius: 10,
        borderColor: "#e9810e",
        flexDirection: 'row',
        marginTop: 60,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center'
      },
      smallRounderContainer:{
        width: "48%",
        padding: 10,
        elevation: 10,
        backgroundColor: "#FFFF",
        borderRadius: 10,
        borderColor: "#e9810e",
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center'  
      }
      ,

      textWhite: {
        marginTop: 10,
        marginStart: 20,
        fontSize: 15,
        color: "#FFFF",
      },
      textBlack: {
        marginTop: 10,
        marginStart: 20,
        fontSize: 15,
        color: "#0000",
      },
      textButton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e9810e",
      },
      textHeding: {
        fontSize: 18,
        color: '#383937',
        marginStart: 20,
        marginTop: 10,
      },
    
      inputEmail: {
        width: "90%",
        backgroundColor: "#cd730c",
        padding: 15,
        borderRadius: 30,
        color: "#BF0E0E",
        alignSelf: 'center',
      },
      inputSearch: {
        width: "90%",
        padding: 5,
        alignSelf: 'flex-start',
      }

})
export default appStyle;
