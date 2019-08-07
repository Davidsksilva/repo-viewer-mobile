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
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Get list of starred repositories
  async function fetchStarredRepos() {
    setLoading(true);
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page, per_page: 10 },
    });
    setStars(response.data);

    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: 1, per_page: 10 },
    });

    setStars(response.data);

    setRefreshing(false);
  }
  async function loadMore() {
    const user = navigation.getParam('user');
    const nextPage = page + 1;
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: nextPage, per_page: 10 },
    });
    setPage(nextPage);
    const updatedStars = stars.concat(response.data);
    setStars(updatedStars);
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          data={stars}
          onRefresh={refreshList}
          refreshing={refreshing}
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
