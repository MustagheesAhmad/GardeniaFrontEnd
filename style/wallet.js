import { StyleSheet } from "react-native";

const appStyle = StyleSheet.create({
  promtionTwo: {
    width: "90%",
    backgroundColor: "#FFC44D",
    padding: 10,
    height: 129,
    // elevation: 2,
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainerPromotion: {
    width: "100%",
    top: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  LeftContainer: {
    width: "37%",
    marginLeft: "3%",
    // alignSelf: 'flex-start',
    
  },
  RightContainer: {
    width: "35%",
    // alignSelf: 'flex-end',
  },
  image: {
    marginLeft: "5%",
    height: 50,
    width: 50,
    borderRadius: 65,
  },
  short_image: {
    height: 30,
    width: 30,
    borderRadius: 65,
  },
  short_image_outer: {
    marginLeft: "5%",
    height: 60,
    width: 60,
    borderRadius: 65,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: "88%",
    marginTop: 10,
    flex: 1,
    height: 1,
    backgroundColor: "#E8ECF1",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  line2: {
    width: "88%",
    marginTop: 10,
    height: 1,
    backgroundColor: "#E8ECF1",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
  },
  leftContainerRight: {
    paddingLeft: "7%",
    width: "70%",
    height: 50,
  },
  rowLabelText: {
    fontSize: 20,
    flex: 1,
    flexDirection: "row",
    fontWeight: "Bold",
  },
  rightContainerSmall: {
    width: "23%",
  },
  rowLabelTextRight: {
    fontSize: 13,
    flex: 1,
    top: 2,
    alignSelf: "flex-end",
    flexDirection: "row",
    fontWeight: "Bold",
  },
});
export default appStyle;
