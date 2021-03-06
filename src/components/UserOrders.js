import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Col, Divider, Row, Tag, Button, Popconfirm } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import userActions from "../redux/actions/user.actions";
const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.orders);
  useEffect(() => {
    dispatch(userActions.getUserOrders());
  }, [dispatch]);
  const handleCancelOrder = (orderID) => {
    dispatch(userActions.cancelOrder(orderID));
  };
  return (
    <Row>
      <Col style={{ minHeight: "550px", width: "100%" }}>
        <Row className="site-layout-background admin-dashboard-status-row">
          <Col style={{ marginLeft: "15px" }} span={3}>
            ORDER ID
          </Col>
          <Col span={5}>ORDERED DATE</Col>
          <Col span={8}>DETAIL</Col>
          <Col span={3}>TOTAL</Col>
          <Col span={3}>
            STATUS <DownOutlined />
          </Col>
          <Col span={1}></Col>
        </Row>
        <Divider />

        {orders.length === 0 ? (
          <div
            style={{
              minHeight: "550px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ClipLoader />
          </div>
        ) : (
          orders?.map((order, idx) => {
            return (
              <Row
                key={idx}
                className="site-layout-background admin-dashboard-order-row"
                style={{
                  backgroundColor: idx % 2 === 1 ? "#f6f6f6" : "none",
                  fontSize: "13px",
                }}
              >
                <Col style={{ marginLeft: "15px" }} span={3}>
                  {order._id.slice(-7).toUpperCase()}
                </Col>
                <Col span={5}>{order.convertedDate}</Col>
                <Col span={8}>{order.products[0].product.name}</Col>
                <Col span={3}>${order.totalPrice.toFixed(2)}</Col>
                <Col span={3}>
                  <Tag
                    color={
                      order.status === "Pending"
                        ? "#fbba4e"
                        : order.status === "Completed"
                        ? "#82bf11"
                        : "#f05d62    "
                    }
                    style={{
                      width: "70px",
                      textAlign: "center",
                      borderRadius: "12px",
                      fontSize: "10px",
                      height: "20px",
                    }}
                  >
                    {order.status}
                  </Tag>
                </Col>
                <Col span={1}>
                  <Popconfirm
                    title="Are you sure you want to cancel this order?"
                    onConfirm={() => handleCancelOrder(order._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text" icon={<CloseCircleFilled />}></Button>
                  </Popconfirm>
                </Col>
              </Row>
            );
          })
        )}
      </Col>
    </Row>
  );
};

export default UserOrders;
