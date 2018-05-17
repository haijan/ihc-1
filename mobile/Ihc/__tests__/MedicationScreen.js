import 'react-native';
import React from 'react';
import MedicationScreen from '../screens/MedicationScreen';

import DrugUpdate from '../models/DrugUpdate';
import sinon from 'sinon';
import {localData} from '../services/DataService';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const drug1 = DrugUpdate.getInstance();
  const drug2 = DrugUpdate.getInstance();
  sinon.stub(localData, 'getMedicationUpdates').returns([drug1, drug2]);

  const fakeNavigator = { setOnNavigatorEvent: (param) => {} };
  const json = renderer.create(
    <MedicationScreen navigator={fakeNavigator} />
  ).toJSON();
  expect(json).toMatchSnapshot();
});
