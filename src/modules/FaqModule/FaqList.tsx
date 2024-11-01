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
  Space,
} from "antd";
import React from "react";
import { useGetFaq } from "../../tanstack/useFaq";
import ChildrenContent from "./children/ChildrenContent";
import ChildrenList from "./children/ChildrenList";


const FaqList: React.FC = ({
  api,
  setSelectedFaq,
  showPostFaqModal,
  showPatchFaqModal,
  showDeleteFaqModal,
}) => {
  const {
    data: getFaqData,
    isLoading: isGetFaqLoading,
    isRefetching: isRefetchingFaq,
  } = useGetFaq(api);
  const loading = isGetFaqLoading || isRefetchingFaq;

  const handlePatchFaq = async (selectedFaq) => {
    setSelectedFaq(selectedFaq);
    showPatchFaqModal();
  };
  const handleDeleteFaq = async (selectedFaq) => {
    setSelectedFaq(selectedFaq);
    showDeleteFaqModal();
  };

  const items: CollapseProps['items'] = getFaqData?.map((item) => ({
    key: item.id,
    label: item.question,
    children: (
      <>
        <Row
          align="top"
          gutter={[ 24, 0 ]}
        >
          <Col span={21}>
            {item.answer}
          </Col>
          <Col span={3}>
            <Flex
              justify="flex-end"
              gap="small"
            >
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchFaq(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteFaq(item)}
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
          <span>FAQ / Запись на прием</span>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => showPostFaqModal()}
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

export default FaqList;