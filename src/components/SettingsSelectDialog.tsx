import React, { useContext, useState } from "react";
import { Text, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View, Pressable } from "react-native";
import { Colors } from "../theme";
import { ThemeContext } from "../theme/ThemeContext";

import {
  Dialog,
} from '@rneui/themed';
import i18n from "i18next";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";


interface Props {
  title: string;
  modalElements: {};
  selectedElement: string,
  onItemSelected: (item: string) => void;
  onCancel: () => void;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const SettingsSelectDialog: React.FC<Props> = ({ title, modalElements, selectedElement, onItemSelected, modalVisible, setModalVisible }) => {

  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      maxHeight: '80%',
      backgroundColor: Colors[theme]?.themeColor
    },
    checkboxBase: {
      width: 26,
      height: 26,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    text:{
      color: Colors[theme].white
    },
    element:{
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      paddingTop: 10,
      paddingBottom: 5,
      paddingStart: 5,
    }
  })

  return (


    <Dialog
      isVisible={modalVisible}
      onBackdropPress={() =>setModalVisible(!modalVisible)}
      overlayStyle={styles.container}
    >
      <Dialog.Title titleStyle={styles.text} title={title} />

      <ScrollView>
      {Object.keys(modalElements).map((item) => (
        <TouchableOpacity style={styles.element} key={item} onPress={() => {
          setModalVisible(false);
          onItemSelected(item);
        }}>
        <Pressable
          key={item}
          style={styles.checkboxBase}>
          {selectedElement === item ? <FontAwesome name="dot-circle-o" size={24} color={Colors[theme].primary} /> : <FontAwesome name="circle-o" size={24} color={Colors[theme].disabled} />}
        </Pressable>
          <Text style={[styles.text, {fontSize: 17}]}>{modalElements[item]}</Text>
        </TouchableOpacity>

      ))}
      </ScrollView>
      <Dialog.Actions>
        <Dialog.Button titleStyle={Colors[theme].primary} title={i18n.t("Cancel")} onPress={() => setModalVisible(false)} />
      </Dialog.Actions>
    </Dialog>


  );
};

export default SettingsSelectDialog;
