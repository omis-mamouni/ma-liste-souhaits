import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWishlist } from '../context/WishlistContext';
import { globalStyles, colors } from '../styles/styles';
import CustomButton from '../components/CustomButton';


const HomeScreen = () => {
  const { filteredItems, searchItems, sortItemsByPrice } = useWishlist();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  return (
  
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Rechercher un article..."
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchItems(text);
          }}
          style={globalStyles.input}
        />
  
        <View style={styles.sortButtons}>
          <CustomButton title="Prix ↑" onPress={() => sortItemsByPrice(true)} type="secondary" />
          <CustomButton title="Prix ↓" onPress={() => sortItemsByPrice(false)} type="secondary" />
        </View>
  
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={globalStyles.card}
              onPress={() => navigation.navigate('Detail' as never, { id: item.id } as never)}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : null}
              <View style={styles.itemInfo}>
                <Text style={globalStyles.title}>{item.name}</Text>
                <Text style={globalStyles.text}>{item.price.toFixed(2)} dh</Text>
              </View>
            </TouchableOpacity>
          )}
        />
  
        <Text style={[globalStyles.sectionTitle, { textAlign: 'center' }]}>
          Total : {totalPrice.toFixed(2)} dh
        </Text>
  
        <CustomButton
          title="Ajouter un article"
          onPress={() => navigation.navigate('AddItem' as never)}
          type="primary"
        />
      </View>
  
      
  );
  
};

const styles = StyleSheet.create({
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
});

export default HomeScreen;
