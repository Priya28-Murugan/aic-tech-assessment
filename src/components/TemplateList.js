import { Table } from "antd";
import refresh from "../assests/refresh.png";
import refreshIcon from "../assests/refreshIcon.png";
import trash from "../assests/trash.png";
import { useNavigate } from "react-router-dom";
import eye from "../assests/eye.png";

function TemplateList() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Template Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Module",
      dataIndex: "module",
    },
    {
      title: "Operations",
      dataIndex: "operations",
    },
  ];
  const data = [
    {
      key: "1",
      name: "Id Card",
      module: "Personnel",
      operations: (
        <>
          <img src={eye} alt="eye" />
        </>
      ),
    },
    {
      key: "2",
      name: "Visitor Receipt",
      module: "Visitor",
      operations: (
        <>
          <img src={eye} alt="eye" />
        </>
      ),
    },
    {
      key: "3",
      name: "Visitor Print Card",
      module: "Visitor",
      operations: (
        <>
          <img src={eye} alt="eye" />
        </>
      ),
    },
    {
      key: "4",
      name: "Personal Print Card",
      module: "Visitor",
      operations: (
        <>
          <img src={eye} alt="eye" />
        </>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <div className="p-3">
        <div className="mt-5">
          <div className="flex justify-between items-center bg-[#0d122b]">
            <div className="py-[18px] px-[24px] gap-3">
              <p className="font-semibold text-base text-white">
                Print Template
              </p>
              <p className="font-normal text-sm text-[#FFFFFF78]">
                System Manmodulement
              </p>
            </div>
            <div className="py-[18px] ml-[24px] gap-3 flex items-center">
              <div>
                <p className="font-semibold text-2xl text-white">4</p>
                <p className="font-medium text-xs text-white">Total Data</p>
              </div>

              <img src={refresh} alt="refresh" />
            </div>
          </div>
        </div>
        <div className="py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center px-4 py-2 w-[300px] bg-[#1A2337]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5 mr-2 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-white placeholder-white focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <img src={refreshIcon} alt="refreshIcon" />
                <p className="font-normal text-sm text-white">Refresh</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={trash} alt="trash" />
                <p className="font-normal text-sm text-white">Delete</p>
              </div>
              <button
                className=" gap-[10px] px-[8px] py-[10px] text-white rounded"
                style={{
                  background:
                    "linear-gradient(180deg, #078DEE 0%, #045188 100%)",
                }}
                onClick={() => navigate("/add-template")}
              >
                Add Template
              </button>
            </div>
          </div>
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
}

export default TemplateList;
