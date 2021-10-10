import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Layout, Menu, Dropdown, Row, Col, Image } from 'antd'
import Flag from 'react-world-flags'

import locales from './../../constants/locales'
import LocaleContext from './../../contexts/locale'
import { DownOutlined } from '@ant-design/icons'

import Logo from './../../assets/images/logo.png'

class LayoutPage extends Component {
    static contextType = LocaleContext

    constructor(props){
        super(props)

        this.state = {

            lang: '',
            flag: ''
        }   
    }

    async componentDidMount(){
        this.setState({ lang: localStorage.getItem('@redbelt-lang') })

        this.setFlag()
    }

    changeLanguage = async (value) => {
        const { updateLocale } = this.context
        await updateLocale(value)
        this.setState({ lang: value })

        this.setFlag()
    }

    setFlag = () => {
        switch(this.state.lang){
            case 'pt':
                this.setState({flag: 'BR'})
            break;

            case 'en':
                this.setState({flag: 'USA'})
            break;

            default:
                this.setState({flag: 'BR'})
            break
        }
    }

    render(){

        const { children, t } = this.props
        const { lang, flag } = this.state

        const menu = (
            <Menu>
                {locales.map(({ label, locale, flag }, index) => (
                    <Menu.Item
                        key={index}
                        onClick={() => this.changeLanguage(locale)}
                    >
                         <Flag height="10" style={{marginTop: '-4px', marginRight: '5px'}} code={flag} />
                        {t(label)}
                    </Menu.Item>
                ))}
            </Menu>
        )

        return(
            <>
                <Layout>
                    <Layout.Header>
                        <Row className="container">
                            <Col style={{textAlign: 'right', color: 'white'}} span={2}>
                                <div className="logo">
                                    <Image preview={false} src={Logo} width={150} />
                                </div>
                            </Col>

                            <Col style={{textAlign: 'right', color: 'white'}} span={22}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <span className="ant-dropdown-link" style={{cursor: 'pointer'}} onClick={e => e.preventDefault()}>
                                        <Flag height="10" style={{marginTop: '-4px', marginRight: '5px'}} code={flag} />
                                        {t(lang)} <DownOutlined />
                                    </span>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Layout.Header>

                    <Layout.Content style={{ padding: '50px' }} className="container"> <div className="site-layout-content">{children}</div> </Layout.Content>

                    <Layout.Footer style={{ textAlign: 'center' }} className="container">by <a href="https://github.com/magalhaescaio" target="_blank">Caio Magalhães</a> </Layout.Footer>
                </Layout>  
            </>
        )
    }
}

export default withTranslation()(LayoutPage)