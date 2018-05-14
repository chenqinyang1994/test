<template>
  <div>
      <MHeader>添加</MHeader>
      <ul>
          <li>
            <label for="bookName">书的名成</label>
            <input type="text" v-model="book.bookName" id="bookName">
          </li>
          <li>
            <label for="bookInfo">书的信息</label>
            <input type="text" v-model="book.bookInfo" id="bookInfo">
          </li>
          <li>
            <label for="bookPrice">书的价格</label>
            <input type="text" v-model.number="book.bookPrice" id="bookPrice">
          </li>
          <li>
            <label for="bookCover">书的封面</label>
            <input type="text" v-model.number="book.bookCover" id="bookPrice">
          </li>
          <li>
            <button @click="add">添加</button>
          </li>
        </ul>
  </div>
</template>
<script>
import MHeader from "../base/MHeader.vue";
import { addBook } from "../api";
export default {
  data() {
    return {
      book: {}
    };
  },
  methods: {
    add() {
      addBook(this.book).then(res => {
        this.$router.push("/list");
      });
    }
  },
  computed: {},
  components: { MHeader }
};
</script>
<style lang="less" scoped>
ul {
  margin: 50px 20px 0 20px;
  label {
    display: block;
    font-size: 25px;
  }
  input {
    width: 100%;
    height: 25px;
    margin: 10px 0;
  }
  button {
    display: block;
    width: 80px;
    padding: 10px;
    border-radius: 10px;
    background-color: #2aab2a;
    color: #fff;
    border: none;
    outline: none;
  }
}
</style>



