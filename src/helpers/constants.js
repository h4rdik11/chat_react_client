//heroku url : https://baroque-choucroute-81714.herokuapp.com/
//local url : http://192.168.100.5:8000/
import {smileO, frownO, mehO} from 'react-icons-kit/fa';

export const SERVER_URL = "http://192.168.100.5:8000/";
export const EMOJI = {
    neutral: {
        icon:mehO,
        color: "#F09E0D"
    },
    positive: {
        icon: smileO,
        color: "#154A01"
    },
    negative: {
        icon:frownO,
        color: "#10210E"
    } 
}