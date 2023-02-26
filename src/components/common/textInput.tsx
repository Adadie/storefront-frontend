import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';

interface InputWithLabelProps extends TextInputProps {
  label: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const shouldLabelFloat = isFocused || props.value?.length;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, shouldLabelFloat && styles.labelFocused]}>
        {label}
      </Text>
      <TextInput
        {...props}
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    position: 'absolute',
    top: 10,
    left: 16,
    backgroundColor: '#FFF',
    paddingHorizontal: 4,
    color: 'gray',
    fontSize: 16,
  },
  labelFocused: {
    top: -10,
    fontSize: 12,
    zIndex: 2,
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingLeft: 16,
    borderWidth: 1,
    width: 260,
  },
  inputFocused: {
    height: 40,
    fontSize: 16,
    paddingLeft: 16,
    borderWidth: 1,
    width: 260,
  },
});

export default InputWithLabel;
