import useAxios from 'axios-hooks';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useCreatePost from '../../apis/posts/createPost';
import CustomTextInput from '../../containers/customTextInput';
import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-crop-picker';

const AddPost = () => {
  const {createPostData, createPostError, createPostLoading, savePost} =
    useCreatePost();

  const [image, setImage] = useState<string>(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
  const formObj = useRef<
    | {
        title: string;
        body: string;
        id: number;
        userId: number;
      }
    | any
  >({});

  const bs = React.createRef<any>();

  useEffect(() => {
    console.log('data ', createPostData);
    console.log('error', createPostError);
  }, [createPostData, createPostError]);

  const handleValueChanged = (value: string, key: string) => {
    formObj.current[key] = value;
  };

  const submitPost = () => {
    formObj.current.id = new Date().getTime();
    formObj.current.userId = 4;
    savePost({
      data: formObj.current,
    });
    SplashScreen.hide();
  };

  const pickPhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const pickPhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const handleClearImage = async () => {
    await setImage('');
  };

  return (
    <ScrollView style={{padding: 30}}>
      <Text>Create new post</Text>

      <View
        style={{
          alignItems: 'center',
          height: 300,
          width: 300,
          borderWidth: 5,
          borderRadius: 0,
          borderColor: 'grey',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: 200, width: 200, alignItems: 'center'}}
          source={{uri: image}}
        />
      </View>

      <View style={styles.btnsSection}>
        <TouchableOpacity onPress={pickPhotoFromCamera} style={styles.btn}>
          <Text style={styles.btnText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickPhotoFromLibrary} style={styles.btn}>
          <Text style={styles.btnText}>Add image from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity ref={bs} onPress={handleClearImage}>
          <Text>Clear image</Text>
        </TouchableOpacity>

        <CustomTextInput
          placeholder={'Title'}
          onchange={text => handleValueChanged(text, 'title')}
        />

        <CustomTextInput
          placeholder={'Body'}
          onchange={text => handleValueChanged(text, 'body')}
        />

        <TouchableOpacity style={styles.btn} onPress={submitPost}>
          <Text style={styles.btnText}>
            {!createPostLoading ? 'Create' : <ActivityIndicator />}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnsSection: {
    padding: 10,
    justifyContent: 'center',
  },
  btn: {
    padding: 25,
    justifyContent: 'center',
    display: 'flex',
    borderRadius: 10,
    borderStyle: 'dotted',
    borderWidth: 1,
    backgroundColor: '#eee',
  },
  btnText: {
    textAlign: 'center',
    alignItems: 'center',
  },
});
export default AddPost;
