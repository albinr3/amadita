import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { FIREBASE_DB } from "../firebaseConfig";
import { collection, } from "firebase/firestore";
import { getDocs, query, } from "firebase/firestore";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchBlogs = async () => {
    const blogsCollection = collection(FIREBASE_DB, "blogPosts");
    const q = query(blogsCollection);

    try {
      // Ejecuta la consulta
      const querySnapshot = await getDocs(q);

      // Revisa si se encontraron documentos
      if (querySnapshot.empty) {
        console.log("No se encontró ningún post");
        return;
      }

      const postList = [];
      querySnapshot.forEach((doc) => {
        postList.push(doc.data());
      });

      setPosts(postList);
    } catch (error) {
      console.error("Error al obtener los blogs: ", error);
    } finally {
      setLoading(false); // Asegúrate de que el estado de loading se actualice al final
    }
  };



  useEffect(() => {
   fetchBlogs()
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content.substring(0, 100)}...</Text>
    </View>
  );

  return (
    <View>
        
        {loading ? (<Text>No hay posts</Text>) : (<FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.key}
      />)}
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    color: '#555',
  },
});

export default BlogList;
