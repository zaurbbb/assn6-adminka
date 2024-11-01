import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  Row,
  Typography,
} from "antd"; // Assuming Flex is a custom layout component
import React, {
  CSSProperties,
  FC,
} from "react";

interface ChildrenListProps {
  list: any[]; // You should replace `any` with your actual type
  handlePostSubFaq: (item: any) => void;
  handlePatchFaq: (item: any) => void;
  handleDeleteFaq: (item: any) => void;
}

const ChildrenList: FC<ChildrenListProps> = ({
  list,
  handlePostSubFaq,
  handlePatchFaq,
  handleDeleteFaq,
}) => {
  const collapseStyles: CSSProperties = {
    width: "100%",
  };

  const items: CollapseProps["items"] = list?.map((item) => ({
    key: item.Id,
    label: item.Name,
    children: (
      <>
        <Row
          align="top"
          gutter={[ 24, 0 ]}
        >
          <Col span={21}>
            {item.Content ? (
              <Typography.Paragraph>{item.Content}</Typography.Paragraph>
            ) : (
              // Recursively render ChildrenList if there are sub-items
              <ChildrenList
                list={item.ProfileSections || []}
                handlePostSubFaq={handlePostSubFaq}
                handlePatchFaq={handlePatchFaq}
                handleDeleteFaq={handleDeleteFaq}
              />
            )}
          </Col>
          <Col span={3}>
            <Flex
              justify="flex-end"
              gap="small"
            >
              {/*{JSON.stringify(item)}*/}
              {/*{(item.Content === "" || item.Content === null) && (*/}
              {/*  <Button*/}
              {/*    icon={<PlusOutlined />}*/}
              {/*    onClick={() => handlePostSubFaq(item)}*/}
              {/*  />*/}
              {/*)}*/}
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
    <>
      {items?.length === 0 && <Typography.Text mark>Пусто</Typography.Text>}
      {items?.length > 0 && (
        <Collapse
          items={items}
          bordered={false}
          style={collapseStyles}
        />
      )}
    </>
  );
};

export default ChildrenList;

// import {
//   Collapse,
//   CollapseProps,
//   Typography,
// } from "antd";
// import React, {
//   CSSProperties,
//   FC,
// } from "react";
//
// const ChildrenList: FC = ({
//   list,
// }) => {
//   const items: CollapseProps['items'] = list?.map((item) => ({
//     key: item.Id,
//     label: item.Name,
//     children: item.Content,
//   })) || [];
//   const collapseStyles: CSSProperties = {
//     width: "100%",
//   };
//   return (
//     <>
//       {items?.length === 0 && <Typography.Text mark>Пусто</Typography.Text>}
//       {items?.length > 0 && (
//         <Collapse
//           items={items}
//           bordered={false}
//           style={collapseStyles}
//         />
//       )}
//     </>
//   );
// };
//
// export default ChildrenList;
//
