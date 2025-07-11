import React from 'react';
import 'react-native-get-random-values';

import { View, Text, Image, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useWishlist } from '../context/WishlistContext';
import { RootStackParamList } from '../App';
import { globalStyles, colors } from '../styles/styles';
import CustomButton from '../components/CustomButton';

const DetailScreen = () => {
  const { items, removeItem } = useWishlist();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const item = items.find((i) => i.id === route.params.id);

  if (!item) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Article introuvable.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Confirmation', 'Supprimer cet article ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          removeItem(item.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}

      <Text style={globalStyles.title}>{item.name}</Text>
      <Text style={globalStyles.text}>Prix : {item.price.toFixed(2)} dh</Text>

      {item.description ? (
        <Text style={globalStyles.text}>Description : {item.description}</Text>
      ) : null}

      <Text style={globalStyles.text}>
        Ajouté le : {new Date(item.dateAdded).toLocaleString()}
      </Text>

      {item.url ? (
        <CustomButton title="Voir le produit en ligne" onPress={() => Linking.openURL(item.url!)} type="secondary" />
      ) : null}

      <CustomButton
        title="Modifier"
        onPress={() => navigation.navigate('EditItem' as never, { id: item.id } as never)}
        type="secondary"
      />

      <CustomButton title="Supprimer" onPress={handleDelete} type="danger" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default DetailScreen;
