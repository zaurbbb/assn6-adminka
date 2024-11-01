import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  notification,
} from 'antd';
import React from 'react';
import {
  API,
  errorAnswer,
  responseAnswer,
} from "../../api/index";
import { useIsAuthStore } from "../../zustand/useIsAuth";

const LoginModule: React.FC = () => {
  const [ api, contextHolder ] = notification.useNotification();
  const { changeIsAuth } = useIsAuthStore();
  const onFinish = async (values: any) =>
    API.post("/auth/login/", values)
      .then((response) => {
        console.log("response: ", response);
        responseAnswer(response, api);
        localStorage.setItem("accessToken", response.data.access_token);
        changeIsAuth();
      })
      .catch((error) => errorAnswer(error));

  return (
    <Card title={"Admin Panel"}>
      {contextHolder}
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[ { required: true, message: 'Введите почту' } ]}
        >
          <Input
            type="email"
            prefix={<UserOutlined />}
            placeholder="Почта"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[ { required: true, message: 'Введите пароль!' } ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginModule;
