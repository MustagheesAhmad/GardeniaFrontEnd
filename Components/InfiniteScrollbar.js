import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text, Alert } from 'react-native';
import PostComponent from './PostComponent';
import { app } from '../config/agent';
import { useUser } from './UserContext';
import { addComment, deleteComment, editComment, likeDisLikePost } from '../config/utils';

const InfiniteScrollbarComponent = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

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

  const getPosts = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await app.getPosts(page, 3);
      if (response?.success) {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        if (response.data.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
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
      onEdit={() => { }}
      onCommentAdd={(comment) => addComment(item?.id, comment, () => updatePost(item?.id, index))}
      onCommentEdit={(commentId, comment) => editComment(item?.id, commentId, comment, () => updatePost(item?.id, index))}
      onCommentDelete={(commentId) => deleteComment(item?.id, commentId, () => updatePost(item?.id, index))}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : null;
        }}
        ListEmptyComponent={() => {
          return !isLoading ? <Text>No posts available</Text> : null;
        }}
      />
    </View>
  );
};

export default InfiniteScrollbarComponent;
