import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useState, useEffect } from 'react'
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { PageHeader, Affix, Comment, List, Tooltip, Tabs, message } from 'antd';
import { DeleteOutlined, GlobalOutlined, MessageOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import styles from './index.less';
import ha from '../../utils/ha'
import { IBookmark } from './interface/type'

import CreateMark from './components/CreateMark'
import SearchPanel from './components/SearchPanel'
import ListBookMark from './components/ListBookMark';

const { TabPane } = Tabs;

let source = new Array<IBookmark>()


const HomePage: React.FC = () => {

  const [activeKey, setActiveKey] = useState('')
  const [data, setData] = useState<Array<IBookmark>>([])
  const [categories, setCategories] = useState<Array<string>>([])

  const setSource = (list: any) => {
    // 倒序
    list.sort((a: any, b: any) => {
      const t1 = a.time || 0
      const t2 = b.time || 0
      const v = t1 > t2 ? -1 : (t1 < t2 ? 1 : 0)
      return v
    })

    source = list.map((ele: IBookmark) => {
      const url = new URL(ele.url)
      let time = ele.time ? new Date(ele.time).toLocaleString() : ''
      return {
        host: url.host,
        hostname: url.hostname,
        name: ele.name,
        url: ele.url,
        origin: url.origin,
        category: ele.category,
        time
      }
    })
    setCategories(Array.from(new Set(list.map((ele: any) => ele.category))))
    tabsChange(activeKey)
  }

  useEffect(() => {
    ha.httpGet('/api/bookmark').then((list: any) => {
      setSource(list)
      document.querySelector('.ant-page-header-heading-left')?.addEventListener('click', (ev) => {
        ha.hassToggleMenu()
      }, false)
    })
  }, [])

  const tabsChange = (key: string) => {
    setActiveKey(key)
    setData(ha.jsonClone(key ? source.filter(ele => ele.category === key) : source))
  }

  const onOk = (list: any) => {
    setSource(list)
  }

  const deleteClick = (url: string) => {

    if (!top?.confirm("确定删除？")) return;

    ha.httpDelete('/api/bookmark', { url }).then((list: any) => {
      setSource(list)
      message.info('删除成功')
    })
  }

  return (
    <>
      <Affix offsetTop={0}>
        <PageHeader
          className={styles.PageHeader}
          avatar={{ src: 'https://www.home-assistant.io/images/favicon-192x192.png' }}
          title="书签"
          extra={[
            <CreateMark key="add" options={categories.map(ele => {
              return { value: ele }
            })} onOk={onOk} />,
            <SearchPanel
              key="search"
              source={source}
            />,
          ]}
        />
      </Affix>
      <Tabs className={styles.tabs} activeKey={activeKey} centered onChange={tabsChange}>
        <TabPane tab="全部" key="">
        </TabPane>
        {
          categories.map(item => <TabPane tab={item} key={item}></TabPane>)
        }
      </Tabs>
      <ListBookMark className={styles.CommentList} source={data} deleteClick={deleteClick} />
    </>
  );
};

export default HomePage;
