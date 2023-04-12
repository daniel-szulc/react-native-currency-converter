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
  information: string,
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  button: any;
}

const InfoDialog: React.FC<Props> = ({ title, information, modalVisible, setModalVisible, button }) => {

  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      maxHeight: '80%',
      backgroundColor: Colors[theme]?.themeColor
    },
    title: {
      fontSize: 20,
    },
    text:{
      fontSize: 16,
      color: Colors[theme].white
    },
  })

  return (


    <Dialog
      isVisible={modalVisible}
      onBackdropPress={() =>setModalVisible(!modalVisible)}
      overlayStyle={styles.container}
    >
      <Dialog.Title titleStyle={[styles.text, styles.title]} title={title} />
      <Text style={styles.text}>
        {i18n.t(information)}
      </Text>
      <Dialog.Actions>
        {button && <Dialog.Button titleStyle={Colors[theme].primary} title={i18n.t(button.title)} onPress={button.onPress} />}
        <Dialog.Button titleStyle={Colors[theme].primary} title={i18n.t(button ? "Cancel" : "Close" )} onPress={() => setModalVisible(false)} />
      </Dialog.Actions>
    </Dialog>


  );
};

export default InfoDialog;
