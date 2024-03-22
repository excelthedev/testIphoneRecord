import { pageRoutes } from "./utils/pageRoutes";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { ConfigProvider, App } from "antd";
import { getThemeConfig } from "./utils/theme.config";
import Loading from "./pages/Homepage/Components/Loading";

function AppEntry() {
  return (
    <App>
      <ConfigProvider theme={getThemeConfig()}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={pageRoutes} />
        </Suspense>
      </ConfigProvider>
    </App>
  );
}

export default AppEntry;
