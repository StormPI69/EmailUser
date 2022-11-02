import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'





class App extends Component {
   constructor() {
    super();
    this.state = {
        fullname:'',
        height:'',
        email:''
    }
    this.changeFullname=this.changeFullname.bind(this)
    this.changeHeight=this.changeHeight.bind(this)
    this.changeEmail=this.changeEmail.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    
    

   }

   changeFullname(event){
    this.setState({fullname: event.target.value})
   }

   changeHeight(event){
    this.setState({height: event.target.value})
   }

   changeEmail(event){
    this.setState({email: event.target.value})
   }

   onSubmit(event)
   {
    event.preventDefault()

    const registered=
    {
        fullname: this.state.fullname,
        height: this.state.height,
        email: this.state.email
    }


    axios.post('http://localhost:4000/app/signup',registered)
        .then(response => console.log(response.data))

    
    this.setState({
        fullname:'',
        height:'',
        email:''


    })

   }


    render() { 
        return (
            <div>
                <div className='container'>
                <centre><h1>Height Survey Application</h1></centre>
                <div></div>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <div className='full-name'>
                            <input type='text'
                            placeholder='Full Name'
                            onChange={this.changeFullname}
                            value={this.state.fullname}
                            className='form-control form-group'
                            /></div>
                            <div>-</div>
                            <input type='number'
                            placeholder='your Height'
                            onChange={this.changeHeight}
                            value={this.state.height}
                            className='form-control form-group'
                            />
                            <div>-</div>
                            <input type="email"
                            placeholder='Email Adress'
                            onChange={this.changeEmail}
                            value={this.state.email}
                            className='form-control form-group'
                            />
                            <div>-</div>

                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;