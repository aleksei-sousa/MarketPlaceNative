import { useState } from "react";
import { AcceptTerms, CompanyLogo, Container, Title } from "@/src/Styles/Register.styled";
import BackIcon from "@/src/components/common/BackIcon";
import Form from "@/src/components/register/form";
import DefaultButton from "@/src/components/common/DefaultButton";
import { Alert } from "react-native";
import { router } from "expo-router";
const companyLogo = require("@/assets/images/logo-obc.png");
import useAuth from "@/src/hook/useAuth";

function Register() {

  const { register } = useAuth();

    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
      });


      const handleRegister = async () => {
        if (fields.password.length < 4) {
          Alert.alert("Sua senha deve ter no mínimo 4 caracteres");
    
          return;
        } else if (fields.password !== fields.confirmPassword) {
          Alert.alert("Senha e confirmação diferentes!");
    
          return;
        } else if (
          !fields.name ||
          !fields.email ||
          !fields.phone ||
          !fields.password
        ) {
          Alert.alert("Preencha todos os campos!");
    
          return;
        }
    
        register(fields.name, fields.email, fields.password, fields.phone);
    
        Alert.alert("Registro feito com sucesso!");
      };

    return ( 
        <Container>
            <BackIcon marginLeft={20} />
            <Title>CRIAR UMA CONTA</Title>
            <Form fields={fields} setFields={setFields} />
            <DefaultButton
                buttonText="FAZER REGISTRO"
                buttonType="primary"
                marginVertical={30}
                buttonHandle={handleRegister}
            />
            <AcceptTerms>
                Ao fazer o registro aceito{"\n"}os termos de política de privacidade
            </AcceptTerms>
            <DefaultButton
                buttonText="FAZER LOGIN"
                buttonType="secondary"
                marginVertical={30}
                buttonHandle={() => {
                router.push("/Login");
        }}
            />
                <CompanyLogo source={companyLogo} />
        </Container>
     );
}

export default Register;