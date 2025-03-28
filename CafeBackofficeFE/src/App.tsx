import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Title from 'antd/es/typography/Title'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import packageInfo from '../package.json'
import './App.css'
import routes from './routes'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'

const footerStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: '10px 16px',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.65)',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
};

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Find the active key based on current path
  const getActiveKey = () => {
    const path = location.pathname;
    // Find the route that matches the current path
    const activeRoute = routes.find(route => path.startsWith(route.path));
    return activeRoute ? [activeRoute.key] : undefined;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
        height: '100vh',
        zIndex: 1000
      }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth={0}
        trigger={null}>
        <div className="logo">
          <img src={reactLogo} alt="React logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getActiveKey()}
          items={routes.filter(route => route.showInMenu !== false).map(route => ({
            key: route.key,
            icon: route.icon,
            label: route.label,
            onClick: () => navigate(route.path)
          }))}
        />
        <div style={footerStyle}>
          v{packageInfo.version}
        </div>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 0 : 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex align="center" justify="space-between" style={{ height: '100%', margin: '0 24px' }}>
            <Flex align="center" justify="space-between" gap={16}>
              <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)} size='large' />
              <img src={viteLogo} alt="Vite logo" />
              <Title level={4} style={{ margin: 0 }}>Vite + React + TS</Title>
            </Flex>
            {/* <div>
              <Button shape="circle" icon={<UserOutlined />} size='large' />
            </div> */}
          </Flex>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App
