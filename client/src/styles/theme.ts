import {createMuiTheme} from '@material-ui/core/styles';
import {lightBlue} from '@material-ui/core/colors';

const adjustColor = (color:string , amount:number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

const mainColor = '' // need to select some nice color

export const useCustomTheme = () => {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: mainColor || lightBlue[500],
                light: mainColor ? adjustColor(mainColor, 40) : undefined,
                contrastText: '#ffffff',
            }
        }
    });
    
    return theme;
}