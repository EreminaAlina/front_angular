// export interface Theme {
//     name: string;
//     properties: any;
// }
//
// export const light: Theme = {
//     name: 'light',
//     properties: {
//         "--bg-color": "#CECDD3", //цвет фона
//         "--text-color": "#140909", //цвет текста
//         "--button-bg-color": "#D0BFAF", //цвет фона кнопки
//         "--button-border-color": "#66688b", //цвет границы кнопки
//         "--border-color": "#98a1a1", //цвет рамок
//         "--border-bottom-color": "#575252",
//         "--back-color": "#e3e1e7"
//     }
// };
//
// export const dark: Theme = {
//     name: 'dark',
//     properties: {
//         "--bg-color": "#3e3e3e",
//         "--text-color": "#e4e5e8",
//         "--button-bg-color": "#615676",
//         "--button-border-color": "#022763",
//         "--border-color": "#dadaf6",
//         "--border-bottom-color": "#7d86c1",
//         "--back-color": "#615676"
//     }
// };

export interface Theme {
    backgroundColor: string;
    buttonColor: string;
    headingColor: string;
    label: string;
    value: string;
    checked?: boolean;
}
