import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import Header from '../../components/header';
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialCommunityIcons } from '@expo/vector-icons';