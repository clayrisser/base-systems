import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'material-ui';
import autobind from 'autobind-decorator';

@autobind
export default class App extends Component {
  state = { base16: '', base10: 100, base2: '' };

  componentWillMount() {
    const { base10 } = this.state;
    this.setState({
      base16: base10.toString(16),
      base2: base10.toString(2)
    });
  }

  handleBase16Change(e, base16) {
    const base10 = parseInt(base16, 16);
    this.setState({ base16, base10, base2: base10.toString(2) });
  }

  handleBase10Change(e, base10) {
    base10 = Number(base10);
    this.setState({
      base16: base10.toString(16),
      base10,
      base2: base10.toString(2)
    });
  }

  handleBase2Change(e, base2) {
    const base10 = parseInt(base2, 2);
    this.setState({ base16: base10.toString(16), base10, base2 });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TextField
            name="base16"
            floatingLabelText="Base 16 (hexadecimal)"
            value={this.state.base16}
            onChange={this.handleBase16Change}
          />
          <TextField
            name="base10"
            type="number"
            floatingLabelText="Base 10"
            value={this.state.base10}
            onChange={this.handleBase10Change}
          />
          <TextField
            name="base2"
            floatingLabelText="Base 2 (binary)"
            value={this.state.base2}
            onChange={this.handleBase2Change}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
