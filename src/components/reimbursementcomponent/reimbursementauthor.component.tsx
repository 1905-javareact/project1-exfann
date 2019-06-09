import React from 'react'
import { Reimbursement } from '../../models/reimbursement';
import { User } from '../../models/user';
import { ersClient } from '../../axios/ers-client';
import { connect } from 'react-redux';
import { IState } from '../../reducers';

interface IReimState{
    // allUserKeys:any
    reims:Reimbursement[]
    errorMessage: string
    currentUser: User
    author:number
    path:string
    res:number
    // reimId: number
    // author: number
    // dateSubmit: string
    // dateResolve: string
    // description: string
    // email:string,
    // resolver: number
    // status: string


}

export class ReimByAuthorComponent extends React.Component<any, IReimState> {
    constructor(props){
        super(props);
        this.state = {
            // allUserKeys:[],
            reims:[],
            errorMessage: '',
            currentUser: undefined,
            author: null,
            path:undefined,
            res:undefined
            // buttonClick: undefined
        }
    }

    getReimsByAuthor = async (lkafdsflkjd) => {
        console.log(`reims by status`)

        try{
            console.log(this.props.location.pathname)
            const response = await ersClient.get(`/reimbursements/author/userId/${lkafdsflkjd}`)
            if(response.status === 401){
                this.setState({
                    errorMessage:'Invalid Credentials'
                })
            } else if( response.status === 200){
                const reimbursements = await response.data
                const reims = reimbursements.map((reim)=> {
                    //console.log(user.role[0].roleId)
                    return(
                        <tr>
                            <td>{reim.reimbursementId}</td>
                            <td>{reim.author}</td>
                            {/* <td>{user.password}</td> */}
                            <td>{reim.amount}</td>
                            <td>{reim.dateSubmitted}</td>
                            <td>{reim.dateResolved}</td>
                            {/* <td>{user.role[0].roleId}</td> */}
                            <td>{reim.description}</td>
                            <td>{reim.resolver}</td>
                            {/* <td>{reim.status.status}</td> */}
                            <td>
                                <select name="status" disabled = {(this.props.currentUser.role[0].roleId !== 1 && this.props.currentUser.role[0].roleId !==2) || reim.status.statusId != 1} onChange ={this.updateRes} value = {this.state.res}>
	                                <option value= {1} >pending</option>
	                                <option value= {2} >approved</option>
	                                <option value= {3} >denied</option>
	                            </select>
                            </td>
                            <td>{reim.type.type}</td>
                            <td><button
                            disabled = {(this.props.currentUser.role[0].roleId !== 1 && this.props.currentUser.role[0].roleId !==2) && (this.props.currentUser.userId !== reim.author)}
                            onClick={() => {
                                // this.props.history.push(`/reimbursements/${reim.reimbursementId}`)
                                this.setState({
                                    path: `/reimbursements/${reim.reimbursementId}`
                                })
                                }
                            }>Select</button></td>
                            <td><button
                            disabled = {(this.props.currentUser.role[0].roleId !== 1 && this.props.currentUser.role[0].roleId !==2) && (this.props.currentUser.userId !== reim.author)}
                            onClick={this.updateSubmit}>Submit</button></td>
                            
                        </tr>
                    )
                    
                })
                this.setState({
                    reims:reims
                    // allUserKeys:allUserKeys
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    componentDidMount(){
        this.getReimsByAuthor(1) 
    }

    updateStatus = (event) => {
        this.setState({
            author: event.target.value
        })
        this.props.history.push(`/reimbursements/author/userId/${event.target.value}`)
        // console.log(`/reimbursements/status/${event.target.value}`)
        this.getReimsByAuthor(event.target.value)
        // this.getReimsByStatus()
    }


    switchSort = (event) => {
        if(event.target.value == 1){
            this.props.history.push(`/reimbursements/status`)
        }

    }

    updateSubmit = (event)=>{
        event.preventDefault()
        let date = new Date().toLocaleDateString()
        let resolve = this.props.currentUser.role[0].roleId
        this.submit(date, resolve ,this.state.res)
    }

    submit = async (resolved: string, resolver:number, status:number) =>{
        const creds = {
            resolved: resolved,
            resolver: resolver,
            status: status
        }

        const response = await ersClient.patch(this.state.path, creds)
        console.log(response)

    }

    updateRes = (event)=>{
        

        this.setState({
            res: event.target.value
        })

    }


    render(){
        //this.getAllUsers() || 'nouser'
        console.log(this.props.location.pathname)
        return(
            <div>
                <select name="author" onChange={this.switchSort}>
                    <option value = {2}>Author</option>
                    <option value = {1}>Status</option>
                </select>
                <select name="status" disabled = {this.props.currentUser.role[0].roleId !== 1 && this.props.currentUser.role[0].roleId !== 2}  onChange={this.updateStatus} value = {this.state.author} >
	                <option value= {1} >exfann</option>
	                <option value= {2} >gloomstorm</option>
	                <option value= {3} >braxie</option>
                    <option value= {4} >mothman</option>
                    <option value= {5} >banshee</option>
	            </select>
                <p>{this.state.author}</p>
                {/* <p>{this.state.allUsers.length > 0 && this.state.allUsers[1].userId}</p> */}
                <table className = 'table'>
                    <thead>
                        <tr>
                            <th>Reimbursement Id</th>
                            <th>Author</th>
                            <th>Amount</th>
                            <th>Date Sumbitted</th>
                            <th>Date Resolved</th>
                            <th>Description</th>
                            <th>Resolver</th>
                            <th>Status</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reims}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state:IState) =>{
    return {
        currentUser: state.login.currentUser
    }
}

export default connect(mapStateToProps)(ReimByAuthorComponent)