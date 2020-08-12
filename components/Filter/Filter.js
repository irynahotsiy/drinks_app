import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export function Filter(props) {
  const {category, onPressCategory, selected} = props;
  return (
    <TouchableOpacity onPress={() => onPressCategory(category)}>
      <View style={styled.filterContainer}>
        <Text style={styled.category}>{category.strCategory}</Text>
        <Text style={styled.checkbox}>{selected ? '✓' : ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styled = StyleSheet.create({
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  category: {
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    paddingTop: 20,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 25,
    width: 30,
  },
});
