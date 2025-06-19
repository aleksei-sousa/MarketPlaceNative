import React, { useState } from "react";
import { DescriptionTxt, ReadMoreLess } from "./styled";

const Description = ({ desc }) => {

  const [readMoreText, setReadMoreText] = useState("Ler mais");
  const [numberOfLines, setNumberOfLines] = useState(3);

  const handleReadMore = () => {
    if (numberOfLines !== 3) {
      setReadMoreText("Ler mais");
      setNumberOfLines(3);
    } else {
      setReadMoreText("Ler menos");
      setNumberOfLines(1000);
    }
  };
console.log(desc)
  return (
    <>
      <DescriptionTxt numberOfLines={numberOfLines}>{desc}</DescriptionTxt>

      {desc?.length >= 115 && (
        <ReadMoreLess onPress={handleReadMore}>
          {readMoreText}
        </ReadMoreLess>
      )}
    </>
  );
};

export default Description;
