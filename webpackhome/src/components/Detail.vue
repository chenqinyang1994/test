<template>
  <div class="detail">
      <MHeader :back='true'>详情页面</MHeader>
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
            <button @click="updata">确认修改</button>
          </li>
        </ul>
  </div>
</template>
<script>
import MHeader from "../base/MHeader.vue";
import { findOneBook, updataBook } from "../api";
export default {
  data() {
    return {
      book: {}
    };
  },
  methods: {
    updata() {
      updataBook(this.bid, this.book).then(res => {
        this.$router.push("/list"); //修改完成后跳页面
      });
    },
    getData() {
      findOneBook(this.bid).then(res => {
        this.book = res;
        //如果是空对象，需要跳转回列表页
        // JSON.stringify(this.book)==='{}'
        Object.keys(this.book).length > 0 ? void 0 : this.$router.push("/list");
      });
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  },
  computed: {
    bid() {
      return this.$route.params.bid;
    }
  },
  components: { MHeader },
  created() {
    //页面加载  根据id 发送请求
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.detail {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
}
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



