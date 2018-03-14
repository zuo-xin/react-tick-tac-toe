import React from 'react'
import styles from '../css/index.scss'

class Square extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <button className={styles.square} onClick={()=>this.props.onClick()}>{this.props.value}</button>
        )
    }
}

export default Square