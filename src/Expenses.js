import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css';
import {Container, Input, Button, Label, Form, FormGroup, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class Expenses extends Component {

    emptyItem = {
        id: 103,
        expenseDate : new Date(),
        description : '',
        location : '',
        category : {id: 0, name:'Healthcare'}
    }

    constructor(props){
        super(props)

        this.state = { 
            isLoading : false,
            Categories : [],
            Expenses : [],
            date: new Date(),
            item: this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
    }

    async handleSubmit(event) {

        const item = this.state.item;

        await fetch(`/api/expenses`, {
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(item),
        });
        event.preventDefault();
        this.props.history.push("/expenses");

    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
    }

    handleDateChange(date){
        let item = {...this.state.item};
        item.expenseDate = date;
        this.setState({item});

    }

    handleCatChange(category){

        let idx = category.target.selectedIndex;
        // let dataset = category.target.name;

        category = {...this.state.category};

        category.id = idx;
        category.name = idx;

        let item = {...this.state.item};
        item.category = category;
        this.setState({item});
        console.log({item});
    }

    async remove(id){
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(() => {
            let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
            this.setState({Expenses : updatedExpenses});
        });
    }

    async componentDidMount() {
        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({Categories : body, isLoading: false});

        const responseExp= await fetch('/api/expenses');
        const bodyExp= await responseExp.json();
        this.setState({Expenses : bodyExp, isLoading: false});
        console.log(bodyExp);
    }

    render() { 
        
        const title=<h3>Add Expense</h3>
        const {Categories} = this.state;
        const {Expenses, isLoading} = this.state;

        if (isLoading)
            return(<div>Loading...</div>)

        let optionList =
                Categories.map((category) =>
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                )
    
        let rows =
                Expenses.map((expense) =>
                    <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.location}</td>
                        <td><Moment date= {expense.expenseDate} format="YYYY/MM/DD"/></td>
                        <td>{expense.category?.name}</td>
                        <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
                    </tr>

                )


        return (
            <div>
                <AppNav/>
                <Container>
                    
                    {title}
                    
                    <Form onSubmit={this.handleSubmit}>

                        <FormGroup className="col-md-4 mb-3">
                            <Label for="description"></Label>
                            <Input type="description" name="description" id="description" placeholder= "Name" onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <div>
                            <select className="col-md-4 mb-3" onChange={this.handleCatChange}>
                                {optionList}
                            </select>
                            </div>
                            
                        </FormGroup>

                        <FormGroup>
                        <Label for="city">Date</Label>
                        <DatePicker selected={this.state.item.expenseDate}  onChange={this.handleDateChange} />
                    </FormGroup>

                            <div className= "row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="location"></Label>
                                <Input type="text" name="location" id="location" placeholder="Location" onChange={this.handleChange}/>
                            </FormGroup>
                            </div>
    

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>

            {''}
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Description</th>
                                <th width="10%">Location</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th width="10%">Action</th>
                            </tr>

                        </thead>

                        <tbody>
                            {rows}
                        </tbody>

                    </Table>

                </Container>


            </div>
        );
    }
}
 
export default Expenses;