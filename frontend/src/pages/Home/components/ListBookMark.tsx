import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import React, { PropsWithChildren, useState, createRef } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { PageHeader, Affix, Comment, List, Divider, Tabs, message } from 'antd';
import { IBookmark } from '../interface/type'
import styles from '../index.less';

interface SearchPanelProps {
  source: IBookmark[];
  className?: string;
}

const ListBookMark: React.FC<PropsWithChildren<SearchPanelProps>> = (props) => {

  const { source, className } = props;

  return (
    <>
      <List
        className={className}
        header={`${source.length} 条书签`}
        itemLayout="horizontal"
        dataSource={source}
        renderItem={item => (
          <li key={item.url}>
            <Comment
              author={<a target="_blank" href={item.url}>{item.url}</a>}
              avatar={`https://0x3.com/icon?host=${item.hostname}`}
              content={[
                <a target="_blank" href={item.origin}>{item.host}</a>,
                <Divider type="vertical" />,
                <span>{item.name}</span>
              ]}
            />
          </li>
        )}
      />
    </>
  );
};

export default ListBookMark;
