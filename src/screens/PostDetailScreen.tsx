import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Alert} from 'react-native';
import {
  Appbar,
  Card,
  Colors,
  Paragraph,
  ProgressBar,
  Text,
  Title,
} from 'react-native-paper';
import { theme } from '../core/theme';

const PostDetailScreen = ({navigation}) => {
  const [stopProgressBar, setStopProgressBar] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStopProgressBar(false);
    }, 1000);
  }, []);
  const {id, title, body} = navigation.state.params;
  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
      <Appbar.Header
        style={styles.headerStyle}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/arrow_back.png')}
          />
        </TouchableOpacity>
        <Appbar.Content style={{alignItems: 'center'}} title="POST DETAIL" />
        <TouchableOpacity
          onPress={() => {
            Alert.alert('LOGOUT', 'Do you wish to logout ?', [
              {
                text: 'Cancel',
                onPress: () => navigation.navigate('PostDetailScreen'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => navigation.navigate('LoginScreen')},
            ]);
          }}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </Appbar.Header>
      <Card>
        <Card.Content style={styles.cardContentStyle}>
          <Title style={styles.titleStyle}>
            {`${id}. ${title?.toUpperCase()}`}
          </Title>
          <ProgressBar
            style={{height: 3}}
            progress={1}
            color={theme.colors.primary}
            indeterminate={stopProgressBar}
          />
          <Paragraph style={styles.bodyText}>{body}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
export default PostDetailScreen;

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 14,
    textAlign: 'center',
    top: 10,
    color: Colors.blue700,
  },
  titleStyle: {
    fontSize: 15,
    color: Colors.blue800,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 10,
  },
  image: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  cardContentStyle:{
    backgroundColor:theme.colors.background, 
    borderWidth:1,
    borderColor:"#dedede",
    elevation:10,
    marginHorizontal:10,
    marginVertical:10
  },
  headerStyle:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
  },
  logoutText:{
    color: '#fff', 
    right: 10
  }
});
