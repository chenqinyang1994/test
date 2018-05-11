<template>
  <div>
      <MHeader>列表页</MHeader>
      <div class="content">
        <ul>
          <li v-for="(book,index) in allBooks" :key="index">
            <img :src="book.bookCover" alt="">
            <div>
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice}}</b>
              <p>{{book.bookId}}</p>
            </div>
            <button @click="remove(book.bookId)">删除</button>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import MHeader from "../base/MHeader.vue";
import { allBooks, removeBook } from "../api";
export default {
  data() {
    return {
      allBooks: []
    };
  },
  methods: {
    getAllbooks() {
      allBooks().then(res => {
        this.allBooks = res;
      });
    },
    remove(id) {
      removeBook(id).then(res => {
        this.allBooks = this.allBooks.filter(item => item.bookId != id);
      });
    }
  },
  computed: {},
  components: {
    MHeader
  },
  created() {
    this.getAllbooks();
  }
};
</script>
<style lang="less" scoped>
.content {
  ul {
    padding: 10px;
    li {
      display: flex;
      padding: 5px 0;
      border-bottom: 1px solid #ccc;
      img {
        width: 33%;
        height: 55%;
      }
      div {
        padding-right: 12px;
        h4 {
          font-size: 24px;
          line-height: 35px;
        }
        p {
          font-size: 16px;
          line-height: 30px;
          color: #2e2e2e;
        }
        b {
          color: red;
          line-height: 30px;
        }
      }
      button {
        display: block;
        width: 25px;
        background-color: orangered;
        color: #fff;
        border: none;
        border-radius: 10px;
        outline: none;
      }
    }
  }
}
</style>



