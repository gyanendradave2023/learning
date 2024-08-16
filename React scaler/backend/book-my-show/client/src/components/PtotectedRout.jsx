import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SetUser } from "../redux/userSlice";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { GetCurrentUser } from "../api/users";
import { message, Layout, Menu } from "antd";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Header } = Layout;

  const handleProfileNavigation = () => {
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "partner") {
      navigate("/partner");
    } else {
      navigate("/profile");
    }
  };

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      label: `${user ? user.name : "Login"}`,
      icon: <UserOutlined />,
      children: [
        {
          label: <span onClick={handleProfileNavigation}> My Profile </span>,
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoader());
      const response = await GetCurrentUser();
      dispatch(SetUser(response.data));
      dispatch(hideLoader());
    } catch (error) {
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Layout>
        <Header className="d-flex justify-content-between sticky">
          <h1 className="demo-logo text-white m-0">
            Book My Show
          </h1>
          {/* <Menu theme="dark" mode="horizontal" items={navItems} /> */}
          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems.map((item, index) => ({
              ...item,
              key: item.id || `unique-${index}-${Date.now()}` // This approach might still not be foolproof if items are rendered too quickly in succession. Consider using a more unique attribute from each item.
            }))}
          />
        </Header>
        <div>{children}</div>
      </Layout>
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;