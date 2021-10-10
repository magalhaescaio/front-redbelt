import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Button } from 'antd'
import { toast } from 'react-toastify'

import { PoweroffOutlined } from '@ant-design/icons'

import deleteIncident from '../../services/deleteIncident'

const initialState = {

}

class DeleteIncidentModal extends Component {
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
        }, 100) 
    }


    UNSAFE_componentWillReceiveProps  = function(nextProps){
        setTimeout(() => {
            this.reset()
            this.setState({id: this.props.id})
        }, 100) 
    }
    
    removeIncident = async() => {
    
        this.setState({loading: true})
        const response = await deleteIncident(this.state.id)
        this.props.closeModal()
        this.props.reloadIncidents()

        if(response.status === 200){
            toast.success(this.props.t("Incident deleted"), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }else{
            toast.error(this.props.t("Unable to delete incident"), {
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

        return(
            <center>
                {t("Are you sure you want to delete this record?")}
                <br /><br />
                <Button loading={this.state.loading ? true : false} type="primary" htmlType="submit" style={{marginRight: '10px'}} onClick={() => this.removeIncident()}>
                    {t("Sim")}
                </Button>

                <Button disabled={this.state.loading ? true : false} type="primary" danger ghost  style={{marginRight: '10px'}} onClick={() => this.props.closeModal()}>
                    {t("Não")}
                </Button>
            </center>
        )
    }
}

export default withTranslation()(DeleteIncidentModal)