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
    // userId: number
    amount: number
    description: string
    type: number

}

export class ReimSubmitComponent extends React.Component<any, IUserState> {
    constructor(props){
        super(props);
        this.state = {
            // allUserKeys:[],
            //allUsers:[],
            errorMessage: '',
            amount: undefined,
            description: '',
            type: 0,
        }
    }

    updateSubmit = (event)=>{
        event.preventDefault()
        let author = this.props.currentUser.userId
        let date = new Date().toLocaleDateString()
        // let resolve = this.props.currentUser.role[0].roleId
        this.submit(author, this.state.amount, date, this.state.description, this.state.type)
    }

    submit = async (author: number, amount: number, submit:string, description:string, type:number) =>{
        const creds = {
            author: author,
            amount: amount,
            submit: submit,
            description: description,
            reimbursement_type: type
        }

        const response = await ersClient.post(`${this.props.location.pathname}`, creds)
        console.log(response)

        // response.data.map((reim) => {
        //     this.setState({
        //         amount: reim.amount,
        //         description: reim.description,
        //         type: reim.type.typeId
        //         })
        // })

    }

    updateAmount = (event) => {
        //console.log(event)
        this.setState({
            amount: event.target.value
        })
    }

    updateDesc = (event) => {
        //console.log(event)
        this.setState({
            description: event.target.value
        })
    }

    updateType = (event) => {
        console.log(`before: ${this.state.type}`)
        this.setState({
            type: event.target.value
        })
        console.log(`after: ${this.state.type}`)
    }

    render(){
        //this.getAllUsers() || 'nouser'
        console.log(this.props.history)
        if(this.props.currentUser == undefined){
            return(
                <h1>Please Login</h1>
            )
        }
        else{
        return(
            <form className="form-signin text-center" onSubmit={this.updateSubmit}>
                            <input type="text" id="inputAmount" className="form-control" placeholder= "Amount" value={this.state.amount} onChange={this.updateAmount} required/>
                            <input type="text" id="inputDesc" className="form-control" placeholder="Description" value={this.state.description} onChange={this.updateDesc} required/>
                            {/* <input type="text" id="inputRole" className="form-control" value={this.state.role} onChange={this.updateUsername}/> */}
                            <select name="types" onChange={this.updateType} value = {this.state.type}>
                                <option value = {0} >Choose One</option>
	                            <option value= {1} >Travel</option>
	                            <option value= {2} >Lodging</option>
	                            <option value= {3} >Legal</option>
	                        </select>
                            <div>
                            <button type="submit">Submit</button>
                            </div>

                        </form>
        )
        }
    }
}

// export default withRouter(UserByIdComponent)
const mapStateToProps = (state:IState) =>{
    return {
        currentUser: state.login.currentUser
    }
}

export default connect(mapStateToProps)(withRouter(ReimSubmitComponent))