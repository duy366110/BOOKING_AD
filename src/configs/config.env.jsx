import ENVIRONMENT from "../environment";

const Config = {
    DEV: {
        URL: ENVIRONMENT.DEV.URL
    },
    PRO: {
        URL: ENVIRONMENT.PRO.URL
    }
}

export default Config[ENVIRONMENT.MODEL];