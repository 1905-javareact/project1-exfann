import React from 'react'
import { User } from '../../models/user';

interface IUserState{
    allUserKeys:any[]
    allUsers:User[]
    errorMessage: string
}

export class UserComponent extends React.Component<any, IUserState> {
    constructor(props){
        super(props);
        this.state = {
            allUserKeys:[],
            allUsers:[],
            errorMessage: ''
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
    
            const response = await fetch('http://localhost:9050/users', {
                method: 'GET',
                credentials: 'include',
                headers:{
                    'content-type': 'application/json'
                }
            })
    
            // console.log(response);
    
            if(response.status === 401){
                this.setState({
                    errorMessage:'Invalid Credentials'
                })
            } else if( response.status === 200){
                const Users = await response.json()
                // const Test = Users.map((user)=>user)
                // console.log(Test)
                //console.log(Object.keys(Users[0])
                const allUserKeys = Object.keys(Users[0]).map((user)=>{
                    return(
                        <tr>
                            {user}
                        </tr>
                    )
                })
                const allUsers = Users.map((user)=> {
                    //console.log(user.role[0].roleId)
                    return(
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role[0].roleId}</td>
                            <td>{user.role[0].role}</td>
                        </tr>
                    )
                })
                
                // this.props.history.push('/chuck-norris')
                console.log(allUsers)
                console.log(allUsers[1])
                this.setState({
                    allUsers:allUsers,
                    allUserKeys:allUserKeys
                })
                
            } else {
                document.getElementById('error-message').innerText = 'You Can\'t login right now'
            }        
        } catch(err){
            console.log(err);        
        }
    }

    componentDidMount(){
        this.getAllUsers() 
    }

    render(){
        //this.getAllUsers() || 'nouser'
        return(
            <div>
                <p>{this.state.allUsers.length > 0 && this.state.allUsers[1].userId}</p>
                <table>
                    <thead>
                        {this.state.allUserKeys}
                    </thead>
                    <tbody>
                        {this.state.allUsers}
                    </tbody>
                </table>
            </div>
        )
    }
}