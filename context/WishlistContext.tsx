import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  url?: string;
  image?: string;
  dateAdded: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, 'id' | 'dateAdded'>) => void;
  updateItem: (id: string, updatedItem: Omit<WishlistItem, 'id' | 'dateAdded'>) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  sortItemsByPrice: (ascending: boolean) => void;
  searchItems: (query: string) => void;
  filteredItems: WishlistItem[];
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('wishlist');
      if (storedItems) {
        const parsedItems: WishlistItem[] = JSON.parse(storedItems);
        setItems(parsedItems);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la liste :', error);
    }
  };

  const saveItems = async (newItems: WishlistItem[]) => {
    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(newItems));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la liste :', error);
    }
  };

  const addItem = (item: Omit<WishlistItem, 'id' | 'dateAdded'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: uuidv4(),
      dateAdded: new Date().toISOString(),
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const updateItem = (id: string, updatedItem: Omit<WishlistItem, 'id' | 'dateAdded'>) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const clearWishlist = () => {
    setItems([]);
    saveItems([]);
  };

  const sortItemsByPrice = (ascending: boolean) => {
    const sorted = [...items].sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
    setFilteredItems(sorted);
  };

  const searchItems = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerQuery))
    );
    setFilteredItems(results);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearWishlist,
        sortItemsByPrice,
        searchItems,
        filteredItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
