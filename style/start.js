
import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const appStyle =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //backgroundColor:'blue',
    alignItems: 'center',
     height:responsiveHeight(87),
    // marginTop:100,
    justifyContent: 'center',
    alignItems:'center',
  },
   appButtonContainer: {
        width:250,
        alignSelf: 'center',
        backgroundColor:"#FFC44D",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:10,
      },
     appButtonText: {
        fontSize: 16,
        color: "black",
        //fontWeight: "bold",
        alignSelf: "center",
        //textTransform: "uppercase"
      },
})
export default appStyle;
