import { Button, Checkbox, Input, Modal, Radio, Select, Tabs } from "antd";
import backIcon from "../assests/backIcon.png";
import Header from "../components/Header";
import { useRef, useState } from "react";
import insert from "../assests/gallery.png";
import background from "../assests/background.png";
import text from "../assests/text.png";
import underScore from "../assests/underScore.png";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const defaultFields = [
  { id: 1, type: "personalId", label: "Personal Id" },
  { id: 2, type: "name", label: "Name" },
  { id: 3, type: "department", label: "Department" },
  { id: 4, type: "hireDate", label: "Hire Date" },
  { id: 5, type: "gender", label: "Gender" },
  { id: 6, type: "mobileNumber", label: "Mobile Number" },
  { id: 7, type: "email", label: "Email" },
  { id: 8, type: "cardNumber", label: "Card Number" },
];

const extraFields = [
  { id: 101, type: "cardIdAny", label: "Card ID Any" },
  {
    id: 102,
    type: "verifyDuringPassageModeTimeZone",
    label: "Verify During Passage Mode Time Zone",
  },
  { id: 103, type: "firstPersonalOpen", label: "First-Personal Open" },
  { id: 104, type: "multiPersonalOpen", label: "Multi-Personal Open" },
  { id: 105, type: "emergencyPasswordOpen", label: "Emergency Password Open" },
  {
    id: 106,
    type: "openDuringPassageModeTimeZone",
    label: "Open During Passage Mode Time Zone",
  },
  { id: 107, type: "cancelAlarm", label: "Cancel Alarm" },
  {
    id: 108,
    type: "operationIntervalTooShort",
    label: "Operation Interval too short",
  },
  {
    id: 109,
    type: "doorInactiveTimeZoneVerifyOpen",
    label: "Door Inactive Time Zone Verify Open",
  },
  { id: 110, type: "illegalTimeZone", label: "Illegal Time Zone" },
  { id: 111, type: "accessDenied", label: "Access Denied" },
  { id: 112, type: "antiPassback", label: "Anti-Passback" },
  { id: 113, type: "unregisteredPersonnel", label: "Unregistered Personnel" },
];

