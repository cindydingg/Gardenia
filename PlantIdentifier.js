import {
    ScrollView, Text, View, Button, TextInput, TouchableOpacity, Pressable, Image,
  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function JournalPage(){
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewImage, setViewImage] = useState(false);

    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const getFilenameFromUri = (uri) => {
    if (uri) {
      const uriParts = uri.split('/');
      return uriParts[uriParts.length - 1];
    }
    return '';
  };

  const handleFilenamePress = () => {
    setViewImage(!viewImage);
  };

  return(
    <View>
          <TouchableOpacity
            style={{
              minWidth: '80%', minHeight: 40, borderRadius: 2, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', marginTop: 10,
            }}
            onPress={pickImage}
          >
            <Text>+ add attachment</Text>
          </TouchableOpacity>
          {selectedImage !== '' ? (
            <>
              <TouchableOpacity onPress={handleFilenamePress}>
                <Text>{getFilenameFromUri(selectedImage)}</Text>
              </TouchableOpacity>
              {viewImage && (
                <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
              )}
            </>
          ) : null}
    </View>
  )
}