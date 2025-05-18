import React, { useEffect, useState } from "react";
import {
  Container,
  CreateAddBtn,
  CreateAddBtnTxt,
  ListHeight,
  NoAdd,
} from "@/src/Styles/alladress.styled";
import DefaultTitle from "@/src/components/common/DefaultTitle";
import NavBar from "@/src/components/common/NavBar";
import { FlatList } from "react-native";
import AddressCard from "@/src/components/common/AdressCard";
import { useRouter, useLocalSearchParams } from "expo-router";

import addressService from "@/src/services/adressService";

const AllAddress = () => {
  const router = useRouter();
  const { newAddress } = useLocalSearchParams();

  const [allAddress, setAllAddress] = useState([]);

  const handleNavAddAddress = () => {
    router.push("/AddAddress"); // ajuste o path conforme o seu projeto
  };

  const handleGetAddress = async () => {
    try {
      const res = await addressService.getAddress();
      setAllAddress(res.data);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    }
  };

  useEffect(() => {
    handleGetAddress();
  }, [newAddress]);

  const renderItem = ({ item }) => (
    <AddressCard item={item} address={allAddress} setAddress={setAllAddress} />
  );

  return (
    <>
      <Container>
        <DefaultTitle title="TODOS OS ENDEREÇOS" fontSize={18} />

        {allAddress.length <= 0 ? (
          <>
            <NoAdd>Você não tem endereços{"\n"}cadastrados no momento</NoAdd>
            <CreateAddBtn onPress={handleNavAddAddress}>
              <CreateAddBtnTxt>Criar Endereço</CreateAddBtnTxt>
            </CreateAddBtn>
          </>
        ) : (
          <>
            <ListHeight>
              <FlatList
                data={allAddress}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            </ListHeight>
            <CreateAddBtn onPress={handleNavAddAddress}>
              <CreateAddBtnTxt>Criar Endereço</CreateAddBtnTxt>
            </CreateAddBtn>
          </>
        )}
      </Container>
      <NavBar />
    </>
  );
};

export default AllAddress;
