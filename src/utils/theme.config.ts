import { ThemeConfig } from "antd";

export const getThemeConfig = (): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#096A95",
    },
    components: {
      Select: {
        colorBgContainer: "#F0F2F5",
        controlHeight: 50,
        
      },
    },
  };
};
