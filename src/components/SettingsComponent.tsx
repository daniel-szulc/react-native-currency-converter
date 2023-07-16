import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme";
import { ThemeContext } from "../theme/ThemeContext";
import SettingsSelectDialog from "./SettingsSelectDialog";
import InfoDialog from "./InfoDialog";
import infoDialog from "./InfoDialog";
import i18n, { use } from "i18next";
import ContactDialog from "./ContactDialog";
import Constants from "expo-constants"


const SettingsComponent = ({
                             settingsOptions,
                              styles
                           }) => {

  const { theme } = useContext(ThemeContext);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [dialogElements, setDialogElements] = useState<[]>([]);
  const [dialogType, setDialogType] = useState("");
  const [titleDialog, setTitleDialog] = useState("");
  const [infoDialog, setInfoDialog] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectionOnPress, setSelectionOnPress] = useState();
  const [infoButton, setInfoButton] = useState();
  const version = Constants.manifest.version
  const handleItemSelected = (item: string) => {

    if(selectionOnPress)
      selectionOnPress(item);
  };



  return (
    <>
      {dialogType=="select" && <SettingsSelectDialog title={titleDialog} modalElements={dialogElements} selectedElement={selectedItem} onItemSelected={handleItemSelected} modalVisible={dialogVisible} setModalVisible={setDialogVisible}  />}
      {dialogType=="info" &&  <InfoDialog title={titleDialog} information={infoDialog} modalVisible={dialogVisible} setModalVisible={setDialogVisible} button={infoButton}/> }
      <ScrollView style={{backgroundColor: Colors[theme].darkCommon}}>
        {settingsOptions.map(({icon, title, subTitle, onPress, selectElements, selected, infoDialog, button}) => (
          <TouchableOpacity key={title} onPress={()=> {

            if(selectElements)
            {
              setDialogType("select")
              setSelectionOnPress((item: string) => onPress);
              setDialogElements(selectElements);
              setTitleDialog(i18n.t(title))
              setDialogVisible(true);
              setSelectedItem(selected);
            }
            else if(infoDialog)
            {
              setDialogType("info")
              setTitleDialog(title)
              setInfoDialog(infoDialog)
              setDialogVisible(true);
              if(button)
                setInfoButton(button)
              else setInfoButton(undefined);
            }
            else {
              onPress();
            }
          }
          }>
            <View
              style={styles.option}>

              {icon}

            <View
              style={{

              }}>
              <Text style={styles.title}>{i18n.t(title)}</Text>
              {subTitle && (
                <Text style={styles.subtitle}>
                  {i18n.t(subTitle)}
                </Text>
              )}
            </View>
            </View>
            <View style={{height: 0.5, backgroundColor: Colors[theme].darkThemeColor}} />
          </TouchableOpacity>
        ))}
        <View   style={styles.option}>
          <View>
          <Text style={styles.title}>{i18n.t("Version")}</Text>
          <Text style={styles.subtitle}>{version}</Text>
          </View>
        </View>
        <View style={ {
          height: 0.5,
          backgroundColor: Colors[theme].darkThemeColor
        }} />
        <Text style={   {
          alignSelf: "flex-end",
          margin: 5,
          marginHorizontal: 10,
          color: Colors[theme]?.darkWhite
        }}>Copyright © {new Date().getFullYear()} Daniel Szulc</Text>
      </ScrollView>
    </>
  );
};

export default SettingsComponent;
