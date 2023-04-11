import React, { useContext, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import { Currency } from "./Currency";
import i18n from "i18next";

interface Props {
  selectedCurrency : Currency | undefined;
  modalVisible: boolean;
  setModalVisible: (param: boolean) => void;
  convertValue: (param: number) => void;
}
  const InputValueModal : React.FC<Props> =  ({ selectedCurrency , modalVisible, setModalVisible, convertValue }) => {

    const { theme } = useContext<ThemeType>(ThemeContext);
    const [value, setValue] = useState<string>('1');

    const handleInputChange = (text: string) => {
      // Wartość inputa zostanie przefiltrowana tak, aby zawierała tylko cyfry
      const filteredText = text.replace(/[^0-9.,]/g, '');


      const hasDecimalBefore = filteredText.indexOf('.') !== -1 && filteredText.indexOf('.') < filteredText.length - 1;
      const hasCommaBefore = filteredText.indexOf(',') !== -1 &&  filteredText.indexOf(',') < filteredText.length - 1;

      if ((hasDecimalBefore || hasCommaBefore) && (filteredText.charAt(filteredText.length - 1) === '.' ||
        filteredText.charAt(filteredText.length - 1) === ',')) {
        setValue(filteredText.slice(0, -1));
      } else {
        setValue(filteredText);
      }

    };

    const handleButtonPress = () => {
      convertValue(parseFloat(value.replace(',', '.')));
      setModalVisible(false)
    };

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
      },
      modalView: {
        margin: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors[theme]?.themeColor,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        marginTop: 15,
        width: "100%",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: Colors[theme]?.primary,
        minWidth: "60%",
      },
      textStyle: {
        fontSize: 16,
        color: Colors[theme]?.darkWhite,
        textAlign: 'center',
        padding: 10,
      },
      amounts:{
        backgroundColor: Colors[theme]?.lightThemeColor,
        width: undefined,
        padding: 0,
        minWidth: undefined,
        marginTop: 2.5,
        margin: 2.5,
        flex: 1,

      },
      modalText: {
        marginBottom: 10,
        fontWeight: "bold",
        color: Colors[theme]?.white,
        textAlign: 'center',
      },
      textInput:{

        padding: 10,
        alignSelf: "center",
        fontSize: 20,
        paddingStart: 25,
        textAlign: "center",
        flex: 2,
        color: Colors[theme]?.white,
      },
      textInputContainer: {
        backgroundColor: Colors[theme]?.darkThemeColor,
       shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },

        marginBottom: 15,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 10,
        elevation: 5,
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        width: "100%",

      },
      prefix: {

        position: "absolute",
        paddingHorizontal: 10,
        fontSize: 15,
        color: "#999",

      },
      acceptStyle:{
        fontSize: 20,
        color: Colors[theme]?.commonWhite
      },
      exampleAmounts:{
        width: "100%",
        flexDirection: "row",

        justifyContent: "space-between"
      },

    });


    return(

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}

        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedCurrency?.full_name}</Text>
            <View style={styles.textInputContainer}>
                <Text style={styles.prefix}>{selectedCurrency?.symbol}</Text>
            <TextInput
              keyboardType="numeric"
              selectTextOnFocus
              value={value}
              onChangeText={handleInputChange}
              style={styles.textInput}
              onSubmitEditing={handleButtonPress}
            />
            </View>
            <View style={styles.exampleAmounts}>
              <Pressable
                style={[styles.button, styles.amounts]}
                onPress={() => setValue("1")}>
                <Text style={styles.textStyle}>1</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.amounts]}
                onPress={() => setValue("10")}>
                <Text style={styles.textStyle}>10</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.amounts]}
                onPress={() => setValue("25")}>
                <Text style={styles.textStyle}>25</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.amounts]}
                onPress={() => setValue("50")}>
                <Text style={styles.textStyle}>50</Text>
              </Pressable>

            </View>
            <View style={styles.exampleAmounts}>
              <Pressable
                style={[styles.button, styles.amounts]}
                onPress={() => setValue("100")}>
                <Text style={styles.textStyle}>100</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.amounts]}
                onPress={() => setValue("500")}>
                <Text style={styles.textStyle}>500</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.amounts]}
                onPress={() => setValue("1000")}>
                <Text style={styles.textStyle}>1000</Text>
              </Pressable>

            </View>
            <Pressable
              style={[styles.button]}
              onPress={handleButtonPress}>
              <Text style={[styles.textStyle, styles.acceptStyle]}>{i18n.t("Convert")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    )
  }
export default InputValueModal;
