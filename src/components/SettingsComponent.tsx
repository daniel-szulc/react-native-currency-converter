import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme";
import { ThemeContext } from "../theme/ThemeContext";
import SettingsSelectDialog from "./SettingsSelectDialog";
import InfoDialog from "./InfoDialog";
import infoDialog from "./InfoDialog";
import { use } from "i18next";
import ContactDialog from "./ContactDialog";


const SettingsComponent = ({
                             settingsOptions
                           }) => {

  const { theme } = useContext(ThemeContext);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [dialogElements, setDialogElements] = useState<[]>([]);
  const [dialogType, setDialogType] = useState("");
  const [titleDialog, setTitleDialog] = useState("");
  const [infoDialog, setInfoDialog] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false); // stan określający widoczność Modal
  const [selectionOnPress, setSelectionOnPress] = useState();
  const [infoButton, setInfoButton] = useState();

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
              setTitleDialog(title)
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
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 20
              }}>

              {icon}

            <View
              style={{

              }}>
              <Text style={{fontSize: 17, color: Colors[theme].white}}>{title}</Text>
              {subTitle && (
                <Text style={{fontSize: 14, color: Colors[theme].darkWhite, opacity: 0.5, paddingTop: 5}}>
                  {subTitle}
                </Text>
              )}
            </View>
            </View>
            <View style={{height: 0.5, backgroundColor: Colors[theme].darkThemeColor}} />
          </TouchableOpacity>
        ))}
        <Text style={{
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
