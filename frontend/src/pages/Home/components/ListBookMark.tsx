import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import React, { PropsWithChildren, useState, createRef } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { PageHeader, Affix, Comment, List, Divider, Tabs, message, Avatar } from 'antd';
import { IBookmark } from '../interface/type'
import styles from '../index.less';
import ha from '../../../utils/ha'

interface SearchPanelProps {
  source: IBookmark[];
  className?: string;
  deleteClick?(url: string): void;
}

const ListBookMark: React.FC<PropsWithChildren<SearchPanelProps>> = (props) => {

  const { source, className, deleteClick } = props;

  const linkClick = (url: string) => {
    ha.httpPut('/api/bookmark', { url, key: 'time', value: Date.now() })
  }

  return (
    <>
      <List
        className={className}
        header={`${source.length} 条书签`}
        itemLayout="horizontal"
        dataSource={source}
        renderItem={item => (
          <List.Item
            actions={deleteClick ? [
              // <a key="list-loadmore-edit">编辑</a>,
              <a key="list-loadmore-more" onClick={() => deleteClick(item.url)}>删除</a>
            ] : []
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar src={`https://0x3.com/icon?host=${item.hostname}`} />
              }
              title={<a target="_blank" href={item.url} onClick={() => linkClick(item.url)}>{item.url}</a>}
              description={[
                <a target="_blank" href={item.origin} onClick={() => linkClick(item.url)}>{item.host}</a>,
                <Divider type="vertical" />,
                <span>{item.name}</span>
              ]}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListBookMark;
