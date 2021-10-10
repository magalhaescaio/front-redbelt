import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Form, Input, Button, Select, Switch  } from 'antd'
import { toast } from 'react-toastify'

import Loading from './../../components/Loading'
import newIncident from './../../services/newIncident'

const initialState = {
    loading: false,

}

class NewIncidentModal extends Component {
    constructor(props){
        super(props)

        this.state =  initialState

        this.formRef = React.createRef()
    }

    reset = () => {
        const keys = Object.keys(this.state)
        const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {})
        this.setState({ ...stateReset, ...initialState })
    }


    UNSAFE_componentWillReceiveProps  = function(nextProps){
        setTimeout(() => {
            this.reset()
        }, 100) 
    }

    sendForm = async() => {

       const {title, description, criticality, type, status} = this.state

        const request = {
            "title": title,
            "description": description,
            "criticality": criticality,
            "type": type,
            "status": status ? 0 : 1,
        }

        this.setState({loading: true})

        const response = await newIncident(request)

        if(response.status === 200){
            toast.success(this.props.t("Incident successfully registered"), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            this.props.reloadIncidents()
            this.formRef.current.resetFields()
        }else{
            toast.error(this.props.t("Unable to record incident"), {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        this.setState({loading: false})
    }

    render(){
        const { t } = this.props
        const { loading } = this.state

        const onFinish = (values) => {
           this.sendForm()
        }
        
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo)
        }

        return(
            <>
                <Form
                    name="New incident"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    ref={this.formRef}

                >
                    {loading
                        ? <Loading />
                        :   <>
                                <Form.Item
                                    label={t("Title")}
                                    name="title"
                                    rules={[{ required: true, message: t("This field is required") }]}
                                >
                                    <Input onChange={(e) => this.setState({title: e.target.value})} />
                                </Form.Item>

                                <Form.Item
                                    label={t("Description")}
                                    name="description"
                                    rules={[{ required: true, message: t("This field is required") }]}
                                >
                                    <Input onChange={(e) => this.setState({description: e.target.value})} />
                                </Form.Item>

                                <Form.Item 
                                    name="criticality" 
                                    label={t("Criticality")} 
                                    rules={[{ required: true ,  message: t("This field is required") }]}
                                >
                                    <Select
                                        onSelect={(e) => this.setState({criticality: e})}
                                        allowClear
                                    >
                                        <Select.Option value="High">{t("High")}</Select.Option>
                                        <Select.Option value="Medium">{t("Medium")}</Select.Option>
                                        <Select.Option value="Low">{t("Low")}</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item 
                                    name="type" 
                                    label={t("Type")} 
                                    rules={[{ required: true ,  message: t("This field is required") }]}
                                >
                                    <Select
                                        onSelect={(e) => this.setState({type: e})}
                                        allowClear
                                    >
                                        <Select.Option value="Alarm">{t("Alarm")}</Select.Option>
                                        <Select.Option value="Incident">{t("Incident")}</Select.Option>
                                        <Select.Option value="Others">{t("Others")}</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item 
                                    name="status" 
                                    label={t("Status")}  
                                    valuePropName="checked"
                                >
                                    <Switch onChange={(e) => this.setState({status: e})} />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 16, span: 18 }}>
                                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                                        {t("Send")}
                                    </Button>

                                    <Button type="primary" danger ghost onClick={() => this.props.closeModal()}>
                                        {t("Cancel")}
                                    </Button>
                                </Form.Item>
                            </>
                    }
                </Form>
            </>
        )
    }
}

export default withTranslation()(NewIncidentModal)