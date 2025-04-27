import { Container, Icon, IconButton } from "./styled.js";
import { router } from "expo-router";
const home = require('@/assets/icons/home.png')
const chat = require('@/assets/icons/chat.png')
const add = require("@/assets/icons/add.png");
const categories = require("@/assets/icons/categories.png");
const profile = require("@/assets/icons/profile.png");


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
          true
          ?
          router.push("/")
            : router.push("/");
        }}>
        <Icon source={chat}/>
      </IconButton>

      <IconButton
        onPress={() => {
          //!token
          true
          ?
          router.push("/")
            : router.push("/");
        }}>
        <Icon source={add}/>
      </IconButton>
      <IconButton
        onPress={() => {
            router.push("/Register"); // Rota baseada no arquivo app/home.js ou app/home/index.js
        }}>
        <Icon source={categories}/>
      </IconButton>
      
      <IconButton
        onPress={() => {
          //!token
          console.log('33')
          true
          ?
          router.push("/")
            : router.push("/");
        }}>
        <Icon source={profile}/>
      </IconButton>

        
    </Container>
        

     );
}

export default Navbar ;