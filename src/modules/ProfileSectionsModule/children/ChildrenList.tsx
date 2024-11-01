import {
  DeleteOutlined,
  EditOutlined,
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
  handlePostSubProfileSection: (item: any) => void;
  handlePatchProfileSection: (item: any) => void;
  handleDeleteProfileSection: (item: any) => void;
}

const ChildrenList: FC<ChildrenListProps> = ({
  list,
  handlePostSubProfileSection,
  handlePatchProfileSection,
  handleDeleteProfileSection,
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
                handlePostSubProfileSection={handlePostSubProfileSection}
                handlePatchProfileSection={handlePatchProfileSection}
                handleDeleteProfileSection={handleDeleteProfileSection}
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
              {/*    onClick={() => handlePostSubProfileSection(item)}*/}
              {/*  />*/}
              {/*)}*/}
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
