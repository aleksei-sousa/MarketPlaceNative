import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  Container,
  DescriptionContainer,
  Division,
  Input,
  InputContainer,
} from "@/src/Styles/AddProduct.styled";
import DefaultTitle from "@/src/components/common/DefaultTitle";
import DropDownComponent from "@/src/components/common/DropDownComponent";
import DefaultButton from "@/src/components/common/DefaultButton";
import UploadInput from "@/src/components/AddProduct/UploadInput";
import addressService from "@/src/services/adressService";
import productService from "@/src/services/productService";

const Category = [
  { value: "Eletrônicos" },
  { value: "Eletrodomésticos" },
  { value: "Moda e Acessórios" },
  { value: "Pets" },
  { value: "Brinquedos e Jogos" },
  { value: "Casa e Jardim" },
  { value: "Esporte e Lazer" },
  { value: "Automóveis e Veículos" },
];

export default function AddProduct() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [addressId, setAddressId] = useState("");
  const [address, setAddress] = useState([]);
  const [images, setImages] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    category: "",
    addressId: "",
  });

  const handleGetAddress = async () => {
    const res = await addressService.getAddress();

    if (res.status === 401) return;

    const value = res.data.map((address) => ({
      key: address._id,
      value: `${address.street} Nº ${address.number}`,
    }));

    setAddress(value);
  };

  const handleSubmitProduct = async (post) => {
    if (
      !fields.name ||
      !fields.price ||
      !fields.description ||
      !category ||
      !addressId ||
      images.length === 0
    ) {
      Alert.alert("Um dos seus campos está vazio");
      return;
    }

    const params = {
      ...fields,
      images: images.map(({ uri }) => ({
        filename: uri.substring(uri.lastIndexOf("/") + 1),
        uri,
        url: "",
        type: `image/${uri.split(".").pop()}`,
      })),
      published: post,
    };

    const { status } = await productService.addProduct(params);

    if (status === 201) {
      Alert.alert("Seu produto foi cadastrado com sucesso!");
      router.push("/");
    }
  };

  useEffect(() => {
    setFields((prev) => ({
      ...prev,
      images,
      category,
      addressId,
    }));
  }, [images, category, addressId]);

  useEffect(() => {
    handleGetAddress();
  }, []);

  return (
    <Container contentContainerStyle={{ paddingBottom: 120 }}>
      <DefaultTitle title="CADASTRO DO ANÚNCIO" fontSize={20} />

      <InputContainer>
        <Input
          placeholder="Título"
          value={fields.name}
          onChangeText={(val) => setFields((prev) => ({ ...prev, name: val }))}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Preço"
          keyboardType="numeric"
          value={fields.price}
          onChangeText={(val) => setFields((prev) => ({ ...prev, price: val }))}
        />
      </InputContainer>

      <DescriptionContainer>
        <Input
          placeholder="Descrição"
          value={fields.description}
          onChangeText={(val) =>
            setFields((prev) => ({ ...prev, description: val }))
          }
        />
      </DescriptionContainer>

      <UploadInput images={images} setImages={setImages} />

      <DropDownComponent
        data={Category}
        placeholder="Selecione a categoria"
        setSelected={setCategory}
        saveMethod="value"
      />

      <DropDownComponent
        data={address}
        placeholder="Selecione um endereço"
        setSelected={setAddressId}
        saveMethod="key"
      />

      <DefaultButton
        buttonText="CADASTRAR E PUBLICAR"
        buttonType="primary"
        buttonHandle={() => handleSubmitProduct("true")}
        marginVertical={20}
      />

      <Division>Ou</Division>

      <DefaultButton
        buttonText="SALVAR COMO RASCUNHO"
        buttonType="secondary"
        buttonHandle={() => handleSubmitProduct("false")}
        marginVertical={20}
      />
    </Container>
  );
}