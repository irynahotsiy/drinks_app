import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Filter} from '../Filter/Filter';
import {selectedFilters, checkIfSelected} from '../../services/services';

export function Filters(props) {
  const navigation = useNavigation();
  let {categories, filteredCategories, onClickApply, isSelected} = props;

  let [filters, setFilters] = useState(filteredCategories);

  function addToFiltered(category) {
    let selected = selectedFilters(category, filters);
    setFilters(selected);
  }

  return (
    <View style={styled.container}>
      <View style={{flex: 1}}>
        <SafeAreaView>
          <ScrollView>
            {categories.map((category, idx) => (
              <Filter
                key={idx}
                onPressCategory={() => addToFiltered(category)}
                category={category}
                selected={checkIfSelected(category, filters)}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={{height: 100}}>
        <TouchableOpacity
          style={
            filters.length < 1 ? styled.applyButtonDisabled : styled.applyButton
          }
          disabled={filters.length < 1 ? true : false}
          onPress={() => {
            navigation.navigate('Drinks');
            onClickApply(filters);
          }}>
          <Text style={styled.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const applyButton = {
  backgroundColor: '#000000',
  padding: 20,
  alignItems: 'center',
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ffffff',
  },
  applyButton: {...applyButton},
  applyButtonText: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
  applyButtonDisabled: {
    ...applyButton,
    backgroundColor: '#808080',
  },
});
