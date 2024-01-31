import React from 'react';
import {SafeAreaView, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  LengthOfLine: Yup.number().required('Required').positive(),
  LengthOfWorkTool: Yup.number().required('Required').positive(),
  HeightOfPiece: Yup.number().required('Required').positive(),
});

const App = () => {
  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      // Replace with your server's endpoint
      const response = await axios.post('http://localhost:5040/write', values);
      console.log('Success!'); // Show success message or handle response
    } catch (error) {
      console.error(error);
      console.log('Failed to update values'); // Error handling
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{LengthOfLine: '', LengthOfWorkTool: '', HeightOfPiece: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <React.Fragment>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('LengthOfLine')}
              onBlur={handleBlur('LengthOfLine')}
              value={values.LengthOfLine.toString()}
              placeholder="Length of Line"
            />
            {touched.LengthOfLine && errors.LengthOfLine && <Text style={styles.errorText}>{errors.LengthOfLine}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('LengthOfWorkTool')}
              onBlur={handleBlur('LengthOfWorkTool')}
              value={values.LengthOfWorkTool.toString()}
              placeholder="Length of Work Tool"
            />
            {touched.LengthOfWorkTool && errors.LengthOfWorkTool && <Text style={styles.errorText}>{errors.LengthOfWorkTool}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('HeightOfPiece')}
              onBlur={handleBlur('HeightOfPiece')}
              value={values.HeightOfPiece.toString()}
              placeholder="Height of Piece"
            />
            {touched.HeightOfPiece && errors.HeightOfPiece && <Text style={styles.errorText}>{errors.HeightOfPiece}</Text>}

            <Button onPress={handleSubmit} title="Submit" color="#007AFF" />
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default App;
