const commonColor = {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    primary: '#5d9d18',
};

const light = {
    themeColor: '#efefef',
    lightThemeColor:  '#ffffff',
    darkThemeColor:  '#d0d0d0',
    white: '#000000',
    sky: '#DE5E69',
    gray: 'gray',
    ...commonColor,
};

const dark = {
    themeColor: '#282828',
    lightThemeColor:   '#363636',
    darkThemeColor:   '#0c0c0c',
    white: '#FFFFFF',
    sky: '#831a23',
    gray: 'white',
    ...commonColor,
};

export default { light, dark };
