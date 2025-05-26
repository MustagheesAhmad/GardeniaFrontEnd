import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useUser } from '../Components/UserContext';
import CreatePost from '../Components/CreatePost';
import PostComponent from '../Components/PostComponent';
import { addComment, createPost, deleteComment, editComment, likeDisLikePost } from '../config/utils';
import Settings from '../Components/Settings';
import { app } from '../config/agent';

const FirstRoute = ({ setIndex }) => {
  const { user, getUser } = useUser();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts === null && user !== null) {
      setPosts(user?.posts);
      setLoading(false);
    }
  }, [user?.posts])

  const updatePost = async (postId, index) => {
    const response = await app.singlePost(postId);
    if (response?.success) {
      setPosts((prePosts) => {
        const updatedPosts = [...prePosts];
        updatedPosts[index] = response?.data
        return updatedPosts
      })
    }
  }

  const renderItem = ({ item, index }) => (
    <PostComponent
      post={item}
      key={index}
      isOwner={item?.author?.email === user?.email}
      handleLike={() => likeDisLikePost(item?.id, 'LIKE', () => updatePost(item?.id, index))}
      handleDislike={() => likeDisLikePost(item?.id, 'DISLIKE', () => updatePost(item?.id, index))}
      onDelete={() => { }}
      onCommentAdd={(comment) => addComment(item?.id, comment, () => updatePost(item?.id, index))}
      onCommentEdit={(commentId, comment) => editComment(item?.id, commentId, comment, () => updatePost(item?.id, index))}
      onCommentDelete={(commentId) => deleteComment(item?.id, commentId, () => updatePost(item?.id, index))}
    />
  );

  const emptyComponent = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Nothing is posted by you</Text>
        <TouchableOpacity style={styles.button} onPress={() => setIndex(1)}>
          <Text style={styles.buttonText}>Let's create Post</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading)
    return <ActivityIndicator color="#00ff00" />

  return (
    <FlatList
      data={posts || []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => emptyComponent()}
      ListHeaderComponent={() => (
        <>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            {user && user?.profilePicture ? (
              <Image
                source={{ uri: user?.profilePicture }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Image
                source={require('../assets/profile.png')}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            )}
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              {user?.fullName}
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 18 }}>About me:</Text>
            <Text style={{ fontSize: 16 }}>{user?.bio}</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>My Posts</Text>
        </>
      )}
      contentContainerStyle={{ padding: 20 }}
    />
  );
};

const SecondRoute = ({ setIndex }) => (
  <CreatePost createPost={createPost} heading={'Create new Post'} setIndex={setIndex} />
);

const ThirdRoute = () => (
  <Settings />
);

const Home = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Profile' },
    { key: 'second', title: 'Create' },
    { key: 'third', title: 'Settings' },
  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute setIndex={setIndex} />,
    second: () => <SecondRoute setIndex={setIndex} />,
    third: ThirdRoute,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'blue' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black' }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
