import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Register from './containers/Register'
import MakeExcuse from './containers/MakeExcuse'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FF294E',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 15
  }
})

class App extends Component {
  constructor() {
    super()

    this.state = {
      api_token: 'xoxp-386504771810-387555220663-385825749584-0a5e24c743986197a9312dd01bc06174',
      eta: '',
      selectedExcuseId: 0,
      treeLevel: 2
    }

    //this.onSubmitToken = this.onSubmitToken.bind(this)
  }

  // Helpers

  _submit() {
    fetch("https://d757938a.ngrok.io/send_excuse", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_token: this.state.api_token,
        eta: this.state.eta,
        msg_id: this.state.selectedExcuseId
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData.body);
    })
    .done();
 }

  // Event Handlers

  onSubmitToken = (token) => {
    this.setState({api_token: token, treeLevel: 2})
  }

  onSubmitETA = (eta) => {
    this.setState({eta: eta})
  }

  onPressExcuse = (excuseId) => {
    this.setState({selectedExcuseId: excuseId})
  }

  onPressRandom = () => {
    this._submit()
  }

  // Render

  renderContent() {
    const { api_token, eta, selectedExcuseId, treeLevel } = this.state

    if (treeLevel == 1) {
      return <Register onSubmit={this.onSubmitToken} value={api_token} />
    } else if (treeLevel == 2) {
      const excuses = [
        {key: 'item1', index: 1, title: 'I have an appointment this morning.'},
        {key: 'item2', index: 2, title: "I'm not feeling well this morning."},
        {key: 'item3', index: 3, title: 'Slow morning today.'},
        {key: 'item4', index: 4, title: 'My streetcar hit a wall and exploded.'},
        {key: 'item5', index: 5, title: 'Having a personal emergency.'},
        {key: 'item6', index: 6, title: 'My pet chihuaha has gone missing.'},
        {key: 'item7', index: 7, title: "I've fallen and I can't get up."}
      ]

      return (
        <MakeExcuse
          excuses={excuses}
          eta={eta}
          selectedExcuseId={selectedExcuseId}
          onSubmitETA={this.onSubmitETA}
          onPressExcuse={this.onPressExcuse}
          onPressRandom={this.onPressRandom}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ExcusaBot</Text>
        </View>
        {this.renderContent()}
      </View>
    )
  }
}

export default App
