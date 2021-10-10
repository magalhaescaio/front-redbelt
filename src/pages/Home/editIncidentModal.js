import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Form, Input, Button, Select, Switch  } from 'antd'
import { toast } from 'react-toastify'

import Loading from './../../components/Loading'
import getIncident from '../../services/getIncident'
import editIncident from '../../services/editIncident'

const initialState = {
    loading: false,
    incident: {
        "title": ""
    }
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

    componentDidMount = async() => {
        setTimeout(() => {
            this.reset()
            this.setState({id: this.props.id})
            this.loadIncident()
        }, 100) 
    }


    UNSAFE_componentWillReceiveProps  = function(nextProps){
        setTimeout(() => {
            this.reset()
            this.setState({id: this.props.id})
            this.loadIncident()
        }, 100) 
    }
    

    loadIncident = async() => {
        this.setState({loading: true})

        const response = await getIncident(this.props.id)

        this.setState({incident: response.data.data})
        this.setState({loading: false})
    }


    editForm = async() => {

       const {title, description, criticality, type, status, id} = this.state.incident

        const request = {
            "title": title,
            "description": description,
            "criticality": criticality,
            "type": type,
            "status": status ? 0 : 1,
        }

       
        this.setState({loading: true})

        const response = await editIncident(request, id)

        if(response.status === 200){
            toast.success(this.props.t("Incident successfully edited"), {
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
            toast.error(this.props.t("Unable to edit incident"), {
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
           this.editForm()
        }
        
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo)
        }

        return(
            <>
                <Form
                    name="Edit incident"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
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
                                >
                                    <Input onChange={(e) => this.setState(state => (this.state.incident.title = e.target.value, state))} defaultValue={this.state.incident.title}  />
                                </Form.Item>

                                <Form.Item
                                    label={t("Description")}
                                    name="description"
                                >
                                    <Input onChange={(e) => this.setState(state => (this.state.incident.description = e.target.value, state))} defaultValue={this.state.incident.description} />
                                </Form.Item>

                                <Form.Item 
                                    name="criticality" 
                                    label={t("Criticality")} 
                                >
                                    <Select
                                        onSelect={(e) => this.setState(state => (this.state.incident.criticality = e, state))}
                                        allowClear
                                        defaultValue={this.state.incident.criticality}
                                    >
                                        <Select.Option value="High">{t("High")}</Select.Option>
                                        <Select.Option value="Medium">{t("Medium")}</Select.Option>
                                        <Select.Option value="Low">{t("Low")}</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item 
                                    name="type" 
                                    label={t("Type")} 
                                >
                                    <Select
                                        onSelect={(e) => this.setState(state => (this.state.incident.type = e, state))}
                                        defaultValue={this.state.incident.type}
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
                                >
                                    <Switch defaultChecked={this.state.incident.status === 0 ? true : false} onChange={(e) => this.setState({status: e})} />
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