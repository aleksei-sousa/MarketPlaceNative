import { Container, InputContainer, Input, Logo, Search } from './styled.js'
import { View, Text } from 'react-native';

const logo = require('../../../assets/images/logo-dino-p.png')
const search = require('../../../assets/images/search.png')

function Header () {
    return ( 
        <Container>
            <Logo source={logo}/>
            <InputContainer>
                <Input />
                <Search source={search}/>
            </InputContainer>
        </Container>
     );
}

export default Header ;