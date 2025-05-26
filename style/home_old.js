import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    myJobContainer: {
        width: "28%",
        marginStart: 20,
        padding: 10,
        backgroundColor: "#F4DEB5",
        borderRadius: 10,
        borderColor: "#e9810e",
        alignItems: "center",
        justifyContent: "center",
    },
     smallRounderContainer:{
        width: "48%",
        padding: 10,
        height:92,
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
    textHeading: {
        fontSize: 18,
        color: '#383937',
        marginStart: 20,
        marginTop: 10,
        width:100,
      },
      promotionHeader:{
        fontSize: 17,
        width:'100%',
        color: '#383937',
        fontWeight:600,
        lineHeight:57,
      },
      promotionBody:
      {
        fontSize: 18,
        width:'100%',
        color: '#383937',
      },
      promotionBodyText:
      {
        width:'60%',
        fontWeight:400,
        fontSize:15,
        lineHeight:22,
      },
      promotionImage:
      {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
      },
    rowContainer: {
        width: "70%",
        marginStart: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#CF9FFF",
        borderColor: "#e9810e",
        justifyContent: "center",
        alignItems: "center",
    },
    promoContainer: {
        width: "70%",
        marginStart: 20,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#CEEFC0",
        ustifyContent: "center",
        alignItems: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    promotionContainer:
    {
        paddingRight: 40,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#F8F8F8",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
    },
    bannerContainer: {
      width: "90%",
      height: 141,
      padding: 10,
      marginTop: 30,
      borderRadius: 10,
      backgroundColor: "#F8F8F8",
      alignSelf: "center",
      alignItems: "center",
      alignContent: "center",
    },
    appButtonContainer: {
        width:134,
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
    buttonOnline: {
        width: "15%",
        backgroundColor: "39B54A",
    },
    rightIcon: {
        width: 50,
        height: 50,
        marginLeft:30,
        alignContent: "center",
    },
    grayContainer: {
        width: "100%",
        height: 5,
        backgroundColor: "#e4e1dc",
        marginTop: 50,
    },
});
export default homeStyles;
