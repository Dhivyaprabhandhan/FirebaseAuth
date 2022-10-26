import auth, {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Alert} from 'react-native';
import {ActivityIndicator, Appbar, Colors, Text} from 'react-native-paper';
import {ScrollView} from 'react-navigation';
import {Navigation} from '../types';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import { Card, Title, Paragraph } from 'react-native-paper';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({navigation}: Props) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredObj, setFilteredObj] = useState(posts);
  useEffect(() => {
    postList();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const postList = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    setLoading(true);
    axios
      .get(url)
      .then(response => {
        setLoading(false);
        setPosts(response.data);
        setFilteredObj(response.data);
        setError('');
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  if (initializing) {
    return null;
  }
  const onLogOutPressed = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('LoginScreen');
    } catch (err) {
      console.log('Sign Out Error.', err.message);
    }
  };

  const searchFilterFunction = () => {
    if (searchQuery) {
      let filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredObj(filteredPosts);
    } else if (searchQuery === '') {
      setFilteredObj(posts);
    }
  };

  return (
    <View style={styles.ViewHeader}>
      <Appbar.Header style={styles.headerStyles}>
        <Appbar.Content style={styles.contentStyle} title="POST LIST" />
        <TouchableOpacity
          style={{}}
          onPress={() => {
            Alert.alert('LOGOUT', 'Do you wish to logout ?', [
              {
                text: 'Cancel',
                onPress: () => navigation.navigate('Dashboard'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => onLogOutPressed()},
            ]);
          }}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </Appbar.Header>
      <View style={styles.viewStyle}>
        <TextInput
          style={{color: theme.colors.primary}}
          onChangeText={text => {
            setSearchQuery(text);
          }}
          value={searchQuery}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            backgroundColor: 'red',
            marginTop: 45,
          }}
          onPress={searchFilterFunction}>
          <Image
            style={styles.imageStyle}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {filteredObj.length > 0 ? (
          filteredObj.map((post, id) => {
            return (
              <TouchableOpacity
                key={id}
                onPress={() => navigation.navigate('PostDetailScreen', post)}>
                  <Card>
                    <Title style={styles.TouchView}>{`${
                  post.id}. ${post.title}`}</Title>
                  </Card>
              </TouchableOpacity>
            );
          })
        ) : filteredObj.length == 0 ? (
          <View
            style={styles.aiView}>
            <ActivityIndicator color={theme.colors.primary} />
            <Image
              source={require('../assets/box.png')}
              style={styles.boxStyle}
            />
            <Text
              style={styles.ndfText}>
              {'No Data Found !'}
            </Text>
          </View>
        ) : loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          error && (
            <View
              style={styles.errorView}>
              <Image
                style={styles.errorImage}
                source={require('../assets/cloud.png')}
              />
              <Text
                style={styles.errorText}>
                {error}
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default memo(Dashboard);

const styles = StyleSheet.create({
  ViewHeader: {
    flex: 1,
    backgroundColor:"#fff"
  },
  TouchView: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#E6E6FA',
    height: 70,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    color:theme.colors.onSurface,
  },
  postText: {
    fontSize: 13,
    color: Colors.blue800,
    fontWeight: 'bold',
  },
  viewStyle: {
    flexDirection: 'row',
    // flex: 1,
    marginBottom: 40,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  headerStyles:{
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  contentStyle:{
    alignItems: 'center'
  },
  logoutText:{
    color: '#fff', 
    right: 10
  },
  imageStyle:{
    height: 20,
    width: 20,
    tintColor: theme.colors.primary,
    position: 'absolute',
    right: 20,
  },
  ndfText:{
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  aiView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%',
  },
  boxStyle:{
    height: 150, 
    width: 150, 
    tintColor: theme.colors.primary
  },
  errorView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%',
  },
  errorImage:{
    height: 100, 
    width: 100
  },
  errorText:{
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  }
});
