import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  Row,
} from "antd";
import React from "react";
import { useGetProfileSections } from "../../tanstack/useProfileSections";
import ChildrenContent from "./children/ChildrenContent";
import ChildrenList from "./children/ChildrenList";


const ProfileSectionsList: React.FC = ({
  api,
  setSelectedProfileSection,
  showPostProfileSectionModal,
  showPostSubProfileSectionModal,
  showPatchProfileSectionModal,
  showDeleteProfileSectionModal,
}) => {
  const {
    data: getProfileSectionData,
    isLoading: isGetProfileSectionLoading,
    isRefetching: isRefetchingProfileSection,
  } = useGetProfileSections(api);
  const loading = isGetProfileSectionLoading || isRefetchingProfileSection;

  const handlePostSubProfileSection = async (selectedProfileSection) => {
    setSelectedProfileSection(selectedProfileSection);
    showPostSubProfileSectionModal();
  };
  const handlePatchProfileSection = async (selectedProfileSection) => {
    setSelectedProfileSection(selectedProfileSection);
    showPatchProfileSectionModal();
  };
  const handleDeleteProfileSection = async (selectedProfileSection) => {
    setSelectedProfileSection(selectedProfileSection);
    showDeleteProfileSectionModal();
  };

  const items: CollapseProps['items'] = getProfileSectionData?.map((item) => ({
    key: item.Id,
    label: item.Name,
    children: (
      <>
        <Row
          align="top"
          gutter={[ 24, 0 ]}
        >
          <Col span={21}>
            {
              item.Content !== "" && item.Content !== null
                ? <ChildrenContent content={item.Content} />
                : (
                  <ChildrenList
                    list={item.ProfileSections}
                    handlePostSubProfileSection={handlePostSubProfileSection}
                    handlePatchProfileSection={handlePatchProfileSection}
                    handleDeleteProfileSection={handleDeleteProfileSection}
                  />
                )
            }
          </Col>
          <Col span={3}>
            <Flex
              justify="flex-end"
              gap="small"
            >
              {/*{JSON.stringify()}*/}
              {(item.Content === "" || item.Content === null) && (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => handlePostSubProfileSection(item)}
                />
              )}
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchProfileSection(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteProfileSection(item)}
              />
            </Flex>
          </Col>
        </Row>
      </>
    ),
  })) || [];

  return (
    <Card
      title={(
        <Flex justify="space-between">
          <span>FAQ / Главная</span>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => showPostProfileSectionModal()}
          >
            Добавить
          </Button>
        </Flex>
      )}
      loading={loading}
    >
      <Collapse
        items={items}
        bordered={false}
        // defaultActiveKey={[ '1' ]}
      />
    </Card>
  );
};

export default ProfileSectionsList;