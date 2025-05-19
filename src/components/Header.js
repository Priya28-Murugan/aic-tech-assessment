import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {  Drawer } from "antd";
import {
  StarOutlined,
  ApiOutlined,
  EditOutlined,
  WechatWorkOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  SpotifyOutlined,
  BulbOutlined,
  CompressOutlined,
  FundProjectionScreenOutlined,
  LockOutlined,
  RocketOutlined,
  SoundOutlined,
  UserOutlined
} from "@ant-design/icons";

function Header() {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = time.toLocaleDateString("en-GB"); // dd/mm/yyyy
  const day = time
    .toLocaleDateString("en-GB", { weekday: "long" })
    .toUpperCase();

  const containerStyle = {
    position: "relative",
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="p-4 text-white shadow-md flex items-center justify-center bg-[#101D3D]">
        <div>
          <div
            className="flex space-x-8 font-semibold text-lg"
            style={containerStyle}
          >
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <div className="relative">
              <Link to="" onClick={showDrawer}>
                Module <span>+</span>
              </Link>
              <Drawer
                placement="top"
                // closable={false}
                onClose={onClose}
                open={open}
                getContainer={false}
              >
                <div className="flex">
                  <div className="w-[45%]">
                    <div className="border-b border-solid border-[#fff] text-center">
                      <p className="text-white text-xs py-2">Main Module</p>
                    </div>
                    <div className="mt-4">
                      <ul>
                        {[
                          { icon: <StarOutlined width={20} />, label: "Personal" },
                          { icon: <EditOutlined />, label: "Access" },
                          { icon: <ApiOutlined />, label: "Attendance" },
                          { icon: <WechatWorkOutlined />, label: "Elevator" },
                          { icon: <OrderedListOutlined />, label: "Visitor" },
                          {
                            icon: <QuestionCircleOutlined />,
                            label: "Parking",
                          },
                          { icon: <SpotifyOutlined />, label: "Patrol" },
                        ].map(({ icon, label }) => (
                          <li
                            key={label}
                            className="group flex items-center text-xs text-white mb-5 transition-all duration-300 cursor-pointer transform hover:translate-x-4 hover:text-yellow-400"
                          >
                            <span className="transition-all duration-300 group-hover:text-yellow-400 group-hover:mr-2 menu-icons">
                              {icon}
                            </span>
                            <span className="ml-1 transition-all duration-300 group-hover:text-yellow-400">
                              {label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="w-[45%] ml-[5%]">
                    <div className="border-b border-solid border-[#fff] text-center">
                      <p className="text-white text-xs py-2">Sub Module</p>
                    </div>
                    <div className="mt-4">
                      <ul>
                        {[
                          { icon: <BulbOutlined width={20} />, label: "Dashboard" },
                          { icon: <CompressOutlined />, label: "System Management" },
                          { icon: <FundProjectionScreenOutlined />, label: "Authority Management" },
                          { icon: <LockOutlined />, label: "Communication Management" },
                          { icon: <RocketOutlined />, label: "Third Party Integration" },
                          {
                            icon: <SoundOutlined />,
                            label: "Parking",
                          },
                          { icon: <UserOutlined />, label: "Patrol" },
                        ].map(({ icon, label }) => (
                          <li
                            key={label}
                            className="group flex items-center text-xs text-white mb-5 transition-all duration-300 cursor-pointer transform hover:translate-x-4 hover:text-yellow-400"
                          >
                            <span className="transition-all duration-300 group-hover:text-yellow-400 group-hover:mr-2 menu-icons">
                              {icon}
                            </span>
                            <span className="ml-1 transition-all duration-300 group-hover:text-yellow-400">
                              {label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
            <Link to="/map">Map</Link>
          </div>
          <div className="flex justify-center mt-2 items-center space-x-2 font-digital text-sm tracking-widest">
            <div>
              <span>{formattedDate}</span>
              <span>{formattedTime}</span>
              <span>{day}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
