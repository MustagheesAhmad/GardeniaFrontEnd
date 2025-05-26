
import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const appStyle =StyleSheet.create({
  body:
  {
    backgroundColor:'white',
    flex:1,
  },
  inputPayment: {
        width: "100%",
        backgroundColor:'#FAFAFA',
        zIndex: 0, // Ensure border has z-index of 0
      },
   inputSearch: {
        width: "49%",
        marginRight:"1%",
         backgroundColor:'#FAFAFA',
        zIndex: 0, // Ensure border has z-index of 0
      },
      logo:
      {
        //marginTop:20,
        width:responsiveWidth(50) , 
        height:responsiveHeight(20),
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch' 
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
      download:
      {
        backgroundColor:'#FFF5E1CC',
        height:30,
        width:responsiveWidth(60),
        fontSize:16,
        borderRadius:16,
        textAlign: 'center',
        textAlignVertical: "center" 
      },
      welcome:
      {
        fontSize:14,
        marginLeft:"5%",
        marginBottom:20,  
        fontWeight:"300"
      },
      paymentAdd:
      {
        width:responsiveWidth(70),
        fontSize:12,
        textAlign: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
      },
      google:
      {
        width: 23, 
        height: 23,
        resizeMode: 'stretch' 
      },
      applepay:{
        width: 25, 
        height: 25,
        resizeMode: 'stretch' 
      },
      Visa:{
        width: 25, 
        height: 25,
        resizeMode: 'stretch' 
      },
      signIn:
      {
        width: "90%",
        padding:10,
      },
      radio:
      {
        // backgroundColor:'red',
        height: 24,
        width: 24,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#000',
        alignSelf: 'flex-end',
      },
      appButtonContainer: {
        width:"90%",
        alignSelf: 'center',
        backgroundColor: "#FFC44D",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:10,
      },
      appButtonText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: 'Inter'
       
      },
      downloadView:{
        marginTop:"15%",
        marginBottom:"50%",
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
      },
      appButtonTextSoical: {
        fontSize: 14,
        color: "#101828",
        fontWeight: "bold",
        //borderRadius:10,
        // alignSelf: "center",
        flexDirection: 'row',
        textTransform: "uppercase"
      },
      appButtonSoical: {
        width:"90%",
        
        height:responsiveHeight(10),
       // elevation: 1,
        //shadowColor: "black",
        //shadowOpacity: 0.8,
       // shadowRadius: 1,
        // shadowOffset: {
        //   height: 1,
        //   width: 1
        // },

        alignSelf: 'center',
        // borderWidth: 1,
        borderColor: "white",
        // borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        
        //height:responsiveHeight(10),
         justifyContent: 'center',
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
       fontWeight:'bold',
      fontSize:15,
       fontFamily: 'Inter'
    },
    signUpText:
    {
      color:'#FFC44D',
      fontWeight:'bold',
      fontSize:15,
       fontFamily: 'Inter'
    }


})
export default appStyle;
