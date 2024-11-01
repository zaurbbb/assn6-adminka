import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import React, {
  CSSProperties,
  useState,
} from 'react';
// import { useGetCharacteristics } from "../../../tanstack/useCharacteristics";
import { usePatchProductById } from "../../../tanstack/useProducts";

const PatchProductForm: React.FC = ({
  api,
  selectedProduct,
  hidePatchProductModal,
}) => {
  const [ form ] = Form.useForm();
  const [ fileList, setFileList ] = useState([]);
  const [ filesList, setFilesList ] = useState([]);

  // Pre-fill form values
  form.setFieldsValue({
    id: selectedProduct?.id,
    image_url: selectedProduct?.image_url,
    name: selectedProduct?.name,
    description: selectedProduct?.description,
    category: selectedProduct?.category,
    price: selectedProduct?.price,
    quantity: selectedProduct?.quantity,
  });

  // const [ characteristicId, setCharacteristicId ] = useState(1);

  // const { data: characteristics } = useGetCharacteristics(api, null);
  // const characteristicsOptions = characteristics?.map((characteristic: any) => ({
  //   value: characteristic.id,
  //   label: characteristic.name,
  // }));

  const { mutateAsync: patchProduct } = usePatchProductById(api);

  // Handle form submission with multipart/form-data
  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append regular form fields to FormData
    for (const [ key, value ] of Object.entries(values)) {
      if (value) {
        formData.append(key, value);
      }
    }

    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);  // append the file
    }
    if (filesList.length > 0) {
      formData.append('image', filesList.originFileObj);
    }

    hidePatchProductModal();
    await patchProduct({
      id: selectedProduct?.id,
      values: formData,
    });
    form.resetFields();
    setFileList([]);  // Reset file list
  };

  // Handle file selection
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleFilesChange = ({ fileList }) => {
    setFilesList(fileList);
  };

  const formStyles: CSSProperties = {
    maxHeight: 600,
    overflowY: 'auto',
  };

  return (
    <Form
      form={form}
      name="PatchProduct"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      onFinish={onFinish}
      style={formStyles}
    >

      <Form.Item
        label="Изображение"
        name="image"
      >
        <Upload
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleFileChange}
          accept="image/*"
        >
          <Button>Загрузить фото</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Название"
        name="name"
        rules={[ { required: true, message: 'Введите название!' } ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[ { required: true, message: 'Введите описание!' } ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Категория"
        name="category"
        rules={[ { required: true, message: 'Выберите категорию!' } ]}
      >
        <Select>
          <Select.Option value="1">Супы</Select.Option>
          <Select.Option value="2">Салаты</Select.Option>
          <Select.Option value="3">Горячие блюда</Select.Option>
          <Select.Option value="4">Десерты</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Цена"
        name="price"
        rules={[ { required: true, message: 'Введите цену!' } ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Количество"
        name="quantity"
        rules={[ { required: true, message: 'Введите количество!' } ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
        >
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatchProductForm;
