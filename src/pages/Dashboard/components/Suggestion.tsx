import { PageModal } from "../../../components/Modal";
import suggest from "../../../assets/Images/Suggest.png";
import Button from "../../../components/Button";
import Success from "../../../assets/Images/success.png";
import { useEffect, useState } from "react";
import useFieldRequest from "../../../hooks/useFieldRequest";
import { useAppSelector } from "../../../store/hooks";
import { usePostDataMutation } from "../../../store";
import { endpoints } from "../../../store/api/endpoints";
import { RESPONSE_CODE } from "../../../utils/helpers";
import { useToast } from "../../../hooks/useToast";
import { Spin } from "antd";

type ModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

const Suggestion: React.FC<ModalProps> = ({ openModal, setOpenModal }) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const { setRequest } = useFieldRequest();
  const [saveSuggestHandler, result] = usePostDataMutation();
  const state = useAppSelector((state) => {
    return state.app;
  });
  const { error } = useToast();
  useEffect(() => {
    if ("data" in result) {
      const apiResponse = result.data;
      if (apiResponse.responseCode === RESPONSE_CODE.successful) {
        setOpenSuccessModal(true);
      } else {
        error(apiResponse.responseMessage);
      }
    }
    if (result.isError) {
      error("Something went Wrong!");
    }
  }, [error, result]);

  return (
    <>
      <PageModal
        openModal={openModal}
        handleCancel={() => {
          setOpenModal(!openModal);
        }}
        modalFooter={null}
        closable={true}
        modalWith="45rem"
      >
       <Spin spinning={result.isLoading}>
       <div className="flex flex-col items-center justify-center gap-4">
          <div>
            <img src={suggest} alt="" />
          </div>
          <div className="flex items-center justify-between sm:w-[55%] mt-[3rem] w-full ">
            <p className=" font-[gilroy-medium] font-normal text-sm text-[#333333] ">
              Suggest your translation
            </p>
            {!state.selectedWord ? (
              <p className=" px-[10px] whitespace-nowrap bg-[#fc4242] text-[#FFFFFF] rounded-[3px]">
                Please select a word
              </p>
            ) : (
              <p className=" px-[10px] whitespace-nowrap bg-[#0A3546] text-[#FFFFFF] rounded-[3px]">
                {state.selectedWord}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center ">
            <textarea
              name=""
              id=""
              rows={5}
              className="border-[1px] border-[#E3E6EA] rounded-lg outline-none p-3 resize-none mx-auto w-96 placeholder:text-sm placeholder:text-[#666666] placeholder:font-[gilroy regular]
              "
              placeholder="Write your translation"
              onChange={(e) => {
                setRequest("userTranslation", e.target.value);
              }}
            />
          </div>
          <div className="flex items-end justify-center sm:justify-end w-full sm:w-[55%] mt-8">
            {!state.selectedLanguage ? (
              <p className=" px-[10px] whitespace-nowrap bg-[#fc4242] text-[#FFFFFF] rounded-[3px] mt-[-4rem] py-2 ">
                
                Please select a language
              </p>
            ) : (
              <Button
                className=" whitespace-nowrap bg-[#096A95] disabled:bg-[#5C9CB9] text-[#FFFFFF] !py-2 !px-4"
                onClick={async () => {
                  await saveSuggestHandler({
                    ...state,
                    postUrl: endpoints.suggestWord,
                    request: {
                      userId: state.request?.userId,
                      wordId: state.request?.selectedWord,
                      userTranslation: state.request?.userTranslation,
                      wordLanguage: state.selectedLanguage,
                    },
                  });
                }}
                disabled={!state.request?.userTranslation}
              >
                Send
              </Button>
            )}
          </div>
        </div>
       </Spin>
      </PageModal>
      <PageModal
        openModal={openSuccessModal}
        handleCancel={() => {
          setOpenSuccessModal(!openSuccessModal);
        }}
        modalFooter={null}
        closable={true}
        modalWith="45rem"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div>
            <img src={Success} alt="" />
          </div>
          <div className="mt-[3rem] ">
            <p className=" font-[gilroy-medium] font-semibold text-base text-[#19213D] text-justify">
              Suggestion sent, thank you!
            </p>
            <p className=" text-[#19213D]  font-[gilroy-medium] font-normal text-sm">
              Your suggestions are used to update our <br /> word bank, we
              appreciate your input.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              className="bg-[#096A95] text-[#FFFFFF] !px-4"
              onClick={() => {
                setOpenModal(!openModal);
                setOpenSuccessModal(!openSuccessModal);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </PageModal>
    </>
  );
};

export default Suggestion;
