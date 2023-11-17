import React, {useState, useEffect} from 'react'
import './UsersDetailsPage.css'
import CategoriesTab from '../CategoriesTab'
import JobDetails from '../JobDetails'
import JobDetailsHeader from '../JobDetailsHeader'
import Search from '../Search'
import RedisStats from '../RedisStats'
import backIcon from '../../icons/back.svg'

function UsersDetailsPage(props){
    const initialState={
        allJobCountsByStatus:{
            waiting: 0,
            active: 0,
            completed: 0,
            failed: 0,
            delayed: 0
        },
        allJobsDetails:[]
    }
    const apiUrl = process.env.NODE_ENV==='development' 
    ? `/` 
    : ''
    const [jobData,setJobData] = useState(initialState)
    const [selectedCategory,setSelectedCategory] = useState('all')
    const [searchKey,setSearchKey] = useState('')
    const [searchValue,setSearchValue] = useState('')
    const [searchQuery,setSearchQuery] = useState('')
    const [showSearchResults,setShowSearchResults] = useState(false)
    const [searchResults, setSearchResults] = useState({})
    const [backBtnClicked,setBackBtnClicked] = useState(false)
    
    const triggerSearch = () => {
        setSearchQuery(`?skey=${searchKey}&sval=${searchValue}`)
        setShowSearchResults(true)
    }
    const clearSearch=()=>{
        setSearchQuery('')
        // setSearchKey('')
        // setSearchValue('')
        setShowSearchResults(false)
    }

    useEffect(()=>{
        fetch(`${apiUrl}api/viewUsersJobs/${props.usersName}/${selectedCategory}`)
        .then((response)=>response.json())
        .then((responseBody)=>{
            setJobData(responseBody)
            setShowSearchResults(false)
            setSearchQuery('')
            setSearchKey('')
            setSearchValue('')
        })
    },[selectedCategory]) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(showSearchResults){
        fetch(`${apiUrl}api/searchByField/${props.usersName}/${selectedCategory}/${searchQuery}`)
        .then((response)=>response.json())
        .then((responseBody)=>{
            setSearchResults({allJobsDetails:responseBody})
        })
    }
    else{
            setSearchResults({})
    }
    },[showSearchResults]) //eslint-disable-line react-hooks/exhaustive-deps

    const triggerAnim=()=>{
        setBackBtnClicked(true)
    }

    const changePage=()=>{
        if(backBtnClicked){
            props.changePage()
        }
    }

    const {allJobsDetails} = searchResults.hasOwnProperty('allJobsDetails')? searchResults : jobData
    return (
        <div className={`UsersDetailsPage-container ${backBtnClicked?'scalein':''}`} onTransitionEnd={changePage}>
            <div className='UsersDetailsPage-categories-tab'>
                <CategoriesTab selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} jobCounts={jobData.allJobCountsByStatus}/>
            </div>
            <div className='UsersDetailsPage-main-container'>
                <div className="UsersDetailsPage-title-row">
                    <div className='UsersDetailsPage-title'>
                        <img src={backIcon} className='UsersDetailsPage-back-btn' onClick={triggerAnim} alt='back'/>
                        {props.usersName}
                    </div>
                    <Search 
                            searchKey={searchKey}
                            setSearchKey={setSearchKey}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            triggerSearch={triggerSearch}
                            clearSearch={clearSearch}
                            showSearchResults={showSearchResults}
                    />
                </div>
                {   showSearchResults &&
                        <span className='UsersDetailsPage-search-subtitle'>Showing jobs which contain the selected key-value pair in their data object</span>
                    }
                <div className='UsersDetailsPage-jobs-container'>
                <JobDetailsHeader/>
                <div className='UsersDetailsPage-scrollable-container'>
                    {
                        allJobsDetails.length>0?
                    allJobsDetails.map((Monitor)=>{
                        return(
                            <>
                            <JobDetails key={Monitor.jobId} jobInstance={Monitor}/>
                            </>
                        )
                    }):
                    <div className='UsersDetailsPage-search-subtitle' style={{marginTop:'25px'}}>No jobs found</div>
                    }
                </div>
                </div>
            </div>
            <div className='UsersDetailsPage-overview-tab'>
           < RedisStats stats={jobData.redisStats}/>
            </div>
        </div>
    )
}

export default UsersDetailsPage