import React,{useEffect,useReducer, useState} from 'react'
import StatBox from '../StatBox'
import UsersOverview from '../UsersOverview'
import UsersOverviewHeader from '../UsersOverviewHeader'
import './AllUserssPage.css';
import forwardIcon from '../../icons/forward.svg'


const initialState={
    allUserss: [],
    totalUserssConnected: 0,
    totalActiveJobs: 0,
    totalCompletedJobs: 0,
    totalFailedJobs: 0,
    totalWaitingJobs: 0,
    totalDelayedJobs: 0,
}

const reducer=(state,action)=>{
    switch(action.type){
        case 'setAllUserss':
            return {...state, allUserss:action.data}
        case 'setTotalUserssConnected':
            return {...state, totalUserssConnected:action.data}
        case 'setTotalActiveJobs':
            return {...state, totalActiveJobs:action.data}
        case 'setTotalCompletedJobs':
            return {...state, totalCompletedJobs:action.data}
        case 'setTotalFailedJobs':
            return {...state, totalFailedJobs:action.data}
        case 'setTotalWaitingJobs':
            return {...state, totalWaitingJobs:action.data}
        case 'setTotalDelayedJobs':
            return {...state, totalDelayedJobs:action.data}
        case 'setAll':
            return action.data
        default:
            return state
    }
}

function AllUserssPage(props){

const [state,dispatch] = useReducer(reducer,initialState)
const [selectedUsers,setSelectedUsers] = useState(null)
const selectUsers = (usersName) => ()=>{
    setSelectedUsers(usersName)
}
const goToUsersPage=()=>{
    props.changePage(selectedUsers)
}
const getSuccessRatio = ()=>{
    if(state.totalCompletedJobs+state.totalFailedJobs === 0){
        return 'N/A'
    }
    const percentage = state.totalCompletedJobs * 100 / (state.totalCompletedJobs + state.totalFailedJobs)
    return `${Math.floor(percentage)} %`
}
useEffect(()=>{
    const apiUrl = process.env.NODE_ENV==='development' 
    ? `/` 
    : ''
    const fetchData = async () => {
         const resp = await fetch(`${apiUrl}api/getAllUserss`)
         const respBody = await resp.json()
         dispatch({type: 'setAll', data: respBody})
        }
    fetchData()
},[])
return (
    <div className='allUserss-container'>
        <div className='allUserss-statboxes-title'>Summary</div>
        <div className='allUserss-statboxes-row'>
        <StatBox type={'stat'} label={'Userss Connected'} value={state.totalUserssConnected}/>
        <StatBox type={'stat'} label={'Active Jobs'} value={state.totalActiveJobs}/>
        <StatBox type={'stat'} label={'Completed Jobs'} value={state.totalCompletedJobs}/>
        <StatBox type={'stat'} label={'Failed Jobs'} value={state.totalFailedJobs}/>
        <StatBox type={'stat'} label={'Success Ratio'} value={getSuccessRatio()}/>
        </div>
        <div className='allUserss-usersOverviews-container'>
            <UsersOverviewHeader/>
            <div className='allUserss-scrollable-container'>
            {
                state.allUserss.map((users)=>{
                    return (
                    <UsersOverview 
                    key={users.name} 
                    name={users.name} 
                    data={users.usersOverview} 
                    selectUsers={selectUsers(users.name)}/>
                    )
                })
            }
            </div>
        </div>
        <div className={`allUserss-anim-overlay ${selectedUsers?'show-overlay':''}`} onTransitionEnd={goToUsersPage}/>
        <img src={forwardIcon} className={`allUserss-anim-overlay-icon ${selectedUsers?'show-overlay':''}`} alt=''/>
    </div>
)
}

export default AllUserssPage