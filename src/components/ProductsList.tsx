import { useMutation, useQuery } from "@apollo/client";
import { Button, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import { GET_PRODUCTS_LIST } from "../services/queries";
import { UPDATE_PRODUCT, DELETE_PRODUCT, CREATE_PRODUCT_QUERY } from "../services/mutations";




const ProductsList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS_LIST, {
    pollInterval: 500,
  });
  const [editProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [createProduct] = useMutation(CREATE_PRODUCT_QUERY);

  if (loading)
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  if (error) return <p>Error </p>;

  const handleClickDeleteProduct = async (key: any) => {
    const id = atob(key.key).split(":")[1];
    const { data } = await deleteProduct({ variables: { id: id } });
    console.log(data);
  };

  const onCreateProduct = async (values: any) => {
    console.log("Received values of form: ", values);
    const { data } = await createProduct({ variables: values });
    console.log(data);
  };

  const onEditProduct = async (values: any) => {
    console.log("Received values of form: ", values);
    const id = atob(values.id).split(":")[1];
    delete values.id;

    console.log(values);

    const { data } = await editProduct({ variables: { id, ...values } });
    console.log(data);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Action",
      key: "action",
      render: (key: string) => (
        <Space size="middle">
          <EditProduct onEditProduct={onEditProduct} setValues={key} />
          <Button
            onClick={() => {
              handleClickDeleteProduct(key);
            }}
            type="dashed"
            danger
          >
            delete
          </Button>
        </Space>
      ),
    },
  ];

  //set data to table
  const dataSource = data.Products.edges.map((product: any) => ({
    key: product.node.id,
    name: product.node.name,
    price: product.node.price,
    description: product.node.description,
    quantity: product.node.quantity,
  }));

  return (
    <div className="mx-4">
      <h1 className="text-center">Products</h1>
      <CreateProduct onCreateProduct={onCreateProduct} />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProductsList;
