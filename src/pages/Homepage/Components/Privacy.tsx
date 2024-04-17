import { PageModal } from "../../../components/Modal";

type ModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};
const Privacy: React.FC<ModalProps> = ({ openModal, setOpenModal }) => {
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
          <h1 className=" font-[gilroy-bold] text-xl mb-3">Privacy Policy</h1>
          <ol
            type="a"
            className=" font-[gilroy-medium] text-base flex flex-col gap-2 text-justify"
          >
            <li>
              <h1 className=" font-bold">Information Collection: </h1>LangEasy
              collects personal information from users when they register an
              account, submit contributions, or interact with the Portal. This
              information may include but is not limited to name, email address,
              and user preferences.
            </li>
            <li>
              <h1 className=" font-bold">Use of Information: </h1>Personal
              information collected by LangEasy is used to provide and improve
              the services offered on the Portal. This may include processing
              contributions, personalizing user experience, and communicating
              with users.
            </li>
            <li>
              <h1 className=" font-bold">Data Sharing: </h1>LangEasy may share
              personal information with trusted third-party service providers
              for the purpose of providing services on our behalf. We may also
              share information in response to legal processes or when required
              by law.
            </li>
            <li>
              <h1 className=" font-bold">Data Security: </h1>LangEasy takes
              reasonable measures to protect the security of personal
              information collected through the Portal. However, no method of
              transmission over the internet or electronic storage is 100%
              secure.
            </li>
            <li>
              <h1 className=" font-bold">Access and Control: </h1>Users may
              access, update, or delete their personal information by accessing
              their account settings on the Portal. Users may also contact
              LangEasy to request assistance with managing their information.
            </li>
            <li>
              <h1 className=" font-bold">Children's Privacy: </h1>The Portal is
              not intended for use by children under the age of 13. LangEasy
              does not knowingly collect personal information from children
              under 13 years of age.
            </li>
            <li>
              <h1 className=" font-bold">Changes to Privacy Policy: </h1>
              LangEasy reserves the right to update or modify this Privacy
              Policy at any time. Users will be notified of any changes to the
              Privacy Policy via email or by posting a notice on the Portal.
            </li>
            <li>
              <h1 className=" font-bold">Contact Information: </h1>If you have
              any questions or concerns regarding this Privacy Policy, please
              contact us at [Contact Email].
            </li>
          </ol>
        </div>
      </div>
    </PageModal>
  );
};

export default Privacy;
