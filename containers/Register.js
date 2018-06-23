import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
  enterToken: {
    height: 50,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 200,
    fontFamily: 'System',
    fontSize: 40,
    fontWeight: 'normal'
  }
})

class Register extends Component {
  constructor() {
    super()

    this.state = {value: ''}
  }

  render() {
    return (
      <TextInput
        style={styles.enterToken}
        value={this.props.value}
        placeholder='Enter your token'
        onChangeText={(value) => this.setState({value})}
        onSubmitEditing={() => this.props.onSubmit(this.state.value)}
      />
    )
  }
}

export default Register
