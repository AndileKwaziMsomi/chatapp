<template>
    <nav class="navbar">
        <h1>Andile's Lounge</h1>
        <button v-if="isLogin" @click="signOut">Sign Out</button>
    </nav>
  </template>
  
  <script>
  import { useAuth } from '@/firebase';
  
  export default {
    setup() {
      const { isLogin, signOut } = useAuth();
  
      return { isLogin, signOut };
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    padding: 50px;
    background-color: #010b13;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin:-10px;
    position: relative;
  }
  
  
  button {
    padding: 10px 15px;
    border: none;
    background-color: #c62f2f;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #3db9aa;
  }
  </style>
  