import React, {useState} from 'react';
import {Colors, Image, Text, View, TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {Check, UploadImage} from '../../assets/svgs';
import {launchImageLibrary} from 'react-native-image-picker';

const width = Dimensions.get('window').width;

const UploadImages = props => {
  const [selectedImage, setSelectedImage] = useState(0);
  const {
    route: {
      params: {onChange, images},
    },
  } = props;
  const [updatedImages, setUpdatedImages] = useState(images);

  const options = {
    title: 'Get Image from Gallery',
    includeBase64: true,
    quality: 0.1,
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.mainImage}
        onPress={() => {
          launchImageLibrary(options, response => {
            if (response.didCancel) {
              onChange(JSON.stringify(updatedImages));
              setUpdatedImages(updatedImages);
            } else {
              updatedImages[selectedImage] = response?.base64;
              onChange(JSON.stringify(updatedImages));
              setUpdatedImages(updatedImages);
              setSelectedImage(10);
              setSelectedImage(selectedImage);
            }
          });
        }}>
        {images[selectedImage] ? (
          <View>
            <ImageBackground
              source={{uri: `data:image/png;base64,${images[selectedImage]}`}}
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: 400,
                borderRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  opacity: 0.5,
                }}
                onPress={() => {
                  launchImageLibrary(options, response => {
                    if (response.didCancel) {
                      onChange(JSON.stringify(updatedImages));
                      setUpdatedImages(updatedImages);
                    } else {
                      updatedImages[selectedImage] = response?.base64;
                      onChange(JSON.stringify(updatedImages));
                      setUpdatedImages(updatedImages);
                    }
                  });
                }}>
                <UploadImage />
              </View>
            </ImageBackground>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: '100%',
              height: 400,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <UploadImage />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View style={styles.container}>
        {updatedImages.map((el, index) => {
          if (!el) {
            return (
              <TouchableOpacity
                style={styles.uploadImage}
                onPress={() => {
                  launchImageLibrary(options, response => {
                    if (response.didCancel) {
                      onChange(JSON.stringify(updatedImages));
                      setUpdatedImages(updatedImages);
                    } else {
                      updatedImages[index] = response?.base64;
                      onChange(JSON.stringify(updatedImages));
                      setUpdatedImages(updatedImages);
                      setSelectedImage(index);
                    }
                  });
                }}>
                <UploadImage />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={styles.uploadImage}
              onPress={() => setSelectedImage(index)}>
              <Image
                source={{uri: `data:image/png;base64,${el}`}}
                resizeMode={'cover'}
                style={{
                  width: 63,
                  height: 63,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.PrimaryColor,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          backgroundColor={Colors.PrimaryColor}
          style={styles.button}
          margin-10
          onPress={() => {
            onChange(JSON.stringify(updatedImages));
            props.navigation.goBack();
          }}>
          <Check />
          <Text center color={Colors.white} style={styles.buttonStyle}>
            Done{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  uploadImage: {
    width: width / 4,
    paddingVertical: 10,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    height: 50,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mainContainer: {
    // flex: 1,
    // alignItems: 'center',
  },
});

export default UploadImages;
