import {useEffect, useState} from "react";
import { Container, FeedbackText } from "@/src/Styles/feedback.styled";
import DefaultTitle from "@/src/components/common/DefaultTitle";
import ProfileInfo from "@/src/components/common/ProfileInfo";
import NavBar from "@/src/components/common/NavBar";
import { AirbnbRating } from "react-native-ratings";
import DefaultButton from "@/src/components/common/DefaultButton";
import profileService from "@/src/services/profileService";

const Feedback = () => {

const [userInfo, setUserInfo] = useState(null);

  const handleUserInfos = async () => {
    const { data } = await profileService.getUserProfile();
    console.log(data)
    setUserInfo(data);
  };

  useEffect(() => {
    handleUserInfos();
  }, []);

  return (
    <Container>
      <DefaultTitle title="AVALIAR" fontSize={20} />

      <ProfileInfo userInfo={userInfo} />

      <FeedbackText>
        Dê uma nota de 1 a 5, sendo{"\n"}1 estrela sendo ruim e 5 excelente
      </FeedbackText>

      <AirbnbRating
        selectedColor="#5F96ED"
        showRating={false}
        size={40}
        defaultRating={0}
      />

      <DefaultButton
        buttonText={"ENVIAR AVALIAÇÃO"}
        buttonType={"primary"}
        marginVertical={80}
        buttonHandle={() => {}}
      />

      <NavBar />
    </Container>
  );
};

export default Feedback;
