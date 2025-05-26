import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const appStyle = StyleSheet.create({
  body: {
   flex:1
  },
  bgRoundedWhite: {
    width: '90%',
    padding: 10,
    elevation: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    borderColor: '#e9810e',
    flexDirection: 'row',
    marginTop: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgRoundedWhiteMedium: {
    width: '48%',
    padding: 10,
    elevation: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    borderColor: '#e9810e',
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    //backgroundColor: "orange",
    // flexDirection: 'row',
    // marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardContainer2: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    // backgroundColor: "red",
    flexDirection: 'row',
    // marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(7),
    // backgroundColor: "green",
    flexDirection: 'row',
    // marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainerLs: {
    width: responsiveWidth(100),
    height: responsiveHeight(20),

    backgroundColor: 'gray',
    // flexDirection: 'row',

    alignSelf: 'center',
    justifyContent: 'center',

    alignItems: 'center',
  },

  smallRounderContainer: {
    width: '90%',
    //backgroundColor: "#FFC44D",
    borderColor: '#FFC44D',
    padding: 10,
    height: responsiveHeight(13),
    // elevation: 2,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  download: {
    backgroundColor: '#fff',
    height: 20,
    width: 110,
    // fontSize:8,
    borderRadius: 16,
    textAlign: 'center',
  },
  leftContainerPromotion: {
    width: '65%',
    top: 10,
  },
  leftContainerForget: {
    marginRight: '70%',
    width: '20%',
    height: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    borderRadius: 50,
    backgroundColor: '#FFF5E1CC',
  },
  rightContainerForget: {
    width: '50%',
    position: 'absolute',
    height: responsiveHeight(8),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    bottom: 0,
    // top:10,
    // right:30,
  },
  rightContainerPromotion: {
    width: '30%',
  },
  rightContainerPromotion: {
    width: '30%',
  },
  rightIconPromotion: {
    width: 100,
    height: 100,
    flexDirection: 'row',
  },
  rightIconForget: {
    width: 30,
    height: 30,
    flexDirection: 'row',
  },
  textWhite: {
    marginTop: 10,
    marginStart: 20,
    fontSize: 15,
    color: '#FFFF',
  },
  textBlack: {
    marginTop: 10,
    marginStart: 20,
    fontSize: 15,
    color: '#0000',
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e9810e',
  },
  textHeding: {
    fontSize: 18,
    color: '#383937',
    marginStart: 20,
    marginTop: 10,
  },

  inputEmail: {
    width: '90%',
    backgroundColor: '#cd730c',
    padding: 15,
    borderRadius: 30,
    color: '#BF0E0E',
    alignSelf: 'center',
  },
  inputSearch: {
    width: responsiveWidth(90),
    // left: 10,
    // textAlign: "right",
    // marginLeft: 10, // Add left padding to move text slightly to the right

    paddingHorizontal: 20,
    //borderWidth:.5,

    zIndex: 0, // Ensure border has z-index of 0
    margin: 10,
  },
  welcome: {
    fontSize: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginBottom: 20,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
    width: responsiveWidth(100),
    height: responsiveHeight(30),
    resizeMode: 'contain',
  },
  arrow_backF: {
    top: 6,
    marginRight: 20,
  },
  arrowbacklogin: {
    top: 30,
    left: 25,
    // marginRight:20,
  },
  logoF: {
    alignSelf: 'center',
    width: responsiveWidth(100),
    justifyContent: 'center',
    bottom: 15,

    height: responsiveHeight(25),
    resizeMode: 'contain',
  },
  google: {
    width: 34,
    height: 32,
    resizeMode: 'contain',
  },

  signIn: {
    width: '90%',
    padding: 10,
  },
  appButtonContainer: {
    width: responsiveWidth(80),
    alignSelf: 'center',
    backgroundColor: '#FFC44D',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 14,
    color: 'black',
    alignSelf: 'center',
    //textTransform: "uppercase",
    fontFamily: 'Inter',
  },
  appButtonTextSoical: {
    fontSize: 14,
    paddingHorizontal: 5,
    color: '#101828',
    fontWeight: '600',
    textAlign: 'center',
    //textTransform: "uppercase"
  },
  appButtonSoical: {
    width: responsiveWidth(80),
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#CCCCCC',
    borderRadius: 30,
    paddingHorizontal: 12,
    marginTop: 13,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    top: 5,
  },
  leftContainer: {
    justifyContent: 'center',
    // backgroundColor:'purple',
    alignItems: 'center',
    flexDirection: 'row',

    width: responsiveWidth(100),
    height: responsiveHeight(5),
    // marginRight:"5%",
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    marginRight: '3%',
  },
  rowLabelText: {
    fontSize: 14,
    // marginRight:20,
  },
  ForgetTxt: {
    fontSize: 16,
    paddingHorizontal: 10,
    marginLeft: 15,
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
  },
  remember: {
    //height:80,
    width: 100,
  },

  lineText: {
    width: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUp: {
    fontWeight: '600',
    color: 'white',
    fontSize: 13,
  },
  signUpText: {
    color: '#FFC44D',
    fontWeight: 'bold',
    fontSize: 16,
    right: responsiveWidth(30),
  },
});
export default appStyle;
