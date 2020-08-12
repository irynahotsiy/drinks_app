import React, {useState, useRef} from 'react';
import {useIsInViewPortEffect} from 'react-native-viewport-helpers';
import {StyleSheet, View, Text, Image} from 'react-native';

export function DrinkCategoryList(props) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${props.category}`;
  const [drinkslist, setDrinkslist] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const loadDrinkslist = async () => {
    if (isLoading || drinkslist.length) return;
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setDrinkslist(data.drinks);
    setLoading(false);
    props.onLoaded();
  };

  const ref = useRef(null);
  useIsInViewPortEffect(
    ref,
    () => {
      loadDrinkslist();
    },
    [],
    0,
  );

  return (
    <View ref={ref}>
      <Text style={styled.category}>{props.category}</Text>
      {!isLoading ? (
        drinkslist.map((drink) => (
          <View key={drink.idDrink} style={styled.itemBox}>
            <Image
              style={styled.imageSize}
              source={{
                uri: drink.strDrinkThumb,
              }}
            />
            <Text style={styled.title}>{drink.strDrink}</Text>
          </View>
        ))
      ) : (
        <Text style={styled.loading}>Loading...</Text>
      )}
    </View>
  );
}

const styled = StyleSheet.create({
  category: {
    color: '#7E7E7E',
    fontSize: 16,
  },
  itemBox: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  imageSize: {
    width: 100,
    height: 100,
  },
  title: {
    paddingLeft: 30,
  },
  loading: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7E7E7E',
    paddingBottom: 10,
    textAlign: 'center',
  },
});
