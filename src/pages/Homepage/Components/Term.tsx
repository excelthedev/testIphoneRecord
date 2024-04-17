import { PageModal } from "../../../components/Modal";

type ModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};
const Term: React.FC<ModalProps> = ({ openModal, setOpenModal }) => {
  return (
    <PageModal
      openModal={openModal}
      handleCancel={() => {
        setOpenModal(!openModal);
      }}
      modalFooter={null}
      closable={true}
      modalWith="48rem"
    >
      <div className="flex flex-col justify-center px-3 py-8 gap-14 ">
        <div>
          <h1 className=" font-[gilroy-bold] text-xl mb-3">Terms of Use</h1>
          <ol
            type="1"
            className=" text-base font-[gilroy-medium] flex flex-col gap-2 text-justify "
          >
            <li>
              <h1 className=" font-bold">Acceptance of Terms:</h1>By accessing
              or using the Word & Audio Capture Portal for LLM Training
              (hereafter referred to as "the Portal"), you agree to be bound by
              these Terms of Use. If you do not agree to these terms, please
              refrain from accessing or using the Portal.
            </li>
            <li>
              <h1 className=" font-bold">User Conduct: </h1>Users of the Portal
              agree to use the platform for lawful purposes only. Users shall
              not engage in any conduct that violates applicable laws or
              regulations or infringes upon the rights of others.
            </li>
            <li>
              <h1 className=" font-bold">Intellectual Property: </h1>All
              content, including but not limited to text, images, audio
              recordings, and software, provided on the Portal is the property
              of [Company Name] or its licensors and is protected by
              intellectual property laws. Users may not use, reproduce, or
              distribute any content from the Portal without prior
              authorization.
            </li>
            <li>
              <h1 className=" font-bold">Privacy: </h1>[Company Name] respects
              the privacy of its users. Please refer to our Privacy Policy for
              information on how we collect, use, and disclose personal
              information.
            </li>
            <li>
              <h1 className=" font-bold">Limitation of Liability: </h1>LangEasy
              shall not be liable for any direct, indirect, incidental, special,
              or consequential damages arising out of or in any way connected
              with the use of the Portal or the inability to use the Portal.
            </li>
            <li>
              <h1 className=" font-bold">Modification of Terms: </h1>LangEasy
              reserves the right to modify these Terms of Use at any time
              without prior notice. Users are responsible for regularly
              reviewing these terms to stay informed of any changes.
            </li>
            <li>
              <h1 className=" font-bold">Governing Law: </h1>These Terms of Use
              shall be governed by and construed in accordance with the laws of
              [Jurisdiction], without regard to its conflict of law provisions
            </li>
            <li>
              <h1 className=" font-bold">Contact Information:</h1> If you have
              any questions or concerns regarding these Terms of Use, please
              contact us at [Contact Email].
            </li>
          </ol>
        </div>
      </div>
    </PageModal>
  );
};

export default Term;
