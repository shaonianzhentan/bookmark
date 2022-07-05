import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Space, Card, Input } from 'antd';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost
      extra={[
        <Input key="0" placeholder="搜索关键词" />,
        <Button key="3">操作</Button>,
        <Button key="2">操作</Button>,
        <Button key="1" type="primary">
          主操作
        </Button>,
      ]}
    >
      <div className={styles.container}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <ProCard
            title="学习"
            extra="2019年9月28日"
            headerBordered
            split="vertical"
          >
            <ProCard title="运行中试验">12/56</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
          </ProCard>

          <ProCard
            title="学习"
            extra="2019年9月28日"
            headerBordered
          >
          </ProCard>
        </Space>
      </div>
    </PageContainer>
  );
};

export default HomePage;
