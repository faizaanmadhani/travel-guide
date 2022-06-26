import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import TagInput from "react-native-tags-input";
import { Input } from "native-base";

const ENTER_KEY = "Enter";

export default function StyledTagInput({
  tags,
  setTags,
}: {
  tags: { tag: string; tagsArray: Array<string> };
  setTags: React.Dispatch<
    React.SetStateAction<{
      tag: string;
      tagsArray: any[];
    }>
  >;
}) {
  const updateTagState = (state) => {
    setTags(state);
  };

  return (
    <View style={styles.container}>
      <TagInput
        updateState={updateTagState}
        tags={tags}
        inputContainerStyle={styles.textInput}
        inputStyle={styles.inputStyle}
        tagStyle={styles.tagStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 4,
  },
  container: {
    alignContent: "flex-start",
  },
  inputStyle: {
    fontSize: 12,
  },
  tagStyle: {
    backgroundColor: "#E0F2FE",
    borderRadius: 2,
    borderWidth: 0,
    padding: 5,
  },
});
