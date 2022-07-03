import React, { FunctionComponent, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

export type PredictionType = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  tructured_formatting: Object;
  terms: Object[];
  types: string[];
};

type SearchBarProps = {
  value: string;
  style?: ViewStyle | ViewStyle[];
  onChangeText: (text: string) => void;
  predictions: PredictionType[];
  showPredictions: boolean;
  onPredictionTapped: (placeId: string, description: string) => void;
};

const SearchBarWithAutocomplete: FunctionComponent<SearchBarProps> = (
  props
) => {
  const [inputSize, setInputSize] = useState({ width: 0, height: 0 });

  const {
    value,
    style,
    onChangeText,
    onPredictionTapped,
    predictions,
    showPredictions,
  } = props;

  const { container, inputStyle } = styles;
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  const inputBottomRadius = showPredictions
    ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      };

  const _renderPredictions = (predictions: PredictionType[]) => {
    const { predictionsContainer, predictionRow } = styles;
    const calculatedStyle = {
      width: inputSize.width,
    };

    return (
      <FlatList
        data={predictions}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={predictionRow}
              onPress={() =>
                onPredictionTapped(item.place_id, item.description)
              }
            >
              <Text numberOfLines={1}>{item.description}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.place_id}
        keyboardShouldPersistTaps="handled"
        style={[predictionsContainer, calculatedStyle]}
      />
    );
  };

  return (
    <View style={[container, { ...passedStyles }]}>
      <TextInput
        style={[inputStyle, inputBottomRadius]}
        placeholder="Search by address"
        placeholderTextColor="#E5E5E5"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout;
          setInputSize({ height, width });
        }}
      />
      {showPredictions && _renderPredictions(predictions)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  inputStyle: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 5,
    borderColor: "black",
    color: "black",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    fontSize: 16,
  },
  predictionsContainer: {
    backgroundColor: "#E5E5E5",
    borderColor: "#E5E5E5",
    padding: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  predictionRow: {
    paddingBottom: 15,
    borderColor: "#E5E5E5",
    marginBottom: 5,
  },
});

export default SearchBarWithAutocomplete;
