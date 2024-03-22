import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Button from "../../../components/Button";
import { setAllAppState } from "../../../store/slice/app-slice";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import RefreshIcon from "../../../assets/icons/RefreshIcon";
import BulbIcon from "../../../assets/icons/BulbIcon";
import Suggestion from "./Suggestion";
import {
  useGetDataQuery,
  useLazyGetDataOnClickQuery,
  userToken,
} from "../../../store/api/api.config";
import { endpoints } from "../../../store/api/endpoints";

type SingleWordResponse = {
  _id: string;
  EnglishWord: string;
  Yoruba: string;
  Igbo: string;
  Hausa: string;
  Definition: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
const WordBank = () => {
  const dispatch = useAppDispatch();
  const [openSuggestionModal, setOpenSuggestionModal] =
    useState<boolean>(false);

  const [loadingWordMeaning, setIsLoadingWordMeaning] =
    useState<boolean>(false);
  const [wordMeaning, setWordMeaning] = useState<SingleWordResponse>();

  const state = useAppSelector((state) => {
    return state.app;
  });

  const getWordMeaning = async (selectedWordData: wordApiResponse) => {
    if (!selectedWordData?._id) return;
    setIsLoadingWordMeaning(true);
    try {
      const request = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}word/singleword`,
        {
          body: JSON.stringify({ _id: selectedWordData._id }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken()}`,
          },
        }
      );
      const response = await request.json();
      setWordMeaning(response?.data?.word);
      if (!request.ok) {
        message.error("Unable to fetch Definition");
      }
      setIsLoadingWordMeaning(false);
    } catch (error) {
      setIsLoadingWordMeaning(false);
      message.error(`${error}`);
    }
  };
  const { data, isFetching, isLoading, isSuccess } = useGetDataQuery({
    getUrl: endpoints.getWords,
  });

  const [
    getDataOnClick,
    {
      data: refreshedData,
      isLoading: refreshedDataIsLoading,
      isFetching: refreshedDataIsFetching,
      isSuccess: refreshedDataIsSuccess,
    },
  ] = useLazyGetDataOnClickQuery();
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setAllAppState({
          ...state,
          loadedWords: data?.data?.words,
        })
      );
    }
    if (refreshedDataIsSuccess) {
      dispatch(
        setAllAppState({
          ...state,
          loadedWords: refreshedData?.data?.words,
        })
      );
    }
  }, [
    data?.data?.words,
    dispatch,
    isSuccess,
    refreshedData?.data?.words,
    refreshedDataIsSuccess,
  ]);

  type wordApiResponse = {
    _id?: string;
    EnglishWord?: string;
  };

  return (
    <Spin
      spinning={
        refreshedDataIsLoading ||
        loadingWordMeaning ||
        refreshedDataIsFetching ||
        isLoading ||
        isFetching
      }
    >
      {openSuggestionModal && (
        <Suggestion
          openModal={openSuggestionModal}
          setOpenModal={setOpenSuggestionModal}
        />
      )}
      <div className=" my-4 max-w-[40rem] mx-2 sm:mx-auto rounded-xl bg-[#D2D8DB59] px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-4 my-4">
          {/* {state.loadedWords?.length < 1 && <p>No words yet!</p>} */}
          {state.loadedWords &&
            state.loadedWords?.map((word: wordApiResponse, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    dispatch(
                      setAllAppState({
                        ...state,
                        selectedWord: word?.EnglishWord,
                        request: {
                          ...state.request,
                          selectedWord: word?._id,
                        },
                      })
                    );
                    getWordMeaning(word);
                  }}
                  className={
                    state.selectedWord === word?.EnglishWord
                      ? " bg-[#0A3546] text-[#F7F8FA]"
                      : ""
                  }
                >
                  {word?.EnglishWord}
                </Button>
              );
            })}
        </div>

        <div className="">
          <div className="flex items-center justify-center gap-3 mt-16">
            <Button
              onClick={async () => {
                await getDataOnClick({
                  getUrl: endpoints.getWords,
                });
              }}
              className="m-auto !bg-[#F7F8FA] !text-[#19213D] flex items-center gap-2 font-[gilroy-medium] font-normal  text-sm sm:text-base !border-0 !p-2"
            >
              Refresh words
              <RefreshIcon />
            </Button>
            <Button
              onClick={() => {
                setOpenSuggestionModal(true);
              }}
              className="m-auto !bg-[#F7F8FA] !text-[#19213D] flex items-center gap-2 font-[gilroy-medium] font-normal text-sm sm:text-base !border-0 !p-2"
            >
              Suggest translation
              <BulbIcon />
            </Button>
          </div>

          <br />
          {wordMeaning?.Definition && (
            <div className="p-4 m-4 text-center bg-[#D2D8DBa6] rounded-2xl">
              <p className="text-[#3E5967] text-2xl font-bold text-center font-[gilroy-bold]">
                {state.selectedLanguage?.toLowerCase() === "hausa" &&
                  wordMeaning?.Hausa?.toUpperCase()}
                {state.selectedLanguage?.toLowerCase() === "yoruba" &&
                  wordMeaning?.Yoruba?.toUpperCase()}
                {state.selectedLanguage?.toLowerCase() === "igbo" &&
                  wordMeaning?.Igbo?.toUpperCase()}
                {!state.selectedLanguage && state.selectedWord}
              </p>
              <p className="font-[gilroy-medium] font-normal text-[#5F6477]">
                Definition of{" "}
                <span className="font-[gilroy-bold] font-semibold">
                  {state.selectedWord}
                </span>
              </p>

              <p className="text-[#5F6477] font-normal font-[gilroy-medium]">
                {wordMeaning?.Definition}
              </p>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default WordBank;
