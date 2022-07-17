import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useState, useEffect } from 'react'
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { PageHeader, Comment, List, Tooltip, Tabs, message } from 'antd';
import { DeleteOutlined, GlobalOutlined, MessageOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import styles from './index.less';
import ha from '../../utils/ha'

import CreateMark from './components/CreateMark'

const { TabPane } = Tabs;

interface IBookmark {
  host: string;
  hostname: string;
  origin: string,
  url: string;
  name: string;
  category: string;
}

let source = new Array<IBookmark>()


const HomePage: React.FC = () => {
  const [data, setData] = useState<Array<IBookmark>>([])
  const [categories, setCategories] = useState<Array<string>>([])

  const setSource = (list: any) => {
    source = list.map((ele: IBookmark) => {
      const url = new URL(ele.url)
      return {
        host: url.host,
        hostname: url.hostname,
        name: ele.name,
        url: ele.url,
        origin: url.origin,
        category: ele.category
      }
    })
    setCategories(Array.from(new Set(list.map((ele: any) => ele.category))))
    tabsChange('')
  }

  useEffect(() => {
    ha.httpGet('/bookmark-api').then((list: any) => {
      setSource(list)
      document.querySelector('.ant-page-header-heading-left')?.addEventListener('click', (ev) => {
        ha.hassToggleMenu()
      }, false)
    })
  }, [])

  const tabsChange = (key: string) => {
    setData(ha.jsonClone(key ? source.filter(ele => ele.category === key) : source))
  }

  const onOk = (list: any) => {
    setSource(list)
  }

  const deleteClick = (url: string) => {
    ha.httpDelete('/bookmark-api', { url }).then((list: any) => {
      setSource(list)
      message.info('删除成功')
    })
  }

  return (
    <>
      <PageHeader
        className={styles.PageHeader}
        avatar={{ src: 'https://www.home-assistant.io/images/home-assistant-logo.svg' }}
        title="书签"
        extra={[
          <CreateMark key="add" options={categories.map(ele => {
            return { value: ele }
          })} onOk={onOk} />
        ]}
      />
      <Tabs className={styles.tabs} defaultActiveKey="" centered onChange={tabsChange}>
        <TabPane tab="全部" key="">
        </TabPane>
        {
          categories.map(item => <TabPane tab={item} key={item}></TabPane>)
        }
      </Tabs>
      <List
        className={styles.CommentList}
        header={`${data.length} 条书签`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <li key={item.url}>
            <Comment
              actions={[
                <Tooltip title="删除">
                  <DeleteOutlined onClick={() => deleteClick(item.url)} />
                </Tooltip>
                , <a target="_blank" href={item.origin}>{item.host}</a>]}
              author={<a target="_blank" href={item.url}>{item.url}</a>}
              avatar={`https://0x3.com/icon?host=${item.hostname}`}
              content={(<p>{item.name}</p>)}
            />
          </li>
        )}
      />
    </>
  );
};

export default HomePage;
