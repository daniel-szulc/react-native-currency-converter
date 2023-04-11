import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme";
import { ThemeContext } from "../theme/ThemeContext";
import SettingsSelectDialog from "./SettingsSelectDialog";


const SettingsComponent = ({
                             settingsOptions
                           }) => {

  const { theme } = useContext(ThemeContext);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [dialogElements, setDialogElements] = useState<[]>([]);
  const [titleDialog, setTitleDialog] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false); // stan określający widoczność Modal
  const [selectionOnPress, setSelectionOnPress] = useState();
  const handleItemSelected = (item: string) => {

    if(selectionOnPress)
      selectionOnPress(item);
  };

  return (
    <>
      <SettingsSelectDialog title={titleDialog} modalElements={dialogElements} selectedElement={selectedItem} onItemSelected={handleItemSelected} modalVisible={dialogVisible} setModalVisible={setDialogVisible}  />
      <ScrollView style={{backgroundColor: Colors[theme].themeColor}}>
        {settingsOptions.map(({icon, title, subTitle, onPress, selectElements, selected}) => (
          <TouchableOpacity key={title} onPress={()=> {
            if(selectElements)
            {
              setSelectionOnPress((item: string) => onPress);
              setDialogElements(selectElements);
              setTitleDialog(title)
              setDialogVisible(true);
              setSelectedItem(selected);
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
