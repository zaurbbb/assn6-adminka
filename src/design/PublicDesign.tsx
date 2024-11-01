import {
  Flex,
  Layout,
} from 'antd';
import { CSSProperties } from "react";

const { Content } = Layout;

function Design({ children }) {
  const flexStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const layoutStyle: CSSProperties = {
    ...flexStyle,
    // backgroundColor: '#0958d9',
  }
  const contentStyle: CSSProperties = {
    ...flexStyle,

    width: "80%",
    height: "100vh",


    textAlign: 'center',
    color: '#fff',
  };

  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
          {children}
      </Content>
    </Layout>
  );
}

export default Design;
