import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useWishlist } from '../context/WishlistContext';
import { RootStackParamList } from '../App';
import { globalStyles, colors } from '../styles/styles';
import CustomButton from '../components/CustomButton';

const EditScreen = () => {
  const { items, updateItem } = useWishlist();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditItem'>>();
  const item = items.find((i) => i.id === route.params.id);

  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price.toString() || '');
  const [url, setUrl] = useState(item?.url || '');
  const [image, setImage] = useState(item?.image || '');

  const handleUpdate = () => {
    if (!name || !price) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      Alert.alert('Erreur', 'Veuillez entrer un prix valide.');
      return;
    }

    updateItem(item!.id, {
      name,
      description,
      price: numericPrice,
      url,
      image,
    });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Modifier l'article</Text>

      <TextInput
        placeholder="Nom de l'article *"
        placeholderTextColor={colors.text}
        value={name}
        onChangeText={setName}
        style={globalStyles.input}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor={colors.text}
        value={description}
        onChangeText={setDescription}
        style={globalStyles.input}
        multiline
      />

      <TextInput
        placeholder="Prix estimé (dh) *"
        placeholderTextColor={colors.text}
        value={price}
        onChangeText={setPrice}
        style={globalStyles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="URL du produit"
        placeholderTextColor={colors.text}
        value={url}
        onChangeText={setUrl}
        style={globalStyles.input}
      />

      <TextInput
        placeholder="URL de l'image"
        placeholderTextColor={colors.text}
        value={image}
        onChangeText={setImage}
        style={globalStyles.input}
      />

      <CustomButton title="Mettre à jour" onPress={handleUpdate} type="secondary" />
    </ScrollView>
  );
};

export default EditScreen;
