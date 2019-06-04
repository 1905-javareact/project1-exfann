import React from 'react'
import { User } from '../../models/user';
import { ersClient } from '../../axios/ers-client';
import { connect } from 'react-redux';
import { IState } from '../../reducers';

interface IUserState{
    // allUserKeys:any
    allUsers:User[]
    errorMessage: string
    currentUser: User
    // buttonClick: (id) => void
}

export class UserComponent extends React.Component<any, IUserState> {
    constructor(props){
        super(props);
        this.state = {
            // allUserKeys:[],
            allUsers:[],
            errorMessage: '',
            currentUser: undefined,
            // buttonClick: undefined

        }
    }

    getAllUsers = async ()=>{
        //event.preventDefault()
        console.log('getting all users')
        // const username = this.state.username
        // const password = this.state.password
    
        // const credentials = {
        //     username,
        //     password
        // }
    
        try{
    
            const response = await ersClient.get('/users')

    
            // console.log(response);
    
            if(response.status === 401){
                this.setState({
                    errorMessage:'Invalid Credentials'
                })
            } else if( response.status === 200){
                const Users = await response.data
                // const Test = Users.map((user)=>user)
                // console.log(Test)
                //console.log(Object.keys(Users[0])
                // const allUserKeys = Object.keys(Users[0]).map((user)=>{
                //     return(
                //         <thead>
                //         <tr>
                //             <th>{user}</th>
                //         </tr>
                //         </thead>
                //     )
                // })
                // const allUserKeys = ()=>{
                //     return(
                //         <thead>
                //             <tr>
                                // <th>User ID</th>
                                // <th>Username</th>
                                // <th>First Name</th>
                                // <th>Last Name</th>
                                // <th>Email</th>
                                // <th>Role</th>
                //             </tr>
                //         </thead>
                //     )
                // }
                const allUsers = Users.map((user)=> {
                    //console.log(user.role[0].roleId)
                    return(
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            {/* <td>{user.password}</td> */}
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.role[0].roleId}</td> */}
                            <td>{user.role[0].role}</td>
                            <td><button
                            disabled = {this.props.currentUser.role[0].roleId !== 1 && this.props.currentUser.role[0].roleId !==2}
                            onClick={() => {this.props.history.push(`/users/${user.userId}`)}}>View</button></td>
                        </tr>
                    )
                })
                
                // this.props.history.push('/chuck-norris')
                console.log(allUsers)
                console.log(allUsers[1])
                this.setState({
                    allUsers:allUsers,
                    // allUserKeys:allUserKeys
                })
                
            } else {
                document.getElementById('error-message').innerText = 'You Can\'t login right now'
            }        
        } catch(err){
            console.log(err);        
        }
    }

    
    // buttonClick = (id) => {
    //     //this.props.incrementClicks(-100)
    //     this.props.history.push(`/users/${id}`)
    // }

    componentDidMount(){
        this.getAllUsers() 
    }

    render(){
        //this.getAllUsers() || 'nouser'
        console.log(this.props.location.pathname)
        return(
            <div>
                <p>{this.state.allUsers.length > 0 && this.state.allUsers[1].userId}</p>
                <table className = 'table'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allUsers}
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

export default connect(mapStateToProps)(UserComponent)