import { ThemeConfig } from "antd";

export const getThemeConfig = (): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#096A95",
    },
    components: {
      Select: {
        colorBgContainer: "transparent",
        controlHeight: 50,
      },
    },
  };
};
