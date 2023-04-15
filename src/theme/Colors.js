const commonColor = {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    primary: '#1b82c4',

};

const light = {
    common: '#ffffff',
    darkCommon: '#f5f5f5',
    hardDarkCommon:  '#e1e1e1',
    themeColor: '#efefef',
    lightThemeColor:  '#ffffff',
    darkThemeColor:  '#d0d0d0',
    white: '#000000',
    darkWhite: '#6c6c6c',
    disabled: '#a0a0a0',
    sky: '#DE5E69',
    gray: 'gray',
    primaryText: '#1773af',
    primarySoft: '#b7defa',
    ...commonColor,
};

const dark = {
    common: '#000000',
    darkCommon: '#0f0f0f',
   hardDarkCommon: '#252525',
    themeColor: '#282828',
    lightThemeColor:   '#363636',
    darkThemeColor:   '#1c1c1c',
    white: '#FFFFFF',
    darkWhite: '#c5c5c5',
    disabled: '#5f5f5f',
    sky: '#831a23',
    gray: 'white',
    primaryText: '#359ce1',
    primarySoft:  '#05273b',
    ...commonColor,
};

export default { light, dark };
