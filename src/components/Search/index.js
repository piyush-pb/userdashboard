import React from 'react'
import './Search.css'
import searchIcon from '../../icons/search.png'
import closeIcon from '../../icons/close.png'

const Search = (props)=>{
    return(
        <div className='UsersDetailsPage-search-container'>
             <div className='UsersDetailsPage-search-fields-container'>
                    <input 
                    type='text' 
                    className='UsersDetailsPage-search-field-input' 
                    placeholder='Key' 
                    value={props.searchKey}
                    onChange={e=>props.setSearchKey(e.target.value)}
                    />
                    <input 
                    type='text' 
                    className='UsersDetailsPage-search-field-input' 
                    placeholder='Value' 
                    value={props.searchValue}
                    onChange={e=>props.setSearchValue(e.target.value)}
                    />
            </div>
            {!props.showSearchResults?
                <div className='UsersDetailsPage-search-button' onClick={props.triggerSearch}>
                    <img src={searchIcon} className='UsersDetailsPage-search-btn-icon' alt=''/>
                </div>
                :
                <div className='UsersDetailsPage-search-button' onClick={props.clearSearch}>
                    <img src={closeIcon} className='UsersDetailsPage-search-btn-icon' alt=''/>
                </div>
                }
        </div>
    )
}


export default Search