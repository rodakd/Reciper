import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RenderCategory from '../components/RenderCategory';
import * as recipeActions from '../store/recipeActions';
import IoniconsHeaderButton from '../components/IoniconsHeaderButton';
import NewCategoryModal from '../components/NewCategoryModal';
import Colors from '../constants/Colors';

const CategoryScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const categories = useSelector((state) => state.recipes.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeActions.setCategories());
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="add"
            iconName={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [isModalVisible]);

  return (
    <View style={{ backgroundColor: Colors.background, flex: 1 }}>
      <NewCategoryModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        onSubmit={(title, color) => {
          dispatch(recipeActions.addCategory(title, color));
        }}
      />
      <FlatList
        numColumns={2}
        renderItem={({ item }) => (
          <RenderCategory item={item} onPress={() => navigation.navigate('recipes', { item })} />
        )}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export const categoryScreenOptions = () => {
  return {
    headerTitle: 'Categories',
  };
};

export default CategoryScreen;
