import { Modal, Button, List, Input, AutoComplete, FormInstance, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { PropsWithChildren, useState, createRef } from 'react';
import { IBookmark } from '../interface/type'
import ListBookMark from './ListBookMark'

interface SearchPanelProps {
  source: IBookmark[]
}

const SearchPanel: React.FC<PropsWithChildren<SearchPanelProps>> = (props) => {

  const [visible, setVisible] = useState(false)
  const { source } = props;
  const [data, setData] = useState<Array<IBookmark>>([])

  const onTextChange = (e: any) => {
    // console.log(e.target.value)
    const value = e.target.value
    setData(source.filter(ele => {
      return ele.name.toLocaleLowerCase().includes(value) || ele.url.toLocaleLowerCase().includes(value)
    }))
  }
  return (
    <>
      <Modal
        destroyOnClose
        title="搜索"
        width={420}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Input placeholder="请输入关键词搜索" onInput={onTextChange} />
        <ListBookMark source={data} />
      </Modal>
      <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => setVisible(true)} />
    </>
  );
};

export default SearchPanel;
