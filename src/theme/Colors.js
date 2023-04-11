const commonColor = {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    primary: '#1b82c4',

};

const light = {
    themeColor: '#efefef',
    lightThemeColor:  '#ffffff',
    darkThemeColor:  '#d0d0d0',
    white: '#000000',
    darkWhite: '#6c6c6c',
    disabled: '#a0a0a0',
    sky: '#DE5E69',
    gray: 'gray',
    primaryText: '#1773af',
    ...commonColor,
};

const dark = {
    themeColor: '#282828',
    lightThemeColor:   '#363636',
    darkThemeColor:   '#1c1c1c',
    white: '#FFFFFF',
    darkWhite: '#c5c5c5',
    disabled: '#5f5f5f',
    sky: '#831a23',
    gray: 'white',
    primaryText: '#359ce1',
    ...commonColor,
};

export default { light, dark };
