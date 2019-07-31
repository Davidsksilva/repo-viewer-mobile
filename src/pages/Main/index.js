import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

const Main = () => {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const handleAddUser = async () => {
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data_url,
    };

    setUsers([...users, data]);
    setNewUser('');

    Keyboard.dismiss();
  };
  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Add User"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
        />
        <SubmitButton onPress={handleAddUser}>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
};

Main.navigationOptions = {
  title: 'Users',
};

export default Main;
