import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Form, Input, SubmitButton } from './styles';

const Main = () => {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const handleAddUser = () => {};
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
