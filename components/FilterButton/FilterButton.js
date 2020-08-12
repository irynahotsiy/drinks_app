import * as React from 'react';
import {TouchableHighlight, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function FilterButton() {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('Filter');
      }}>
      <Image
        style={styled.filterButton}
        source={require('../../icons/filter.png')}></Image>
    </TouchableHighlight>
  );
}

const styled = StyleSheet.create({
  filterButton: {
    width: 30,
    height: 30,
  },
});