const AddTemplate = () => {
  const [orientation, setOrientation] = useState("Vertical");
  const [selectedFields, setSelectedFields] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedBackSideImage, setUploadedBackSideImage] = useState(null);
  const fileInputRef = useRef(null);
  const backSideFileInputRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const backgroundInputRef = useRef(null);
  const [insertedText, setInsertedText] = useState("");
  const [isEditingText, setIsEditingText] = useState(false);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeItemId, setActiveItemId] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedExtraFields, setSelectedExtraFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fieldList = [...defaultFields, ...selectedExtraFields];

  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
  };

  const tabOnChange = (key) => {
    setActiveTab(key);
  };

  const toggleItem = (item) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
      if (activeItemId === item.id) setActiveItemId(null);
    } else {
      setSelectedItems([
        ...selectedItems,
        { ...item, marginLeft: 0, marginTop: 0, font: 16 },
      ]);
      setActiveItemId(item.id);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === activeItemId
          ? {
              ...item,
              [field]: field === "label" ? value : parseInt(value) || 0,
            }
          : item
      )
    );
  };

  const activeItem = selectedItems.find((i) => i.id === activeItemId);

  const baseStyle = {
    textAlign: "left",
    backgroundColor: "#1A2337",
    padding: "5px 10px",
    marginBottom: "4px",
    width: "100%",
  };

  const itemStyles = {
    name: {
      textAlign: "center",
      fontSize: "24px",
      width: "150px",
      marginBottom: "10px",
    },
    department: { ...baseStyle },
    personalId: { ...baseStyle },
    hireDate: { ...baseStyle },
    gender: { ...baseStyle },
    mobileNumber: { ...baseStyle },
    email: { ...baseStyle },
    cardNumber: { ...baseStyle },
    cardIdAny: { ...baseStyle },
    verifyDuringPassageModeTimeZone: { ...baseStyle },
    firstPersonalOpen: { ...baseStyle },
    multiPersonalOpen: { ...baseStyle },
    emergencyPasswordOpen: { ...baseStyle },
    openDuringPassageModeTimeZone: { ...baseStyle },
    cancelAlarm: { ...baseStyle },
    operationIntervalTooShort: { ...baseStyle },
    doorInactiveTimeZoneVerifyOpen: { ...baseStyle },
    illegalTimeZone: { ...baseStyle },
    accessDenied: { ...baseStyle },
    antiPassback: { ...baseStyle },
    unregisteredPersonnel: { ...baseStyle },
  };

  const renderTabContent = () => (
    <div
      className={`mt-4 p-4 flex flex-col  items-center justify-start ${
        orientation === "Vertical"
          ? "border-2 border-blue-500 lg:w-[75%] h-[350px] lg:h-[500px] w-[65%] px-[10%] box-border"
          : "border-2 border-red-500 h-[350px] w-[100%]"
      }`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {uploadedImage && (
        <img
          src={uploadedImage}
          alt="Uploaded"
          className="w-[150px] h-[150px] object-cover rounded-full mb-4"
        />
      )}

      {selectedItems.map((item) => (
        <div
          key={item.id}
          onClick={() => setActiveItemId(item.id)}
          className="text-white"
          style={{
            ...itemStyles[item.type],
            marginLeft: item.marginLeft,
            marginTop: item.marginTop,
            fontSize: item.font,
            position: "relative",
            border:
              activeItemId === item.id
                ? "2px solid #ff5722"
                : itemStyles[item.type].border,
          }}
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
              if (activeItemId === item.id) setActiveItemId(null);
            }}
            style={{
              position: "absolute",
              top: 0,
              right: 4,
              fontWeight: "bold",
              color: "#d32f2f",
              cursor: "pointer",
              fontSize: "12px",
            }}
            title="Remove"
          >
            ×
          </span>
          {item.label}
        </div>
      ))}

      {isEditingText ? (
        <input
          type="text"
          value={insertedText}
          onChange={(e) => setInsertedText(e.target.value)}
          onBlur={() => setIsEditingText(false)}
          autoFocus
          className="text-white bg-transparent border-b border-white text-center text-lg outline-none"
          placeholder="Type your text..."
        />
      ) : insertedText ? (
        <p
          className="text-white text-lg cursor-pointer"
          onClick={() => setIsEditingText(true)}
        >
          {insertedText}
        </p>
      ) : null}
    </div>
  );

  const renderTabBackContent = () => (
    <div
      className={`mt-4 p-4 flex items-center justify-center ${
        orientation === "Vertical"
          ? "border-2 border-blue-500 lg:w-[75%] h-[350px] lg:h-[500px] w-[65%] px-[10%] box-border"
          : "border-2 border-red-500 h-[350px] w-[100%]"
      }`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {uploadedBackSideImage && (
        <img
          src={uploadedBackSideImage}
          alt="Uploaded"
          className="w-[300px] h-[300px] object-cover rounded-full mb-4"
        />
      )}
    </div>
  );

  const items = [
    {
      key: "1",
      label: "Front",
      children: renderTabContent(),
    },
    {
      key: "2",
      label: "Back",
      children: renderTabBackContent(),
    },
  ];

  const handleAddFields = () => {
    const newFields = extraFields.filter(
      (field) =>
        selectedFields.includes(field.type) && // user selected this
        !selectedExtraFields.some((f) => f.type === field.type) // avoid duplicates
    );

    console.log("New fields to add:", newFields);

    setSelectedExtraFields([...selectedExtraFields, ...newFields]);
    setIsModalOpen(false);
    setSelectedFields([]); // Clear selections
  };

  const handleInsertPictureClick = () => {
    if (activeTab === 1) {
      console.log(activeTab);
      fileInputRef.current.click();
    } else {
      backSideFileInputRef.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  const handleImageBackSideUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedBackSideImage(imageUrl);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <input
        type="file"
        accept="image/*"
        ref={backgroundInputRef}
        onChange={handleBackgroundUpload}
        style={{ display: "none" }}
      />
      <input
        type="file"
        accept="image/*"
        ref={backSideFileInputRef}
        onChange={handleImageBackSideUpload}
        style={{ display: "none" }}
      />

      <Header />
      <div className="mt-3 p-3">
        <div className=" bg-[#101625] mb-2">
          <div className="py-[18px] px-[24px] gap-3 flex items-center">
            <img src={backIcon} alt="backIcon" onClick={() => navigate("/")} />
            <p className="font-semibold text-base text-white">
              Add New Template
            </p>
          </div>
        </div>
        <div className="bg-[#101625] py-[18px] px-[24px]">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-[20%]">
              <Input placeholder="Template Name" />
            </div>

            <Select
              defaultValue="Personnel"
              suffixIcon={
                <DownOutlined style={{ color: "#fff", fontSize: "14px" }} />
              }
              style={{ width: 300 }}
              options={[
                { value: "personal", label: "Personnel" },
                { value: "visitor", label: "Visitor" },
              ]}
            />

            <div>
              <p className="font-medium text-sm text-white mb-2">Orientation</p>
              <div className="flex items-center">
                <Radio.Group
                  onChange={handleOrientationChange}
                  value={orientation}
                >
                  <Radio value="Vertical">Vertical</Radio>
                  <Radio value="Transverse">Transverse</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="gradient-border  mb-8" />
          <div className="flex w-full justify-between gap-x-4 items-start flex-wrap">
            <div className="flex-shrink-0 w-full lg:w-2/6">
              <Tabs defaultActiveKey="1" items={items} onChange={tabOnChange} />
            </div>
            <div className="w-[1px] h-[450px] bg-white hidden lg:block"></div>
            <div className="w-full lg:w-[62%] mt-10 lg:mt-0">
              <div className="flex items-center gap-x-4 flex-1">
                <div className="w-full flex-wrap flex">
                  <label className="w-full text-white text-sm">
                    Margin Left:
                  </label>
                  <Input
                    type="number"
                    value={activeItem?.marginLeft}
                    onChange={(e) =>
                      handleInputChange("marginLeft", e.target.value)
                    }
                  />
                </div>
                <div className="w-full flex-wrap flex">
                  <label className="w-full text-white text-sm">
                    Margin Top:
                  </label>
                  <Input
                    type="number"
                    value={activeItem?.marginTop}
                    onChange={(e) =>
                      handleInputChange("marginTop", e.target.value)
                    }
                  />
                </div>
                <div className="w-full flex-wrap flex">
                  <label className="w-full text-white text-sm">Text:</label>
                  <Input
                    type="text"
                    value={activeItem?.label}
                    onChange={(e) => handleInputChange("label", e.target.value)}
                  />
                </div>
                <div className="w-full flex-wrap flex">
                  <label className="w-full text-white text-sm">
                    Font Size:
                  </label>
                  <Input
                    className="w-full"
                    value={activeItem?.font}
                    onChange={(e) => handleInputChange("font", e.target.value)}
                    placeholder="Font Size"
                    type="number"
                  />
                </div>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-base text-white mb-3">
                  Select Field
                </p>
                <div className="flex flex-wrap">
                  {fieldList.map((value) => (
                    <div
                      key={value.id}
                      className="py-2 px-4 mr-3 mb-3 text-base bg-[#1A2337] text-white text-center cursor-pointer"
                      onClick={() => toggleItem(value)}
                      style={{
                        backgroundColor: selectedItems.some(
                          (i) => i.id === value.id
                        )
                          ? "#078DEE"
                          : "#1A2337",
                      }}
                    >
                      {value.label}
                    </div>
                  ))}
                  <p
                    onClick={() => setIsModalOpen(true)}
                    className="text-base text-white py-2 mb-3 px-4 bg-[#1A2337] text-center cursor-pointer"
                  >
                    +
                  </p>
                  <Modal
                    title="Select Field"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    className="custom-modal"
                    footer={[
                      <Button
                        key="cancel"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        onClick={handleAddFields}
                      >
                        Confirm
                      </Button>,
                    ]}
                  >
                    <Checkbox.Group
                      value={selectedFields}
                      onChange={(checkedValues) =>
                        setSelectedFields(checkedValues)
                      }
                    >
                      <div className="flex flex-col gap-2">
                        {extraFields.map((field) => (
                          <Checkbox key={field.id} value={field.type}>
                            {field.label}
                          </Checkbox>
                        ))}
                      </div>
                    </Checkbox.Group>
                  </Modal>
                </div>
                <div className="flex items-center text-white justify-between mt-8 flex-wrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleInsertPictureClick}
                  >
                    <img src={insert} alt="insert" />
                    <p className="font-normal text-base">Insert Picture</p>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => backgroundInputRef.current.click()}
                  >
                    <img src={background} alt="background" />
                    <p className="font-normal text-base">
                      Insert Background Picture
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setIsEditingText(true);
                    }}
                  >
                    <img src={text} alt="text" />
                    <p className="font-normal text-base">Insert Text</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={underScore} alt="underscore" />
                    <p className="font-normal text-base">Insert Underscore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button className="border border-solid border-[#8DCBF7] px-7 py-2 text-white text-sm mr-5">
            Cancel
          </button>
          <button className="border border-solid border-[#8DCBF7] bg-[#078DEE] px-7 py-2 text-white text-sm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
