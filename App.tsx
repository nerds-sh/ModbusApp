import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { validationSchema } from './validationSchema';

const App = () => {
  const [initialValues, setInitialValues] = useState({
    LengthOfLine: '',
    LengthOfWorkTool: '',
    HeightOfPiece: '',
    SpeedToWorkPlace: '', // Added new field
    SpeedInFrezare: '', // Added new field
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5040/read')
      .then((response) => {
        setInitialValues({
          LengthOfLine: response.data.LengthOfLine,
          LengthOfWorkTool: response.data.LengthOfWorkTool,
          HeightOfPiece: response.data.HeightOfPiece,
          SpeedToWorkPlace: response.data.SpeedToWorkPlace, // Ensure backend supports this
          SpeedInFrezare: response.data.SpeedInFrezare, // Ensure backend supports this
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5040/write', values);
      console.log('Success!');
    } catch (error) {
      console.error(error);
      console.log('Failed to update values');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              {/* Existing Fields */}
              <Text style={styles.label}>Length of Line</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('LengthOfLine')}
                onBlur={handleBlur('LengthOfLine')}
                value={values.LengthOfLine.toString()}
                placeholder="Length of Line"
              />
              {touched.LengthOfLine && errors.LengthOfLine && (
                <Text style={styles.errorText}>{errors.LengthOfLine}</Text>
              )}

              <Text style={styles.label}>Length of Work Tool</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('LengthOfWorkTool')}
                onBlur={handleBlur('LengthOfWorkTool')}
                value={values.LengthOfWorkTool.toString()}
                placeholder="Length of Work Tool"
              />
              {touched.LengthOfWorkTool && errors.LengthOfWorkTool && (
                <Text style={styles.errorText}>{errors.LengthOfWorkTool}</Text>
              )}

              <Text style={styles.label}>Height of Piece</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('HeightOfPiece')}
                onBlur={handleBlur('HeightOfPiece')}
                value={values.HeightOfPiece.toString()}
                placeholder="Height of Piece"
              />
              {touched.HeightOfPiece && errors.HeightOfPiece && (
                <Text style={styles.errorText}>{errors.HeightOfPiece}</Text>
              )}

              {/* New Fields */}
              <Text style={styles.label}>Speed to Work Place</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('SpeedToWorkPlace')}
                onBlur={handleBlur('SpeedToWorkPlace')}
                value={values.SpeedToWorkPlace.toString()}
                placeholder="Speed to Work Place"
              />
              {touched.SpeedToWorkPlace && errors.SpeedToWorkPlace && (
                <Text style={styles.errorText}>{errors.SpeedToWorkPlace}</Text>
              )}

              <Text style={styles.label}>Speed in Frezare</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('SpeedInFrezare')}
                onBlur={handleBlur('SpeedInFrezare')}
                value={values.SpeedInFrezare.toString()}
                placeholder="Speed in Frezare"
              />
              {touched.SpeedInFrezare && errors.SpeedInFrezare && (
                <Text style={styles.errorText}>{errors.SpeedInFrezare}</Text>
              )}

              <Button
                onPress={handleSubmit}
                title="Save"
                color="#007AFF"
              />
            </View>
          )}
        </Formik>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
});

export default App;
