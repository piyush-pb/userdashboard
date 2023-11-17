import React from 'react'
import './UsersOverview.css'
import forwardIcon from '../../icons/forward.svg'

const UsersOverview = (props) =>{
    return (
        <div className='UsersOverview-Container'>
            <div className='UsersOverview-left'>
                <div className='UsersOverview-open-button' onClick={props.selectUsers}>
                    <img src={forwardIcon} className='UsersOverview-btn-icon' alt=''/>
                </div>
                {props.name}
            </div>
            <div className='UsersOverview-right'>
                <div className='UsersOverview-stat'>
                    <span>{props.data.active}</span>
                </div>
                <div className='UsersOverview-stat'>
                    <span style={{color:'#7FE3CB'}}>{props.data.completed}</span>
                </div>
                <div className='UsersOverview-stat'>
                    <span style={{color:'#F87A7C', fontWeight:'bold'}}>{props.data.failed}</span>
                </div>
                <div className='UsersOverview-stat'>
                    <span>{props.data.waiting}</span>
                </div>
                <div className='UsersOverview-stat'>
                    <span>{props.data.delayed}</span>
                </div>
                <div className='UsersOverview-chart'>
                    {props.data.completed+props.data.failed===0
                    ? 0
                    : Math.floor(props.data.completed/(props.data.completed+props.data.failed) * 100)}%
                </div>
            </div>
        </div>
    )
}

export default UsersOverview