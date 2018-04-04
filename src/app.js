import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'material-ui';
import autobind from 'autobind-decorator';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

@autobind
export default class App extends Component {
  state = {
    base16: '',
    base10: 100,
    base2: '',
    hexColor: '#FF9900',
    ipAddress: '192.168.0.1'
  };

  componentWillMount() {
    const { base10 } = this.state;
    this.setState({
      base16: base10.toString(16),
      base2: base10.toString(2)
    });
  }

  getColor(color, base) {
    const { hexColor } = this.state;
    let base16 = '';
    switch (color) {
      case 'red':
        base16 = hexColor.substr(1, 2);
        break;
      case 'green':
        base16 = hexColor.substr(3, 2);
        break;
      case 'blue':
        base16 = hexColor.substr(5, 2);
        break;
    }
    const base10 = parseInt(base16, 16);
    switch (base) {
      case 'base2':
        return base10.toString(2);
      case 'base10':
        return base10;
      case 'base16':
        return base16;
    }
    return '';
  }

  getIpAddress(section, base) {
    const { ipAddress } = this.state;
    const base10 = Number(ipAddress.split('.')[section]);
    switch (base) {
      case 'base2':
        return base10.toString(2);
      case 'base10':
        return base10;
      case 'base16':
        return base10.toString(16);
    }
    return '';
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

  handleIpAddressChange(e, ipAddress) {
    this.setState({ ipAddress });
  }

  handleHexColorChange(e, hexColor) {
    this.setState({ hexColor: hexColor.toUpperCase() });
  }

  renderHexColorTable() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn />
            <TableHeaderColumn>Red</TableHeaderColumn>
            <TableHeaderColumn>Green</TableHeaderColumn>
            <TableHeaderColumn>Blue</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Base 2 (binary)</TableHeaderColumn>
            <TableRowColumn>{this.getColor('red', 'base2')}</TableRowColumn>
            <TableRowColumn>{this.getColor('green', 'base2')}</TableRowColumn>
            <TableRowColumn>{this.getColor('blue', 'base2')}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Base 10</TableHeaderColumn>
            <TableRowColumn>{this.getColor('red', 'base10')}</TableRowColumn>
            <TableRowColumn>{this.getColor('green', 'base10')}</TableRowColumn>
            <TableRowColumn>{this.getColor('blue', 'base10')}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Base 16 (hexadecimal)</TableHeaderColumn>
            <TableRowColumn>{this.getColor('red', 'base16')}</TableRowColumn>
            <TableRowColumn>{this.getColor('green', 'base16')}</TableRowColumn>
            <TableRowColumn>{this.getColor('blue', 'base16')}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  renderIpAddressTable() {
    return (
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Base 2 (binary)</TableHeaderColumn>
            <TableRowColumn>{this.getIpAddress(0, 'base2')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(1, 'base2')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(2, 'base2')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(3, 'base2')}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Base 10</TableHeaderColumn>
            <TableRowColumn>{this.getIpAddress(0, 'base10')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(1, 'base10')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(2, 'base10')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(3, 'base10')}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Base 16 (hexadecimal)</TableHeaderColumn>
            <TableRowColumn>{this.getIpAddress(0, 'base16')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(1, 'base16')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(2, 'base16')}</TableRowColumn>
            <TableRowColumn>{this.getIpAddress(3, 'base16')}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1>Base Number</h1>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
              name="base2"
              floatingLabelText="Base 2 (binary)"
              value={this.state.base2}
              onChange={this.handleBase2Change}
            />
            <TextField
              name="base10"
              type="number"
              floatingLabelText="Base 10"
              value={this.state.base10}
              onChange={this.handleBase10Change}
            />
            <TextField
              name="base16"
              floatingLabelText="Base 16 (hexadecimal)"
              value={this.state.base16}
              onChange={this.handleBase16Change}
            />
          </div>
          <h1>Hex Colors</h1>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <TextField
              name="hexColor"
              floatingLabelText="Hex Color"
              value={this.state.hexColor}
              onChange={this.handleHexColorChange}
            />
            <div
              style={{
                width: '400px',
                height: '40px',
                backgroundColor: this.state.hexColor
              }}
            />
          </div>
          <div>{this.renderHexColorTable()}</div>
          <h1>IP Address</h1>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <TextField
              name="hexColor"
              floatingLabelText="IP Address"
              value={this.state.ipAddress}
              onChange={this.handleIpAddressChange}
            />
          </div>
          <div>{this.renderIpAddressTable()}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}
