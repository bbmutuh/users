import {ICONS} from "../../../../constants/iconsList";
import Button from "../../../ui/Button";

const EditButton = ({ role, onClick }) => {
  return (
    <Button
      icon={ICONS.EDIT}
      size="small"
      bgColorHover={role === 'admin' ? "var(--green-0)" : "var(--green-2)"}
      bgColorActive={role === 'admin' ? "var(--green-1)" : "var(--green-1)"}
      iconColor={role === 'admin'
        ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(186deg) brightness(105%) contrast(101%)"
        : "invert(57%) sepia(25%) saturate(508%) hue-rotate(47deg) brightness(95%) contrast(88%)"
      }
      iconColorHover={"invert(100%) sepia(100%) saturate(0%) hue-rotate(186deg) brightness(105%) contrast(101%)"}
      onClick={onClick}
    />
  );
};

export default EditButton;
