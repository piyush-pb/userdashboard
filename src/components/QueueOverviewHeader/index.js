import React from 'react'
import './UsersOverviewHeader.css'

const UsersOverviewHeader = (props) =>{
    return (
        <div className='UsersOverviewHeader-Container'>
            <div className='UsersOverviewHeader-left'>
                <div className='UsersOverviewHeader-open-button'/>
                users name
            </div>
            <div className='UsersOverviewHeader-right'>
                <div className='UsersOverviewHeader-label'>
                    active
                </div>
                <div className='UsersOverviewHeader-label'>
                    completed
                </div>
                <div className='UsersOverviewHeader-label'>
                    failed
                </div>
                <div className='UsersOverviewHeader-label'>
                    waiting
                </div>
                <div className='UsersOverviewHeader-label'>
                    delayed
                </div>
                <div className='UsersOverviewHeader-label-xl'>
                    success ratio
                </div>
            </div>
        </div>
    )
}

export default UsersOverviewHeader