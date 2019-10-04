import React, { Component } from 'react';
import Input from './formInput';
import Select from './formSelect';
import TextArea from './formTextArea';

class CandidateForm extends Component {
    state = {
        candidate: {
            name: '',
            lastname: '',
            email: '',
            company: '',
            role: '',
            workshop: undefined,
            is_lecture: false,
            motivation: '',
        }
    }

    handleChange = ({ currentTarget: input }) => {
        const candidate = { ...this.state.candidate };
        candidate[input.name] = input.value;
        this.setState({ candidate });
    }

    handleCheckboxChange = (event) => {
        this.setState({
            candidate: {
                ...this.state.candidate,
                is_lecture: event.target.checked
            }
        })

    }

    handleSubmit = async event => {
        event.preventDefault();
        const url = 'http://localhost:3001/candidates';
        const options = {
            method: 'POST',
            body: JSON.stringify(this.state.candidate),
            headers: { 'Content-Type': 'application/json' }
        }

        try {
            const response = await fetch(url, options);
            alert(await response.text());
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    render() {
        const { candidate } = this.state
        return (
            <div className="row">
                <div className="col-3"></div>
                <form onSubmit={this.handleSubmit} className="col-6">
                    <Input value={candidate.name} name="name" label="Name" type="text" onChange={this.handleChange} required={true} />
                    <Input value={candidate.lastname} name="lastname" label="Last Name" type="text" onChange={this.handleChange} required={true} />
                    <Input value={candidate.email} name="email" label="Email" type="email" onChange={this.handleChange} required={true} />
                    <Input value={candidate.company} name="company" label="Company" type="text" onChange={this.handleChange} required={true} />
                    <Input value={candidate.role} name="role" label="Role" type="text" onChange={this.handleChange} required={true} />
                    <Select value={candidate.workshop} name="workshop" label="Workshop" onChange={this.handleChange} required={true} />
                    <Input value={this.state.candidate.is_lecture} label="Want to go for a lecture?" type="checkbox" name="is_lecture" onChange={this.handleCheckboxChange} />
                    <TextArea value={candidate.motivation} name="motivation" label="Motivation" onChange={this.handleChange} required={true} />

                    <button type="submit" className="btn btn-primary m-2">Send Your Candidature</button>
                </form>
                <div className="col-3"></div>
            </div>
        );
    }
}

export default CandidateForm;