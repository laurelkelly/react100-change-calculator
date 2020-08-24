import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      alertText: "The total change due will appear here.",
      alertColor: "alert alert-info",
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {  // event = in this case, event is attached to any change in the input (one key stroke at a time)
    const targetElement = event.target;  // target = whatever element it's happening to (in this case, input)
    const value = targetElement.value;  // value = what's being typed into it
    const name = targetElement.name;   // name = attribute I assigned to the element

    this.setState({
      [name]: value
    });
  }

  calculate(amountDue, amountReceived) {
    let result = (amountReceived - amountDue).toFixed(2);

    const dollars = Math.floor(result);

    const twenties = Math.floor(dollars / 20);
    let dollarsLeft = Math.floor(result - (twenties * 20));

    const tens = Math.floor(dollarsLeft / 10);
    dollarsLeft = Math.floor(dollarsLeft - (tens * 10));

    const fives = Math.floor(dollarsLeft / 5);
    dollarsLeft = Math.floor(dollarsLeft - (fives * 5));

    const ones = Math.floor(dollarsLeft / 1);
    let remainder = ((result - dollars) * 100).toFixed(2);

    const quarters = Math.floor(remainder / 25);
    remainder = remainder - (quarters * 25);

    const dimes = Math.floor(remainder / 10);
    remainder = remainder - (dimes * 10);

    const nickels = Math.floor(remainder / 5);
    remainder = remainder - (nickels * 5);

    const pennies = remainder;

    if (result < 0) {
      
    }
    else {
        this.setState({
        twenties: twenties, 
        tens: tens,
        fives: fives,
        ones: ones,
        quarters: quarters,
        dimes: dimes,
        nickels: nickels,
        pennies: pennies,
      });
    }
    return result;
  };

  handleClick(event) {
    event.preventDefault();
    let result = this.calculate(this.state.amountDue, this.state.amountReceived);
    if (result < 0) {
      this.setState({
        alertText: "Additional money owed", 
        alertColor: "alert alert-danger"
      });
    } else {
      this.setState({
        alertText: "The total change due is $" + result, 
        alertColor: "alert alert-success"
      });
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='page-header'>
          <h1>Change Calculator</h1>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='panel panel-default'>

              <div className='panel-heading'>Enter Information</div>

              <div className='panel-body'>

                <div className='form-group'>
                  <label htmlFor='inDue'>How much is due?</label>
                  <input className='form-control' id='inDue' name='amountDue' type='number' value={this.state.amoutDue} onChange={this.handleInputChange} />
                </div>

                <div className='form-group'>
                  <label htmlFor='inReceived'>How much was received?</label>
                  <input className='form-control' id='inReceived' name='amountReceived' type='number' value={this.state.amountReceived} onChange={this.handleInputChange} />
                </div>

              </div>

              <div className='panel-footer'>
                <button className='btn btn-primary btn-block' name='submit' type='button' onClick={this.handleClick}>Calculate</button>
              </div>

            </div>
          </div>

          <div className='col-md-8'>
            <div className='panel panel-default'>

              <div className='panel-body text-center'>

                <div className={this.state.alertColor} name='alert' id='alert'>
                  {this.state.alertText}
                </div>

                <div className='row'>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Twenties</strong></p>
                      <p className='change text-muted' name='twenties'>{this.state.twenties}</p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Tens</strong></p>
                      <p className='change text-muted' name='tens'>{this.state.tens}</p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Fives</strong></p>
                      <p className='change text-muted' name='fives'>{this.state.fives}</p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Ones</strong></p>
                      <p className='change text-muted' name='ones'>{this.state.ones}</p>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Quarters</strong></p>
                      <p className='change text-muted' name='quarters'>{this.state.quarters}</p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Dimes</strong></p>
                      <p className='change text-muted' name='dimes'>{this.state.dimes}</p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Nickels</strong></p>
                      <p className='change text-muted' name='nickels'>{this.state.nickels}</p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='well'>
                      <p><strong>Pennies</strong></p>
                      <p className='change text-muted' name='pennies'>{this.state.pennies}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
