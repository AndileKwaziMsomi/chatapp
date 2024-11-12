<template>
  <div class="background">
    <div class="textbox">
      <Message
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
      >
        {{ text }}
      </Message>
    </div>

    <div ref="bottom" class="mt-200" />

    <div class="bottom">
      <div class="text">
        <form v-if="isLogin" @submit.prevent="send">
          <input v-model="message" placeholder="Message" required />
          <button type="submit">SEND <SendIcon /></button>
        </form>
        <button v-else @click="signIn" class="btn" required="">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue';
import { useAuth, useChat } from '@/firebase';
import SendIcon from './SendIcon.vue';
import Message from './Message.vue';

export default {
  components: { Message, SendIcon },
  setup() {
    const { user, isLogin, signIn } = useAuth();
    const { messages, sendMessage } = useChat();
    const message = ref('');

    const send = () => {
      sendMessage(message.value);
      message.value = '';
    };

    return { user, isLogin, messages, message, send, signIn };
  },
};
</script>

<style scoped>
.background {
  background-color: #46c2c72d;
  height: 300vh; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  padding: 20px; 
}

.textbox {
  flex: 1; 
  overflow-y: auto; 
  margin-bottom: 20px;
}

.text {
  max-width: 500px;
  margin: 0 auto;
}

input {
  width: calc(100% - 40px);
  padding: 10px;
  border: 1px solid #6a91b9;
  border-radius: 4px;
  margin-right: 10px; 
}

button {
  padding: 10px 20px;
  margin-left: 500px;
  margin-bottom:1900px;
  margin-top:-50px;
  border: none;
  background-color: #7aacea;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s; 
}

button:hover {
  background-color: #0cdf1e;
  transform: scale(0.95); 
}
.btn {
  background-color: #dee2e6;
  color: black;
  padding: 20px 50px;
  margin-top: 20px; 
  margin-left: auto; 
  margin-right: auto; 
  display: block;     
  
}

.btn:hover {
  background-color: #f7f3f3;
  transform: scale(0.95); 
}

.mt-20 {
  margin-top: 20px; 
}
</style>
