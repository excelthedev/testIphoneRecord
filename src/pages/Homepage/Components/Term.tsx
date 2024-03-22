import { PageModal } from "../../../components/Modal";

type ModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};
const Term: React.FC<ModalProps> = ({
  openModal, setOpenModal,
    
}) => {
    
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
              Acceptance of Terms: By accessing or using the Word & Audio
              Capture Portal for LLM Training (hereafter referred to as "the
              Portal"), you agree to be bound by these Terms of Use. If you do
              not agree to these terms, please refrain from accessing or using
              the Portal.
            </li>
            <li>
              User Conduct: Users of the Portal agree to use the platform for
              lawful purposes only. Users shall not engage in any conduct that
              violates applicable laws or regulations or infringes upon the
              rights of others.
            </li>
            <li>
              Intellectual Property: All content, including but not limited to
              text, images, audio recordings, and software, provided on the
              Portal is the property of [Company Name] or its licensors and is
              protected by intellectual property laws. Users may not use,
              reproduce, or distribute any content from the Portal without prior
              authorization.
            </li>
            <li>
              Privacy: [Company Name] respects the privacy of its users. Please
              refer to our Privacy Policy for information on how we collect,
              use, and disclose personal information.
            </li>
            <li>
              Limitation of Liability: LangEasy shall not be liable for any
              direct, indirect, incidental, special, or consequential damages
              arising out of or in any way connected with the use of the Portal
              or the inability to use the Portal.
            </li>
            <li>
              Modification of Terms: LangEasy reserves the right to modify these
              Terms of Use at any time without prior notice. Users are
              responsible for regularly reviewing these terms to stay informed
              of any changes.
            </li>
            <li>
              Governing Law: These Terms of Use shall be governed by and
              construed in accordance with the laws of [Jurisdiction], without
              regard to its conflict of law provisions
            </li>
            <li>
              Contact Information: If you have any questions or concerns
              regarding these Terms of Use, please contact us at [Contact
              Email].
            </li>
          </ol>
        </div>

        <div>
          <h1 className=" font-[gilroy-bold] text-xl mb-3">Privacy Policy</h1>
          <ol
            type="a"
            className=" font-[gilroy-medium] text-base flex flex-col gap-2 text-justify"
          >
            <li>
              Information Collection: LangEasy collects personal information
              from users when they register an account, submit contributions, or
              interact with the Portal. This information may include but is not
              limited to name, email address, and user preferences.
            </li>
            <li>
              Use of Information: Personal information collected by LangEasy is
              used to provide and improve the services offered on the Portal.
              This may include processing contributions, personalizing user
              experience, and communicating with users.
            </li>
            <li>
              Data Sharing: LangEasy may share personal information with trusted
              third-party service providers for the purpose of providing
              services on our behalf. We may also share information in response
              to legal processes or when required by law.
            </li>
            <li>
              Data Security: LangEasy takes reasonable measures to protect the
              security of personal information collected through the Portal.
              However, no method of transmission over the internet or electronic
              storage is 100% secure.
            </li>
            <li>
              Access and Control: Users may access, update, or delete their
              personal information by accessing their account settings on the
              Portal. Users may also contact LangEasy to request assistance with
              managing their information.
            </li>
            <li>
              Children's Privacy: The Portal is not intended for use by children
              under the age of 13. LangEasy does not knowingly collect personal
              information from children under 13 years of age.
            </li>
            <li>
              Changes to Privacy Policy: LangEasy reserves the right to update
              or modify this Privacy Policy at any time. Users will be notified
              of any changes to the Privacy Policy via email or by posting a
              notice on the Portal.
            </li>
            <li>
              Contact Information: If you have any questions or concerns
              regarding this Privacy Policy, please contact us at [Contact
              Email].
            </li>
          </ol>
        </div>
      </div>
    </PageModal>
  );
}

export default Term