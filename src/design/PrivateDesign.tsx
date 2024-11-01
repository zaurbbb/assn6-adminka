import {
  AntDesignOutlined,
  BlockOutlined,
  BuildOutlined,
  DotChartOutlined,
  DropboxOutlined,
  EnvironmentOutlined,
  ForkOutlined,
  GiftOutlined,
  GlobalOutlined,
  HomeOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  ProductOutlined,
  PushpinOutlined,
  QuestionCircleOutlined,
  SendOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TeamOutlined,
  TruckOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Space,
  Typography,
} from 'antd';
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useIsAuthStore } from "../zustand/useIsAuth";

const { Content } = Layout;

const { Sider } = Layout;

function Design({ children }) {
  const { changeIsAuth } = useIsAuthStore();
  const layoutStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const contentStyle: CSSProperties = {
    height: "100vh",
    padding: "2rem",

    color: 'black',
  };
  const siderStyle: CSSProperties = {
    overflowY: "scroll",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    padding: "2rem 0.5rem",

    height: "100vh",

    background: "#fff",

    textAlign: 'center',
  };
  const menuStyle: CSSProperties = {
    height: "100%",

    borderRight: 0,

    textAlign: 'left',
  };
  const logoutIconStyle: CSSProperties = {
    color: "red",
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    changeIsAuth();
  };

  const siderItems = [
    {
      key: 'g1',
      label: 'Основное',
      type: 'group',
      children: [
        // {
        //   key: '1',
        //   label: <Link to="/home">Главная</Link>,
        //   icon: <HomeOutlined />,
        // },
        {
          key: '/users',
          label: <Link to="/users">Пользователи</Link>,
          icon: <UserOutlined />,
        },
        // {
        //   key: '/profileSections',
        //   label: <Link to="/profileSections">FAQ / Главная</Link>,
        //   icon: <QuestionCircleOutlined />,
        // },{
        //   key: '/contacts',
        //   label: <Link to="/contacts">Контакты</Link>,
        //   icon: <PhoneOutlined />,
        // },
      ],
    }, {
      key: 'g2',
      label: 'Продукты',
      type: 'group',
      children: [
        {
          key: '/orders',
          label: <Link to="/orders">Заказы</Link>,
          icon: <TruckOutlined />
        }, {
          key: '/products',
          label: <Link to="/products">Товары</Link>,
          icon: <ShoppingOutlined />,
        }, {
          key: '/categories',
          label: <Link to="/categories">Категории</Link>,
          icon: <UnorderedListOutlined />,
        },
        // {
        //   key: '/brands',
        //   label: <Link to="/brands">Бренды</Link>,
        //   icon: <AntDesignOutlined />,
        // }, {
        //   key: '/characteristics',
        //   label: <Link to="/characteristics">Характеристики</Link>,
        //   icon: <DotChartOutlined />,
        // }, {
        //   key: '/attributes',
        //   label: <Link to="/attributes">Атрибуты</Link>,
        //   icon: <ForkOutlined />,
        // }, {
        //   key: '/deliveryAddresses',
        //   label: <Link to="/deliveryAddresses">Доставка</Link>,
        //   icon: <DropboxOutlined />,
        // },
      ],
    },
    // {
    //   key: 'g3',
    //   label: 'Запись на прием',
    //   type: 'group',
    //   children: [
    //     {
    //       key: '/appointments',
    //       label: <Link to="/appointments">Записи</Link>,
    //       icon: <BlockOutlined />,
    //     },
    //     {
    //       key: '/services',
    //       label: <Link to="/services">Сервисы</Link>,
    //       icon: <MedicineBoxOutlined />,
    //     }, {
    //       key: '/serviceItems',
    //       label: <Link to="/serviceItems">Услуги</Link>,
    //       icon: <ProductOutlined />,
    //     }, {
    //       key: '/staff',
    //       label: <Link to="/staff">Специалисты</Link>,
    //       icon: <TeamOutlined />,
    //     }, {
    //       key: '/serviceAddresses',
    //       label: <Link to="/serviceAddresses">Адресы</Link>,
    //       icon: <HomeOutlined />,
    //     },
    //     {
    //       key: '/faq',
    //       label: <Link to="/faq">FAQ / Запись на прием</Link>,
    //       icon: <PushpinOutlined />,
    //     },
    //   ],
    // }, {
    //   key: 'g4',
    //   label: 'Местоположение',
    //   type: 'group',
    //   children: [
    //     // {
    //     //   key: '/countries',
    //     //   label: <Link to="/countries">Страны</Link>,
    //     //   icon: <GlobalOutlined />,
    //     // },
    //     {
    //       key: '/cities',
    //       label: <Link to="/cities">Города</Link>,
    //       icon: <BuildOutlined />,
    //     },
    //     {
    //       key: '/filialAddresses',
    //       label: <Link to="/filialAddresses">Точки самовывоза</Link>,
    //       icon: <SendOutlined />,
    //     }, {
    //       key: '/personalAddresses',
    //       label: <Link to="/personalAddresses">Адреса пользователей</Link>,
    //       icon: <EnvironmentOutlined />,
    //     },
    //   ],
    // },
    {
      key: 'g5',
      label: 'Аккаунт',
      type: 'group',
      children: [
        {
          key: '16',
          label: (
            <Link
              to="/cities"
              onClick={logout}
            >
              <Typography.Text type="danger">
                Выйти
              </Typography.Text>
            </Link>
          ),
          icon: <LogoutOutlined style={logoutIconStyle} />,
        },
      ],
    },

  ];


  return (
    <Layout style={layoutStyle}>
      <Sider style={siderStyle}>
        <Space direction="vertical">
          <Typography.Title level={2}>Assn 6</Typography.Title>
          <Menu
            mode="inline"
            style={menuStyle}
            items={siderItems}
          />
        </Space>
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Design;
