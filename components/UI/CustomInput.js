import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({ control, name, rules = {}, label,defaultValue }) => {
  return (
    <View style={styles.formControl}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View style={styles.input}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                defaultValue={defaultValue}
              />
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    {error.message || 'Error'}
                  </Text>
                </View>
              )}
            </View>
              <Text>hu</Text>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  // input: {},
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});

export default CustomInput;
