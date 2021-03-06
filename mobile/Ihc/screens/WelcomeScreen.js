import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {localData, serverData} from '../services/DataService';
import Container from '../components/Container';
import Button from '../components/Button';
import {downstreamSyncWithServer} from '../util/Sync';
import MenuItem from '../components/MenuItem';

class WelcomeScreen extends Component<{}> {
  constructor(props) {
    super(props);
  }

  goToSignin = () => {
    this.props.navigator.push({
      screen: 'Ihc.SigninScreen',
      title: 'Signin'
    });
  }

  goToSelectPatient = () => {
    this.props.navigator.push({
      screen: 'Ihc.PatientSelectScreen',
      title: 'Select patient'
    });
  }

  goToMedicationInventory = () => {
    this.props.navigator.push({
      screen: 'Ihc.MedicationInventoryScreen',
      title: 'Medication Inventory'
    });
  }

  upload = () => {
    this.props.setLoading(true);
    this.props.isUploading(true);
    this.props.clearMessages();

    const patients = localData.getPatientsToUpload();
    serverData.updatePatients(patients)
      .then(() => {
        // View README: Handle syncing the tablet, point 3 for explanation
        if(this.props.loading) {
          localData.markPatientsUploaded();
          this.props.setLoading(false);
          this.props.setSuccessMessage('Uploaded successfully');
        }
      })
      .catch(err => {
        if(this.props.loading) {
          this.props.setLoading(false);
          this.props.setErrorMessage(err.message);
        }
      });
  }

  download = () => {
    this.props.setLoading(true);
    this.props.isUploading(false);
    this.props.clearMessages();

    downstreamSyncWithServer()
      .then((failedPatientKeys) => {
        // View README: Handle syncing the tablet, point 3 for explanation
        if(this.props.loading) {
          if(failedPatientKeys.length > 0) {
            throw new Error(`${failedPatientKeys.length} patients failed to download. Try again`);
          }

          this.props.setLoading(false);
          this.props.setSuccessMessage('Downloaded successfully');
        }
      })
      .catch(err => {
        if(this.props.loading) {
          this.props.setLoading(false);
          this.props.setErrorMessage(err.message);
        }
      });

  }

  render() {
    return (
      <Container>
        <Text style={styles.welcome}>
          Welcome to clinic!
        </Text>
        <View style={styles.menuContainer}>
          <MenuItem itemImage={require('../images/WelcomeScreen/CheckInPatient.png')} onPress={this.upload}/>
          <MenuItem itemImage={require('../images/WelcomeScreen/Labs.png')}/>
          <MenuItem itemImage={require('../images/WelcomeScreen/PatientList.png')}/>
          <MenuItem itemImage={require('../images/WelcomeScreen/Pharmacy.png')}/>

        </View>
        <Button onPress={this.goToSignin}
          text="Signin"
          style={styles.button}
        />
        <Button onPress={this.goToSelectPatient}
          text="Select Patient"
          style={styles.button}
        />
        <Button onPress={this.upload}
          text="Upload updates"
          style={styles.button}
        />
        <Button onPress={this.download}
          text="Download updates"
          style={styles.button}
        />
        <Button onPress={this.goToMedicationInventory}
          text="Medication Inventory"
          style={styles.button}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    height: '85%',
    width:'85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  test: {
    width: 500,
    backgroundColor: 'red',
    height: 500
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    width: 600
  },
  button: {
    width: 140
  }
});

// Redux
import { setLoading, setErrorMessage, setSuccessMessage, clearMessages, isUploading } from '../reduxActions/containerActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  setLoading: val => dispatch(setLoading(val)),
  setErrorMessage: val => dispatch(setErrorMessage(val)),
  setSuccessMessage: val => dispatch(setSuccessMessage(val)),
  clearMessages: () => dispatch(clearMessages()),
  isUploading: val => dispatch(isUploading(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
