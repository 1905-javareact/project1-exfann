import React from 'react'
import Background from '../../assets/background.jpg';


export class HomeComponent extends React.PureComponent<any>{
    render(){
        return(
            <img className="background" src={Background} alt="lkjdsalkjfsdaljkfdsaljk" />
        )
    }
}