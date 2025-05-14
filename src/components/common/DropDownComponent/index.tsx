import { ArrowIcon, DropDown, DropDownContainer } from "./styled";

const arrowIcon = require("../../../../assets/icons/arrow-down.png");

export default function DropDownComponent({ data, placeholder, setSelected, saveMethod }) {
  const noAddress = [{ value: "Sem endereços no momento!", disabled: true }];
  const checkedData = data && data.length > 0 ? data : noAddress;

  return (
    <DropDownContainer>
      <DropDown
        setSelected={setSelected}
        data={checkedData}
        placeholder={placeholder}
        save={saveMethod}
        search={false}
        arrowicon={<ArrowIcon source={arrowIcon} />}
      />
    </DropDownContainer>
  );
}
