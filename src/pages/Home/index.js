import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Button, Row, Col, Input, Pagination, Modal } from 'antd'
import DataTable from 'react-data-table-component'
import { CheckOutlined,  CloseOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, InfoCircleOutlined } from '@ant-design/icons'
import ReactTooltip from 'react-tooltip'

import Layout from './../../components/Layout'
import Loading from './../../components/Loading'
import getIncidents from './../../services/getIncidents'

import NewIncidentModal from './newIncidentModal'
import ViewIncidentModal from './viewIncidentModal'
import EditIncidentModal from './editIncidentModal'
import DeleteIncidentModal from './deleteIncidentModal'

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            loadingIncidents: false,
            incidents: [],
            page: 1
        }
    }

    async componentDidMount(){
        await this.searchIncidents()

    }

    searchIncidents = async(page) => {
        const { search_value } = this.state

        var params = "?"

        if(page){params += "page="+page+"&"}
        if(search_value){params += "search="+search_value}

        this.setState({loadingIncidents: true})

        const response = await getIncidents(params)
        var incident_data = response.data.data

        this.setState({incidents: incident_data.data})
        this.setState({current_page: incident_data.current_page})
        this.setState({from: incident_data.from})
        this.setState({last_page: incident_data.last_page})
        this.setState({to: incident_data.to})
        this.setState({total: incident_data.total})


        this.setState({loadingIncidents: false})
    }

    onSearch = async(value) => {
        await this.setState({search_value: value})

        this.searchIncidents(1)       
    }

    callModalNewIncident = () => {
        this.setState({newIncidentModal: true})
    }

    callModalViewIncident = (id) => {
        this.setState({viewIncidentModal: true})
        this.setState({id_ref: id})
    }

    callModalEditIncident = (id) => {
        this.setState({editIncidentModal: true})
        this.setState({id_ref: id})
    }

    callModalDeleteIncident = (id) => {
        this.setState({deleteIncidentModal: true})
        this.setState({id_ref: id})
    }

   

    render(){
        const { t } = this.props
        const { page, loadingIncidents, incidents, total, newIncidentModal, editIncidentModal, viewIncidentModal, deleteIncidentModal } = this.state

        const columns = [
            {
                name: t("Title"),
                selector: 'title',
                cell: row => {
                    return(<span className={`${row.deleted_at ? 'deleted': ''}`}>{row.title}</span>)
                }
            },
            {
                name: t("Description"),
                selector: 'description',
                cell: row => {
                    return(<span className={`description ${row.deleted_at ? 'deleted': ''}`}>{row.description}</span>)
                }
            },
            {
                name: t("Status"),
                selector: 'status',
                cell: row => {
                    return(
                        <>
                            {row.status === 0 ? <span className="active-link"><CheckOutlined /> {t('Active')}</span> : <span className="inactive-link"><CloseOutlined /> {t('Inactive')}</span>}
                        </>
                    )
                }
            },
            {
                name: t("Type"),
                selector: 'type',
                cell: row => {
                    return(<span className={`${row.deleted_at ? 'deleted': ''}`}>{t(row.type)}</span>)
                }
            },
            {
                name: t("Criticality"),
                selector: 'criticality',
                cell: row => {
                    return(<span className={`${row.deleted_at ? 'deleted': ''}`}>{t(row.criticality)}</span>)
                }
            },
            {
                name: t("Created"),
                selector: 'created_at',
                cell: row => {
                    return(<span className={`${row.deleted_at ? 'deleted': ''}`}> {row.created_at ? new Date(row.created_at).toLocaleDateString('pt-BR') : ''}</span>)
                    
                }
            },
            {
                name: '',
                selector: 'action',
                width: '100px',
                cell: row => {
                    return(
                        <>
                            <span data-tip='' data-for='View' id_atr={row.id} onClick={() => this.callModalViewIncident(row.id)}>
                                <EyeOutlined className="table-action-icon"  style={{ color: '#5db027' }}/>
                            </span>
                            <ReactTooltip id='View'>{t("View")}</ReactTooltip>

                            {row.deleted_at
                                ?   <>  &nbsp;
                                        <span data-tip='' data-for='Info' id_atr={row.id}>
                                            <InfoCircleOutlined className="table-action-icon" style={{ color: '#FF5733' }}/>
                                        </span>
                                        <ReactTooltip id='Info'>{t("This incident has been deleted")} {row.deleted_at ? new Date(row.deleted_at).toLocaleDateString('pt-BR') : ''}</ReactTooltip>
                                    </>   
                                :   <></>
                            }

                            {row.deleted_at
                                ?   <></>   
                                :   <>
                                        <span data-tip='' data-for='Edit' id_atr={row.id} onClick={() => this.callModalEditIncident(row.id)}>
                                            <EditOutlined className="table-action-icon" style={{ color: '#08c' }}/>
                                        </span>
                                        <ReactTooltip id='Edit'>{t("Edit")}</ReactTooltip>
                                    </>
                            }

                            {row.deleted_at
                                ?   <></>   
                                :   <>
                                        <span data-tip='' data-for='Delete' id_atr={row.id} onClick={() => this.callModalDeleteIncident(row.id)}>
                                            <DeleteOutlined className="table-action-icon" style={{ color: '#b03e27 ' }}/>
                                        </span>
                                        <ReactTooltip id='Delete'>{t("Delete")}</ReactTooltip>
                                    </>
                            }
                           
                        </>
                    )
                }
            }

        ]

        const renderTable = () => {
            return(
                <>
                    <DataTable
                        columns={columns}
                        data={incidents}
                    />

                    
                </>
            )
        }

        return(
            <>
                <Layout>
                    <Card title={t("Incidents")}>
                        <Row style={{marginBottom: '20px'}}>
                            <Col style={{textAlign: 'left'}} span={6}>
                                <Button type="primary" onClick={() => this.callModalNewIncident()}>{t('Add new incident')}</Button>
                            </Col>

                            <Col style={{textAlign: 'right'}} span={18}>
                                <Input 
                                    placeholder={t("Search any value")} 
                                    onPressEnter={(e) => this.onSearch(e.target.value)} 
                                    style={{ width: 250 }} 
                                    suffix={
                                        <SearchOutlined style={{ fontSize: 18, color: '#1890ff', }} />
                                    }
                                />
                            </Col>
                        </Row>

                        {loadingIncidents 
                            ? <Loading /> 
                            : renderTable()
                        }

                        <Pagination style={{marginTop: '20px'}} defaultCurrent={page} total={total} onChange={(page) => this.searchIncidents(page)}/>

                        <Modal title={t("Add new incident")} visible={newIncidentModal} footer={null} onCancel={() => this.setState({newIncidentModal: false})}>
                            <NewIncidentModal 
                                reloadIncidents={() => [this.setState({newIncidentModal: false}), this.searchIncidents()]} 
                                closeModal={() => this.setState({newIncidentModal: false})}
                            />
                        </Modal>

                        <Modal title={t("View incident")} visible={viewIncidentModal} footer={null} onCancel={() => this.setState({viewIncidentModal: false})}>
                            <ViewIncidentModal 
                                reloadIncidents={() => [this.setState({viewIncidentModal: false}), this.searchIncidents()]} 
                                closeModal={() => this.setState({viewIncidentModal: false})}
                                id={this.state.id_ref}
                            />
                        </Modal>

                        <Modal title={t("Edit incident")} visible={editIncidentModal} footer={null} onCancel={() => this.setState({editIncidentModal: false})}>
                            <EditIncidentModal 
                                reloadIncidents={() => [this.setState({editIncidentModal: false}), this.searchIncidents()]} 
                                closeModal={() => this.setState({editIncidentModal: false})}
                                id={this.state.id_ref}
                            />
                        </Modal>

                        <Modal title={t("Delete incident")} visible={deleteIncidentModal} footer={null} onCancel={() => this.setState({deleteIncidentModal: false})}>
                            <DeleteIncidentModal 
                                reloadIncidents={() => [this.setState({deleteIncidentModal: false}), this.searchIncidents()]} 
                                closeModal={() => this.setState({deleteIncidentModal: false})}
                                id={this.state.id_ref}
                            />
                        </Modal>
                    </Card>
                </Layout>
            </>
        )
    }
}

export default withTranslation()(Home)