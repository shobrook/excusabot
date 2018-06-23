import React, { Component, Fragment } from 'react'
import { StyleSheet, FlatList, Text, Button, View, TextInput, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  makeExcuseContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  buttonsContainer: {},
  excuseList: {
    height: 400
  },
  excuseOption: {
    marginTop: 15,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FFF',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  excuseText: {
    color: '#777',
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: 'normal'
  },
  submitText: {
    color: '#FFF',
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '500'
  },
  randomButton: {
    marginTop: 100,
    backgroundColor: '#FF294E',
    height: 70
  }
})

class MakeExcuse extends Component {
  constructor() {
    super()

    this.state = {
      eta: '',
      selectedExcuseId: 0,
      randomMessage: false
    }
  }

  render() {
    return (
      <View style={styles.makeExcuseContainer}>
        <View>
          <TextInput
            style={styles.enterToken}
            value={this.props.eta}
            placeholder='Estimated time of arrival'
            onChangeText={(eta) => this.setState({eta})}
            onSubmitEditing={() => this.props.onSubmitETA(this.state.eta)}
          />
          <FlatList
            style={styles.excuseList}
            data={this.props.excuses}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.excuseOption}
                onPress={() => this.props.onPressExcuse(item.index)}
              >
                <Text style={styles.excuseText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.randomButton}
            onPress={this.props.onPressRandom}
          >
            <Text style={styles.submitText}>Submit Excuse</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default MakeExcuse
