import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingContainer,
} from './styles';
import api from '../../services/api';

const User = ({ navigation }) => {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  // Get list of starred repositories
  async function fetchStarredRepos() {
    setLoading(true);
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`);
    setLoading(false);
    setStars(response.data);
  }

  useEffect(() => {
    fetchStarredRepos();
  }, []);

  const user = navigation.getParam('user');
  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name> {user.name}</Name>
        <Bio> {user.bio}</Bio>
      </Header>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#189ff0" />
        </LoadingContainer>
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
};

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default User;
