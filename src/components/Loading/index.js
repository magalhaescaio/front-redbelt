import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import Loader from 'react-loader-spinner'

class Loading extends Component {
    render(){
        return(
            <div className="loading-container">
                <Loader
                    type="Oval"
                    color="#dc3513"
                    height={50}
                    width={130}
                />
            </div>
        )
    }
}

export default withTranslation()(Loading)