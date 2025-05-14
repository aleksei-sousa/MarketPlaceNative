import { Container, Icon, IconButton } from "./styled.js";
import { router } from "expo-router";
const home = require('@/assets/icons/home.png')
const chat = require('@/assets/icons/chat.png')
const add = require("@/assets/icons/add.png");
const categories = require("@/assets/icons/categories.png");
const profile = require("@/assets/icons/profile.png");
import useAuth from "../../../hook/useAuth";


function Navbar () {
  const { token } = useAuth();
  console.log(token)
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
          !token
            ?  router.push("/Login")
            : router.push("/AllChats");
        }}>
        <Icon source={chat}/>
      </IconButton>

      <IconButton
        onPress={() => {
          !token
          ?
          router.push("/Login")
            : router.push("/AddProduct");
        }}>
        <Icon source={add}/>
      </IconButton>
      <IconButton
        onPress={() => {
            router.push("/Categories");
        }}>
        <Icon source={categories}/>
      </IconButton>
      
      <IconButton
        onPress={() => {
          !token
          ?
          router.push("/Register")
            : router.push("/UserProfile");
        }}>
        <Icon source={profile}/>
      </IconButton>

        
    </Container>
        

     );
}

export default Navbar ;