import { Container, Icon, Image, ImageContainer, Title } from "./styled.js";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const uploadIcon = require("../../../../assets/icons/arrow-right.png");

export default function UploadInput({ images, setImages }) {

  const handlePickUpImage = async () => {
    console.log('gg')
    //let result = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // mediaTypes: [ImagePicker.MediaType.Image],


      // allowsMultipleSelection: true,
      // selectionLimit: 6,
      // aspect: [4, 3],
      // quality: 1,
          let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });


    //});

    if (result.assets) {
      const selectedImages = result.assets.slice(0, 6);

      if (result.assets.length > 6) {
        Alert.alert("Removemos as imagens adicionais. Limite de 6 imagens.");
      }
      console.log(selectedImages)
      setImages(selectedImages);
    } else {
      Alert.alert("Você não selecionou imagens");
    }
  };

  return (
    <>
      <Container onPress={handlePickUpImage}>
        <Title>Selecione até 6 imagens.</Title>
        <Icon source={uploadIcon} />
      </Container>
      <ImageContainer>
        {images &&
          images.map((image) => (
            <Image key={image.uri} source={{ uri: image.uri }} />
          ))}
      </ImageContainer>
    </>
  );
}
