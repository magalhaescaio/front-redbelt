import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Form, Input, Button } from 'antd'
import { CheckOutlined,  CloseOutlined } from '@ant-design/icons'

import Loading from './../../components/Loading'
import getIncident from '../../services/getIncident'

const initialState = {
    loading: false,

}

class ViewIncidentModal extends Component {
    constructor(props){
        super(props)

        this.state =  initialState
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

    

    render(){
        const { t } = this.props
        const { loading, incident } = this.state

        return(
            <>
                {loading
                    ?   <Loading />
                    :   <>
                            {!incident
                                ?   <></>
                                :   <>
                                        <Form
                                            name="New incident"
                                            labelCol={{ span: 5 }}
                                            wrapperCol={{ span: 19 }}
                                            initialValues={{ remember: true }}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                label={t("Title")}
                                                name="title"
                                            >
                                                <Input defaultValue={incident.title} readOnly />
                                            </Form.Item>

                                            <Form.Item
                                                label={t("Description")}
                                                name="description"
                                            >
                                                <Input defaultValue={incident.description} readOnly />
                                            </Form.Item>

                                            <Form.Item
                                                label={t("Criticality")}
                                                name="criticality"
                                            >
                                                <Input defaultValue={t(incident.criticality)} readOnly />
                                            </Form.Item>

                                            <Form.Item
                                                label={t("Type")}
                                                name="type"
                                            >
                                                <Input defaultValue={t(incident.type)} readOnly />
                                            </Form.Item>  

                                            <Form.Item
                                                label={t("Created")}
                                                name="created"
                                            >
                                                <Input defaultValue={incident.created_at ? new Date(incident.created_at).toLocaleDateString('pt-BR') : ''} readOnly />
                                            </Form.Item>  

                                            <Form.Item 
                                                name="status" 
                                                label={t("Status")}  
                                                valuePropName="checked"
                                            >
                                                {incident.status === 0 ? <span className="active-link"><CheckOutlined /> {t('Active')}</span> : <span className="inactive-link"><CloseOutlined /> {t('Inactive')}</span>}

                                            </Form.Item>

                                            {incident.deleted_at
                                                ?   <>
                                                        <Form.Item
                                                            label={t("deleted")}
                                                            name="deleted"
                                                        >
                                                            <Input defaultValue={incident.deleted_at ? new Date(incident.deleted_at).toLocaleDateString('pt-BR') : ''} readOnly />
                                                        </Form.Item>  

                                                    </>
                                                :   <></>
                                            }
                                           

                                            <Form.Item wrapperCol={{ offset: 20, span: 5 }}>
                                                <Button type="primary" danger ghost onClick={() => this.props.closeModal()}>
                                                    {t("Close")}
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </>
                            }
                        </>
                }
            </>
        )
    }
}

export default withTranslation()(ViewIncidentModal)