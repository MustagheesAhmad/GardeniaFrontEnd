import { StyleSheet } from "react-native";

const appStyle =StyleSheet.create({
  footer:
  {
    backgroundColor:'#fff',
    position: 'absolute',bottom: 0, justifyContent: 'center', alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height:"10%",
    radius: 9,
    width:'100%',
    boxShadow: '3px 4px 9px 6px #00000008',

  },
  footerDivCenter:
  {
    width: 70,
    height: 150,
    padding:5,
    // marginRight:10,
     //backgroundColor: "red",
  },
  footerDiv: {
    width: "20%",
    height: 150,
    // padding:5,
    top:5,
    //left:"2%",
    // marginLeft:5,
    // backgroundColor: "red",
  },
  footerDiv2nd:
  {
    top:5,
    width: 65,
    height: 150,
  },
  footerDiv3rd:
  {
    top:5,
    width: 65,
    height: 150,
  left:15,
  },
  footerDiv4th:
  {
    top:5,
    width: 65,
    height: 150,
   left:10,
  },
  image:
  {
    top:55,
    width: 20,
    height: 20,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
     resizeMode: 'stretch', // or 'stretch'
  },
  text:
  {
    top:55,
    // width: "100%",
    fontSize:10,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageCenter:
  {
    width: 30,
    height: 30,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCenter:
  {
    top:5,
    marginLeft:10,
    fontSize:10,
     alignSelf: "center",
    justifyContent: 'center',
   alignItems: 'center'
  }

})
export default appStyle;
