import React from 'react'
import { User } from '../../models/user';
import { ersClient } from '../../axios/ers-client';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { async } from 'q';

interface IUserState{
    // allUserKeys:any
    //allUsers:User[]
    errorMessage: string
    userId: number
    username: string
    password: string
    firstName: string
    lastName: string
    email:string,
    role: number

}

export class UserByIdComponent extends React.Component<any, IUserState> {
    constructor(props){
        super(props);
        this.state = {
            // allUserKeys:[],
            //allUsers:[],
            errorMessage: '',
            userId: 0,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            role: 0
        }
    }

    getAllUsers = async ()=>{

    
        try{
    
            const response = await ersClient.get(`${this.props.location.pathname}`)
    
            if(response.status === 401){
                this.setState({
                    errorMessage:'Invalid Credentials'
                })
            } else if( response.status === 200){
                const Users = await response.data
                
                Users.map((user) => {
                    this.setState({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role[0].roleId
                        })
                })
                
            } else {
                document.getElementById('error-message').innerText = 'something bad happened'
            }        
        } catch(err){
            console.log(err);        
        }
    }

    updateSubmit = (event)=>{
        event.preventDefault()
        this.submit(this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.email, this.state.role)
    }

    submit = async (username: string, password:string, firstname:string, lastname:string, email:string, role:number) =>{
        const creds = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email,
            role_id: role
        }

        const response = await ersClient.patch(`${this.props.location.pathname}`, creds)

        response.data.map((user) => {
            this.setState({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role[0].roleId
                })
        })

    }

    updateUsername = (event) => {
        //console.log(event)
        this.setState({
            username: event.target.value
        })
    }

    updatePassword = (event) => {
        //console.log(event)
        this.setState({
            password: event.target.value
        })
    }

    updateFirstName = (event) => {
        //console.log(event)
        this.setState({
            firstName: event.target.value
        })
    }
    updateLastName = (event) => {
        //console.log(event)
        this.setState({
            lastName: event.target.value
        })
    }
    updateEmail = (event) => {
        //console.log(event)
        this.setState({
            email: event.target.value
        })
    }

    updateRole = (event) => {
        console.log(`before: ${this.state.role}`)
        this.setState({
            role: event.target.value
        })
        console.log(`after: ${this.state.role}`)
    }

    componentDidMount(){
        this.getAllUsers() 
    }

    render(){
        //this.getAllUsers() || 'nouser'
        console.log(this.props.history)
        return(
            <form className="form-signin text-center" onSubmit={this.updateSubmit}>
                            <input type="text" id="inputUsername" disabled = {this.props.currentUser.role[0].roleId !== 1} className="form-control" value={this.state.username} onChange={this.updateUsername}/>
                            <input type="password" id="inputPassword" disabled = {this.props.currentUser.role[0].roleId !== 1} className="form-control" value={this.state.password} onChange={this.updatePassword}/>
                            <input type="text" id="inputFirstName" disabled = {this.props.currentUser.role[0].roleId !== 1} className="form-control" value={this.state.firstName} onChange={this.updateFirstName}/>
                            <input type="text" id="inputLastName" disabled = {this.props.currentUser.role[0].roleId !== 1} className="form-control" value={this.state.lastName} onChange={this.updateLastName}/>
                            <input type="text" id="inputEmail" disabled = {this.props.currentUser.role[0].roleId !== 1} className="form-control" value={this.state.email} onChange={this.updateEmail}/>
                            {/* <input type="text" id="inputRole" className="form-control" value={this.state.role} onChange={this.updateUsername}/> */}
                            <select name="roles" disabled = {this.props.currentUser.role[0].roleId !== 1}  onChange={this.updateRole} value = {this.state.role}>
	                            <option value= {1} >Admin</option>
	                            <option value= {2} >Finance Manager</option>
	                            <option value= {3} >User</option>
	                        </select>
                            <div>
                            <button disabled = {this.props.currentUser.role[0].roleId !== 1} type="submit">Submit</button>
                            </div>

                        </form>
        )
    }
}

// export default withRouter(UserByIdComponent)
const mapStateToProps = (state:IState) =>{
    return {
        currentUser: state.login.currentUser
    }
}

export default connect(mapStateToProps)(withRouter(UserByIdComponent))