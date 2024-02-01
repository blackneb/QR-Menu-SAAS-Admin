import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import categoryData from '../menu management/categories.json'

interface Category {
  categoryId: number;
  categoryName: string;
  dateCreated: string;
}

const data: Category[] = categoryData;

const columns: ColumnsType<Category> = [
  {
    title: 'Category ID',
    dataIndex: 'categoryId',
    key: 'categoryId',
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Date Created',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
  },
];

const CategoryTable: React.FC = () => {
  return <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }} />;
};

export default CategoryTable;
