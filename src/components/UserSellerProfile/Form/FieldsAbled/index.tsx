import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { InputContainer } from "../styled";
import { Input } from "./styled";
import DefaultButton from "@/src/components/common/DefaultButton";
import DropDownComponent from "@/src/components/common/DropDownComponent";
import addressService from "@/src/services/adressService";
import profileService from "@/src/services/profileService";
import Loader from "@/src/components/common/Loader";
import useAuth from "@/src/hook/useAuth";

const FieldsAbled = ({ userInfo }) => {
  const router = useRouter();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");

  const { logout } = useAuth();

  const handleSetInfos = async () => {
    try {
      const res = await addressService.getAddress();
      const value = res.data.map((address) => ({
        value: `${address.street} Nº ${address.number}`,
        disabled: true,
      }));

      setAddress(value);
      setFields({
        ...fields,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
      });
    } catch (err) {
      Alert.alert("Erro ao carregar endereços.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInfo = async () => {
    try {
      const res = await profileService.updateUserProfile(fields);

      if (res.status === 400) {
        Alert.alert("Esse email pertence a outra conta!");
        return;
      }

      if (fields.email !== userInfo.email) {
        logout();
      }

      router.replace("/(tabs)/home");
      Alert.alert("Informações atualizadas com sucesso!");
    } catch (err) {
      Alert.alert("Erro ao atualizar informações.");
    }
  };

  useEffect(() => {
    handleSetInfos();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <InputContainer>
        <Input
          value={fields.name}
          onChangeText={(val) => setFields({ ...fields, name: val })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          value={fields.email}
          onChangeText={(val) => setFields({ ...fields, email: val })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          value={fields.phone}
          onChangeText={(val) => setFields({ ...fields, phone: val })}
        />
      </InputContainer>
      <DropDownComponent
        data={address}
        placeholder="Seus endereços"
        setSelected={setSelected}
        saveMethod="value"
      />
      <InputContainer>
        <Input
          placeholder="Senha"
          placeholderTextColor="#C0C0C1"
          secureTextEntry
          onChangeText={(val) =>
            setFields({ ...fields, currentPassword: val })
          }
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Nova Senha"
          placeholderTextColor="#C0C0C1"
          secureTextEntry
          onChangeText={(val) => setFields({ ...fields, newPassword: val })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Confirmar Nova Senha"
          placeholderTextColor="#C0C0C1"
          secureTextEntry
          onChangeText={(val) =>
            setFields({ ...fields, confirmNewPassword: val })
          }
        />
      </InputContainer>

      <DefaultButton
        buttonText="Salvar Alterações"
        buttonHandle={handleUpdateInfo}
        buttonType="primary"
        marginVertical={10}
      />
    </>
  );
};

export default FieldsAbled;
