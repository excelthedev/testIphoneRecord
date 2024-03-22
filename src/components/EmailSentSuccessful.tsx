import { useNavigate } from "react-router-dom";
import LangEasyLogo from "../assets/Logos/LangeasyLogo/LangEasyLogo";
import ArrowIcon from "../assets/icons/ArrowIcon";
import { ROUTES } from "../utils/routes";
import { PageModal } from "./Modal";
import React from "react";

type ModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  message?: string;
};

const EmailSentSuccessful: React.FC<ModalProps> = ({
  openModal,
  setOpenModal,
  message = "An email has been sent to your email address",
}) => {
  const navigate = useNavigate();
  return (
    <PageModal
      openModal={openModal}
      handleCancel={() => {
        setOpenModal(!openModal);
      }}
      modalFooter={null}
      closable={false}
      maskClosable={false}
      modalWith="60rem"
    >
      <div className="min-h-[25rem] grid grid-rows-[1rem_1fr]">
        <ArrowIcon
          className="cursor-pointer "
          onClick={() => {
            navigate(ROUTES.HOMEPAGE);
          }}
        />
        <div className="flex flex-col items-center justify-center ">
          <LangEasyLogo />
          <p className=" font-[gilroy-medium] text-[1.5rem] text-[#333333]">
            Email Sent
          </p>
          <p className=" font-[gilroy-medium] text-lg text-[#333333] mt-5">
            {message}
          </p>
        </div>
      </div>
    </PageModal>
  );
};

export default EmailSentSuccessful;
