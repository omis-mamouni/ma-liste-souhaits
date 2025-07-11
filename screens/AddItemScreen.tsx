import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, colors } from '../styles/styles';
import CustomButton from '../components/CustomButton';

const AddItemScreen = () => {
  const { addItem } = useWishlist();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  const handleAdd = () => {
    if (!name || !price) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      Alert.alert('Erreur', 'Veuillez entrer un prix valide.');
      return;
    }

    addItem({
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
      <Text style={globalStyles.title}>Ajouter un article</Text>

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

      <CustomButton title="Ajouter" onPress={handleAdd} type="primary" />
    </ScrollView>
  );
};

export default AddItemScreen;
