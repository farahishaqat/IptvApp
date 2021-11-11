import { openSettings, Permission, request, RESULTS } from "react-native-permissions";

const requestPermission = async (permissionType: Permission, keepAsking?: boolean) => {
    const result = await request(permissionType);
    console.log(result);
    switch (result) {
        case RESULTS.GRANTED:
            return true;
        case RESULTS.DENIED:
            if (!keepAsking) {
                return false;
            }
            requestPermission(permissionType, keepAsking);
            break;
        case RESULTS.BLOCKED:
            openSettings();
            return false;
    }
}

export default requestPermission;