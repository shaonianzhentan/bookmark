import { Modal, Button, Form, Input, AutoComplete, FormInstance, message } from 'antd';
import { PlusOutlined, GlobalOutlined, MessageOutlined } from '@ant-design/icons';
import React, { PropsWithChildren, useState, createRef } from 'react';
import ha from '../../../utils/ha'

interface IOption {
    value: string
}

interface CreateFormProps {
    onOk: (data: any) => void;
    options: Array<IOption>
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
    const form = createRef<FormInstance>()
    const [visible, setVisible] = useState(false)
    const { onOk, options } = props;
    const okClick = () => {
        form.current?.submit()
    }
    const onFinish = (data: any) => {
        ha.httpPost('/bookmark-api', data).then((res: any) => {
            onOk(res)
            setVisible(false)
            message.info('保存成功');
        })
    }
    return (
        <>
            <Modal
                destroyOnClose
                title="新增书签"
                width={420}
                visible={visible}
                onOk={okClick}
                onCancel={() => setVisible(false)}
            >
                <Form
                    ref={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: '请输入名称' }]}
                    >
                        <Input prefix={<MessageOutlined />} placeholder="名称" />
                    </Form.Item>
                    <Form.Item
                        name="url"
                        rules={[{ required: true, message: '请输入网址' }]}
                    >
                        <Input
                            prefix={<GlobalOutlined />}
                            placeholder="网址"
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        rules={[{ required: true, message: '请输入分类' }]}
                    >
                        <AutoComplete
                            options={options}
                            placeholder="分类"
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setVisible(true)} />
        </>
    );
};

export default CreateForm;
