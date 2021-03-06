import React, { useState } from "react";
import { Layout, Menu, Image, Divider } from "antd";
import {
  PieChartOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  DollarCircleFilled,
  TagFilled,
  SettingFilled,
} from "@ant-design/icons";
import logo from "../image/logo.png";
import { Route, Switch } from "react-router";
import AdminOrdersPage from "./AdminOrdersPage";
import AdminProductsPage from "./AdminProductsPage";
import { Link } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AddProductPage from "./AddProductPage";
import AdminOverviewPage from "./AdminOverviewPage";
const { Sider } = Layout;
const AdminDashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }} className="admin-dashboard-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="admin-dashboard-sider"
      >
        <div className="admin-dashboard-logo">
          <Image src={logo} width="120px" />
        </div>

        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          className="admin-dashboard-menu"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/admin/dashboard/">Overview</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/dashboard/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            <Link to="/admin/dashboard/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<DollarCircleFilled />}>
            <Link to="/">Payments</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<TagFilled />}>
            <Link to="/">Promotions</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SettingFilled />}>
            <Link to="/">Setting</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Divider type="vertical" style={{ height: "100vh", margin: 0 }} />
      <Switch>
        <Route exact path="/admin/dashboard" component={AdminOverviewPage} />
        <Route
          exact
          path="/admin/dashboard/orders"
          component={AdminOrdersPage}
        />
        <Route
          exact
          path="/admin/dashboard/products"
          component={AdminProductsPage}
        />
        <Route
          exact
          path="/admin/dashboard/products/add"
          component={AddProductPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default AdminDashboardPage;
