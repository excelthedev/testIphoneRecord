import { Button, Form, FormInstance } from "antd";
import React from "react";
const SubmitButton = ({
  form,
  name,
  onClick,
  htmlType,
  block,
  loading,
  icon,
}: {
  form?: FormInstance;
  name: string | React.ReactNode;
  htmlType: "button" | "submit" | "reset" | undefined;
  block: boolean;
  onClick?: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
}) => {
  const [submittable, setSubmittable] = React.useState(false);
  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form?.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);
  return (
    <Button
      type="primary"
      htmlType={htmlType}
      disabled={!submittable && (form ? true : false)}
      className="bg-[#3483A7] border-[#3483A7] gap-3 disabled:bg-[#a3dff7] shadow-none disabled:border-[transparent] disabled:text-[#FFFFFF!important] disabled:hover:scale-100 disabled:hover:border-[#3483A7] disabled:hover:bg-[#a3dff7!important] disabled:hover:text-[#FFFFFF!important] text-[#FFFFFF!important]
          transition-all flex items-center justify-center py-6 font-[satoshi-medium]"
      block={block}
      onClick={onClick}
      loading={loading}
    >
      {name} {icon}
    </Button>
  );
};
export default SubmitButton;
