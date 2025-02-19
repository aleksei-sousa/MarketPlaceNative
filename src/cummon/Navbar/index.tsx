import { Container, Icon, IconButton } from "./styled.js";
import { router } from "expo-router";
import home from "../../../assets/icons/home.png"


function Navbar () {
    return ( 
        
    <Container>
      <IconButton
        onPress={() => {
            router.push("/"); // Rota baseada no arquivo app/home.js ou app/home/index.js
        }}>
        <Icon source={home}/>
      </IconButton>

      <IconButton
        onPress={() => {
          //!token
          {true}
          ?
          navigation.navigate("Login")
            : navigation.navigate("AllChats");
        }}
      >
        
    </Container>
        

     );
}

export default Navbar ;