import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DrinkCategories} from './components/DrinkCategories/DrinkCategories';
import {Filters} from './components/Filters/Filters';
import {FilterButton} from './components/FilterButton/FilterButton';

const Stack = createStackNavigator();

const CATEGORIES_URL =
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const App: () => React$Node = () => {
  let [categories, setCategories] = useState([]);
  let [filteredCategories, setFilteredCategories] = useState([]);
  const scrollRef = useRef();
  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const response = await fetch(CATEGORIES_URL);
    const data = await response.json();
    setCategories(data.drinks);
    setFilteredCategories(data.drinks.slice());
  }

  function onClickApply(filters) {
    let sorted = filters.sort(function (a, b) {
      return a.strCategory.localeCompare(b.strCategory);
    });

    setFilteredCategories(sorted);
    scrollRef.current.scrollTo({animated: false});
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Drinks"
          options={{
            headerTitleAlign: 'left',
            headerRight: () => <FilterButton />,
          }}>
          {(props) => (
            <DrinkCategories
              {...props}
              categories={filteredCategories}
              scrollRef={scrollRef}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Filter">
          {(props) => (
            <Filters
              {...props}
              categories={categories}
              filteredCategories={filteredCategories}
              // isSelected={checkIfSelected}
              // setFiltered={setFiltered}
              onClickApply={onClickApply}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
