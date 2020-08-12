import React, {useState, useEffect} from 'react';
import {DrinkCategoryList} from '../DrinkCategoryList/DrinkCategoryList';

import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

export function DrinkCategories(props) {
  const {categories, scrollRef} = props;
  const [visibleCount, setVisibleCount] = useState(0);

  return (
    <View style={styled.container}>
      <SafeAreaView>
        <ScrollView ref={scrollRef} scrollEventThrottle={16}>
          {categories.slice(0, visibleCount + 1).map((category, idx) => (
            <DrinkCategoryList
              key={category.strCategory}
              category={category.strCategory}
              isFirst={idx === 0}
              onLoaded={() => {
                setVisibleCount(visibleCount + 1);
              }}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
