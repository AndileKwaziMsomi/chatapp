<template>
    <div class="message">
      <span v-if="!sender">{{ name }}</span>
      <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
        <Avatar class="mt-1" :src="photoUrl" />
        <div class="text w-3/4" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
         <slot/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Avatar from './Avatar.vue';
  
  export default {
    components: { Avatar },
    props: {
      name: { type: String, default: '' },
      photoUrl: { type: String, default: '' },
      sender: { type: Boolean, default: false },
    },
  };
  </script>
  
  <style scoped>
  .message {
    margin-bottom: 40px;
  }
  
  .flex {
    display: flex;
  }
  
  .text {
    padding: 30px;
    border-radius: 5px;
    color: rgb(17, 17, 17);
    font-family: Arial, Helvetica, sans-serif;
  }
  </style>
  