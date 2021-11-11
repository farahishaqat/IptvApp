import { Platform } from "react-native";
import { PERMISSIONS } from 'react-native-permissions';

const CameraPermissions = {
    Camera: Platform.OS ===
        'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
}

const MicPermissions = {
    Microphone: Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE :
        PERMISSIONS.ANDROID.RECORD_AUDIO
}

export default {
    CAMERA: CameraPermissions.Camera,
    MICROPHONE: MicPermissions.Microphone
}