import Header from "@/src/components/common/Header";
import { Container } from '@/src/Styles/Home.styled'
import Navbar from "@/src/components/common/Navbar";

function Index () {
    return ( 
        <Container>
            <Header/>
            <Navbar/>
        </Container>
     );
}

export default Index ;