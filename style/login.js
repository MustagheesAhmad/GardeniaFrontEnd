
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
        height:70,
        // backgroundColor: "#FFFF",
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
     
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
        width: "100%",
        zIndex: 0, // Ensure border has z-index of 0
      },
      welcome:
      {
        fontSize:32,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center'  
      },
      logo:
      {
        marginTop:50,
        alignSelf: 'center',
        width: 150, 
        height: 100,
        resizeMode: 'stretch' 
      },
      google:
      {
        width: 28, 
        height: 28 
      },
      signIn:
      {
        width: "90%",
        padding:10,
      },
      appButtonContainer: {
        width:"90%",
        alignSelf: 'center',
        backgroundColor: "#F5890C",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:10,
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonTextSoical: {
        fontSize: 16,
        color: "#101828",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonSoical: {
        width:"90%",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:10,
      },
      leftContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
        width:'100%',
        marginRight:"5%",
      },
    rightContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      width:'100%',
      marginRight:"3%",
    },
    rowLabelText: {
      fontSize: 16.0,
    },
    line:{
      flex: 1,
      height: 1,
      backgroundColor: 'black'
    },
    lineText:{
      width: 50,
      textAlign: 'center'
    },
    signUp:{
      fontSize:14,
    }


})
export default appStyle;
